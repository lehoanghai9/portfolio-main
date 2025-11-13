"use client"
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SingularityShadersProps
  extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  intensity?: number;
  size?: number;
  waveStrength?: number;
  colorShift?: number;
}

const fragmentShader = `
precision mediump float;

uniform float u_speed;
uniform float u_intensity;
uniform float u_size;
uniform float u_waveStrength;
uniform float u_colorShift;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_loadProgress;

void main() {
    float i = .2 * u_speed, a;
    vec2 r = u_resolution.xy;
    vec2 F = gl_FragCoord.xy;
    vec2 p = ( F+F - r ) / r.y / (.7 * u_size);
    vec2 d = vec2(-1.0, 1.0);
    vec2 b = p - i*d;
    vec2 c = p * mat2(1.0, 1.0, d/(.1 + i/dot(b,b)));
    float baseAngle = .5*log(a=dot(c,c)) + u_time*i*u_speed;
    vec4 angles = baseAngle + vec4(0.0, 33.0, 11.0, 0.0);
    vec2 v = c * mat2(cos(angles)) / i;
    vec2 w = vec2(0.0);

    for(float j = 0.0; j < 9.0; j++) {
        i++;
        w += 1.0 + sin(v * u_waveStrength);
        v += .7 * sin(v.yx * i + u_time * u_speed) / i + .5;
    }

    i = length( sin(v/.3)*.4 + c*(3.+d) );

    vec4 colorGrad = vec4(.6,-.4,-1.0,0.0) * u_colorShift;

    // Apply loading animation - radial reveal from center
    vec2 center = u_resolution * 0.5;
    float distFromCenter = length(F - center);
    float maxDist = length(u_resolution) * 0.7;
    float progressRadius = maxDist * u_loadProgress;
    float radialMask = smoothstep(progressRadius + 50.0, progressRadius - 50.0, distFromCenter);
    
    vec4 O = 1.0 - exp( -exp( c.x * colorGrad )
                   / w.xyyx
                   / ( 2.0 + i*i/4.0 - i )
                   / ( .5 + 1.0 / a )
                   / ( .03 + abs( length(p)-.7 ) )
                   * u_intensity * u_loadProgress
             );
    
    // Apply radial reveal and fade-in
    O *= radialMask * u_loadProgress;
    
    gl_FragColor = O;
}
`;

export const SingularityShaders = forwardRef<
  HTMLDivElement,
  SingularityShadersProps
>(
  (
    {
      className,
      speed = 1.0,
      intensity = 1.0,
      size = 1.0,
      waveStrength = 1.0,
      colorShift = 1.0,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState<string | null>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const startTimeRef = useRef<number>(Date.now());
    const loadStartTimeRef = useRef<number>(Date.now());
    const [loadProgress, setLoadProgress] = useState(0);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
      if (!gl) {
        setError("WebGL is not supported");
        return;
      }

      // Create shader
      const createShader = (type: number, source: string): WebGLShader | null => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          const error = gl.getShaderInfoLog(shader);
          gl.deleteShader(shader);
          setError(`Shader compilation error: ${error}`);
          return null;
        }
        return shader;
      };

      // Vertex shader (simple pass-through)
      const vertexShaderSource = `
        attribute vec2 a_position;
        void main() {
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShaderObj = createShader(gl.FRAGMENT_SHADER, fragmentShader);
      
      if (!vertexShader || !fragmentShaderObj) return;

      // Create program
      const program = gl.createProgram();
      if (!program) return;

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShaderObj);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const error = gl.getProgramInfoLog(program);
        setError(`Program linking error: ${error}`);
        return;
      }

      // Setup geometry
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      // Get attribute and uniform locations
      const positionLocation = gl.getAttribLocation(program, "a_position");
      const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
      const timeLocation = gl.getUniformLocation(program, "u_time");
      const speedLocation = gl.getUniformLocation(program, "u_speed");
      const intensityLocation = gl.getUniformLocation(program, "u_intensity");
      const sizeLocation = gl.getUniformLocation(program, "u_size");
      const waveStrengthLocation = gl.getUniformLocation(program, "u_waveStrength");
      const colorShiftLocation = gl.getUniformLocation(program, "u_colorShift");
      const loadProgressLocation = gl.getUniformLocation(program, "u_loadProgress");

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      };

      resize();
      window.addEventListener("resize", resize);

      // Reset load start time when component mounts
      loadStartTimeRef.current = Date.now();

      const render = () => {
        if (!canvas || !gl) return;

        const currentTime = (Date.now() - startTimeRef.current) / 1000.0;
        const loadElapsed = (Date.now() - loadStartTimeRef.current) / 1000.0;
        
        // Animate load progress: ease-out curve over 1.2 seconds
        const rawProgress = Math.min(loadElapsed / 1.2, 1.0);
        const easedProgress = 1.0 - Math.pow(1.0 - rawProgress, 3); // Cubic ease-out
        setLoadProgress(easedProgress);

        gl.useProgram(program);

        // Setup attributes
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Set uniforms
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.uniform1f(timeLocation, currentTime);
        gl.uniform1f(speedLocation, speed);
        gl.uniform1f(intensityLocation, intensity);
        gl.uniform1f(sizeLocation, size);
        gl.uniform1f(waveStrengthLocation, waveStrength);
        gl.uniform1f(colorShiftLocation, colorShift);
        gl.uniform1f(loadProgressLocation, easedProgress);

        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        animationFrameRef.current = requestAnimationFrame(render);
      };

      render();

      return () => {
        window.removeEventListener("resize", resize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShaderObj);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
      };
    }, [speed, intensity, size, waveStrength, colorShift]);

    if (error) {
      return (
        <div
          ref={ref}
          className={cn("w-full h-full flex items-center justify-center text-red-500", className)}
          {...props}
        >
          {error}
        </div>
      );
    }

    return (
      <div 
        ref={ref} 
        className={cn("w-full h-full relative", className)} 
        {...props}
        style={{
          opacity: loadProgress,
          transform: `scale(${0.95 + loadProgress * 0.05})`,
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />
      </div>
    );
  }
);

SingularityShaders.displayName = "SingularityShaders";
