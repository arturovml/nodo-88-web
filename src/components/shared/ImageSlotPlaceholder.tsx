type ImageSlotPlaceholderProps = {
  label: string;
  aspect?: "16:9" | "4:3" | "1:1";
  className?: string;
};

const aspectMap = {
  "16:9": { className: "aspect-[16/9]", viewBox: "0 0 160 90" },
  "4:3": { className: "aspect-[4/3]", viewBox: "0 0 160 120" },
  "1:1": { className: "aspect-square", viewBox: "0 0 120 120" },
};

export function ImageSlotPlaceholder({
  label,
  aspect = "16:9",
  className,
}: ImageSlotPlaceholderProps) {
  const { className: aspectClassName, viewBox } =
    aspectMap[aspect] ?? aspectMap["16:9"];

  return (
    <div
      className={`relative w-full ${aspectClassName} ${
        className ?? ""
      } overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/80`}
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-zinc-700/30"
        aria-hidden="true"
      >
        <rect width="100%" height="100%" fill="transparent" />
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
        <rect
          x="8%"
          y="8%"
          width="84%"
          height="84%"
          fill="transparent"
          stroke="currentColor"
          strokeDasharray="4 6"
        />
      </svg>

      <div className="absolute inset-x-6 bottom-5 text-xs uppercase tracking-[0.2em] text-zinc-400">
        {label}
      </div>
    </div>
  );
}
