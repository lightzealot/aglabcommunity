import Image from "next/image";

export function Logo({ size = 36, withName = true }: { size?: number; withName?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Image src="/logo.png" alt="AG Lab" width={size} height={size} priority />
      {withName && (
        <span className="display text-2xl">
          AG Lab<span className="text-accent">.</span>
        </span>
      )}
    </span>
  );
}
