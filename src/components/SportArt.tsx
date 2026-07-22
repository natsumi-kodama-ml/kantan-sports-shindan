import type { SportKey } from "@/lib/quiz-data";

const PALETTES: Record<SportKey, { from: string; to: string; line: string }> = {
  running: { from: "#e7c9a3", to: "#c98a5b", line: "#3a2c1f" },
  strength: { from: "#9aa3a0", to: "#5b625f", line: "#20241f" },
  yoga: { from: "#dfe0c9", to: "#b7c2a0", line: "#33422f" },
  futsal: { from: "#7c9271", to: "#33422f", line: "#f6f1e6" },
  bouldering: { from: "#c9beae", to: "#8d8172", line: "#2a2620" },
};

function Motif({ sport, line }: { sport: SportKey; line: string }) {
  const limb = {
    fill: "none",
    stroke: line,
    strokeWidth: 12,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (sport) {
    case "running":
      return (
        <g>
          <circle cx="205" cy="44" r="17" fill={line} />
          <path d="M203 61 L186 128" {...limb} />
          {/* arms */}
          <path d="M196 73 L174 58 L156 76" {...limb} strokeWidth={9} />
          <path d="M196 78 L217 98 L207 121" {...limb} strokeWidth={9} />
          {/* front leg planted */}
          <path d="M186 128 L166 167 L180 206" {...limb} />
          {/* back leg trailing, bent up */}
          <path d="M186 128 L212 156 L239 141" {...limb} />
        </g>
      );
    case "strength":
      return (
        <g fill={line}>
          <rect x="140" y="120" width="120" height="16" rx="8" />
          <rect x="95" y="93" width="46" height="70" rx="10" />
          <rect x="259" y="93" width="46" height="70" rx="10" />
          <rect x="78" y="103" width="16" height="50" rx="6" />
          <rect x="306" y="103" width="16" height="50" rx="6" />
        </g>
      );
    case "yoga":
      return (
        <g fill={line}>
          {/* seated meditation silhouette: head + cross-legged base */}
          <circle cx="200" cy="72" r="19" />
          <path d="M144 206 Q150 128 200 128 Q250 128 256 206 Z" />
          <circle cx="163" cy="168" r="9" />
          <circle cx="237" cy="168" r="9" />
        </g>
      );
    case "futsal":
      return (
        <g>
          <circle cx="188" cy="47" r="15" fill={line} />
          <path d="M188 62 L174 118" {...limb} />
          {/* support leg */}
          <path d="M174 118 L163 158 L177 204" {...limb} />
          {/* kicking leg extended toward ball */}
          <path d="M174 118 L214 138 L253 130" {...limb} />
          {/* arms for balance */}
          <path d="M181 71 L154 89" {...limb} strokeWidth={8} />
          <path d="M197 71 L224 64" {...limb} strokeWidth={8} />
          {/* ball */}
          <circle cx="268" cy="122" r="19" fill={line} />
          <path
            d="M288 108 Q300 122 288 137"
            fill="none"
            stroke={line}
            strokeWidth={4}
            strokeLinecap="round"
            opacity={0.55}
          />
        </g>
      );
    case "bouldering":
      return (
        <g fill={line}>
          {/* climbing wall: holds ascending diagonally, plus a carabiner for context */}
          <circle cx="110" cy="205" r="17" />
          <circle cx="165" cy="165" r="13" />
          <ellipse cx="225" cy="130" rx="16" ry="11" transform="rotate(-20 225 130)" />
          <circle cx="270" cy="90" r="14" />
          <ellipse cx="235" cy="55" rx="12" ry="9" transform="rotate(15 235 55)" />
          <circle cx="150" cy="95" r="9" opacity={0.5} />
          <circle cx="90" cy="130" r="8" opacity={0.5} />
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
