interface LogoProps {
  variant?: "full" | "mark";
  className?: string;
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  const svg = (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="12" cy="28" r="3" fill="currentColor" />
      <circle cx="28" cy="12" r="3" fill="currentColor" />
      <circle cx="28" cy="28" r="3" fill="currentColor" />
      <circle cx="12" cy="20" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="28" cy="20" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="20" cy="12" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="20" cy="28" r="2" fill="currentColor" opacity="0.7" />
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="28"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <line
        x1="28"
        y1="12"
        x2="28"
        y2="28"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <line
        x1="12"
        y1="12"
        x2="28"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <line
        x1="12"
        y1="28"
        x2="28"
        y2="28"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <line
        x1="12"
        y1="12"
        x2="20"
        y2="20"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
      <line
        x1="28"
        y1="12"
        x2="20"
        y2="20"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
      <line
        x1="12"
        y1="28"
        x2="20"
        y2="20"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
      <line
        x1="28"
        y1="28"
        x2="20"
        y2="20"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
      <circle cx="20" cy="20" r="2.5" fill="currentColor" />
    </svg>
  );

  if (variant === "mark") {
    return <div className={className}>{svg}</div>;
  }

  return <div className={className}>{svg}</div>;
}
