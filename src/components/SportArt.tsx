import type { SportKey } from "@/lib/quiz-data";

const PALETTES: Record<SportKey, { from: string; to: string; line: string }> = {
  running: { from: "#e7c9a3", to: "#c98a5b", line: "#3a2c1f" },
  strength: { from: "#9aa3a0", to: "#5b625f", line: "#20241f" },
  yoga: { from: "#dfe0c9", to: "#b7c2a0", line: "#33422f" },
  futsal: { from: "#7c9271", to: "#33422f", line: "#f6f1e6" },
  bouldering: { from: "#c9beae", to: "#8d8172", line: "#2a2620" },
};

function Motif({ sport, line }: { sport: SportKey; line: string }) {
  switch (sport) {
    case "running":
      return (
        <g>
          <circle cx="320" cy="70" r="34" fill="none" stroke={line} strokeWidth="2" />
          <path d="M0 210 H400" stroke={line} strokeWidth="2" />
          <path
            d="M70 210 l18 -34 l22 8 l14 -20 l20 4"
            fill="none"
            stroke={line}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );
    case "strength":
      return (
        <g stroke={line} strokeWidth="3" fill="none">
          <rect x="60" y="120" width="280" height="10" />
          <rect x="40" y="100" width="24" height="50" />
          <rect x="336" y="100" width="24" height="50" />
          <rect x="20" y="112" width="16" height="26" />
          <rect x="364" y="112" width="16" height="26" />
        </g>
      );
    case "yoga":
      return (
        <g stroke={line} strokeWidth="2" fill="none">
          <circle cx="320" cy="65" r="26" />
          <path d="M40 220 Q 120 160 200 220 T 360 220" />
          <path d="M40 240 Q 120 190 200 240 T 360 240" opacity="0.6" />
        </g>
      );
    case "futsal":
      return (
        <g stroke={line} strokeWidth="2" fill="none">
          <circle cx="310" cy="70" r="24" />
          <path d="M296 56 L324 84 M324 56 L296 84" />
          <path d="M0 240 H400 M60 190 V240 M340 190 V240" />
        </g>
      );
    case "bouldering":
      return (
        <g stroke={line} strokeWidth="2" fill="none">
          <path d="M20 230 L110 110 L170 190 L230 90 L400 230 Z" />
          <path d="M170 190 L230 90 L280 150" />
        </g>
      );
  }
}

export default function SportArt({
  sport,
  className,
}: {
  sport: SportKey;
  className?: string;
}) {
  const p = PALETTES[sport];
  const gradientId = `grad-${sport}`;

  return (
    <svg
      viewBox="0 0 400 260"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={sport}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="100%" stopColor={p.to} />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${gradientId})`} />
      <Motif sport={sport} line={p.line} />
    </svg>
  );
}
