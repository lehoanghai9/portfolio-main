"use client";
import { useTheme } from "next-themes";
import { SingularityShaders } from "../ui/shadcn-io/singularity-shaders";

export default function SingularityShaderDemo({
  className,
}: {
  className?: string;
}) {
  const { resolvedTheme: theme } = useTheme();
  return (
    <SingularityShaders
      speed={1}
      intensity={theme === "dark" ? 1.7 : 3}
      size={theme === "dark" ? 1 : 1.1}
      waveStrength={theme === "dark" ? 1.0 : 0.5}
      colorShift={theme === "dark" ? 1.5 : 4}
      className={className}
    />
  );
}
