import { firaCode, instrument } from "@/components/fonts";
import { SingularityShaders } from "@/components/ui/shadcn-io/singularity-shaders";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden flex flex-1 flex-col text-center">
      {/* Hero content */}
      <SingularityShaders
        speed={1.6}
        intensity={0.4}
        size={1.1}
        waveStrength={1.0}
        colorShift={1.7}
        className="absolute inset-0 max-h-[700px] -z-10"
      />
      {/* Gradient fade */}
      <div className="absolute inset-0 max-h-[700px] -z-10 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto pt-[500px] px-4">
        <h1
          className={cn(
            "mb-4 text-4xl sm:text-5xl md:text-7xl font-medium tracking-[-0.06em] text-balance leading-tight",
            firaCode.className
          )}
        >
          Thoughts and explorations from a curious developer.
        </h1>
        <div className="flex flex-col mx-auto gap-6 justify-center max-w-[420px] text-fd-muted-foreground text-base md:text-lg">
          <p>
            Hi I'm Hai. This is my blog. Here, I write about the things I'm
            passionate about.
          </p>
          <p>
            Each piece I write aims to dive deep into the topics I'm passionate
            about, while also making complex topics more accessible through
            interactive playgrounds, visualization, and well detailed
            walkthroughs.
          </p>
          <p>
            My goal is to give you the tools and intuition to explore further on
            your own.
          </p>
        </div>
      </div>

      {/* Animated grid background */}
      {/* <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "-z-10 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-70%] h-[200%] skew-y-12"
        )}
      /> */}
    </main>
  );
}
