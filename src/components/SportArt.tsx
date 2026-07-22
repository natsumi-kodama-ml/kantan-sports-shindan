import type { SportKey } from "@/lib/quiz-data";

const INK = "#20263A";
const SKIN = "#E0A379";
const BLUE = "#2E4A9E";
const ORANGE = "#F2793C";
const RED = "#E8432F";
const YELLOW = "#FFC93C";
const WHITE = "#FFFFFF";

const BACKDROPS: Record<SportKey, [string, string, string]> = {
  running: [BLUE, ORANGE, YELLOW],
  strength: [RED, BLUE, YELLOW],
  yoga: [YELLOW, BLUE, ORANGE],
  futsal: [BLUE, RED, YELLOW],
  bouldering: [ORANGE, RED, BLUE],
};

export function TriBackdrop({
  colors,
}: {
  colors: [string, string, string];
}) {
  const [c1, c2, c3] = colors;
  return (
    <g>
      <rect width="400" height="260" fill={c2} />
      <polygon points="0,0 400,0 0,190" fill={c1} />
      <polygon points="0,260 400,260 400,90" fill={c3} />
    </g>
  );
}

function OutlinedStroke({
  d,
  color,
  width,
}: {
  d: string;
  color: string;
  width: number;
}) {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={INK}
        strokeWidth={width + 5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

function OutlinedCircle({
  cx,
  cy,
  r,
  color,
}: {
  cx: number;
  cy: number;
  r: number;
  color: string;
}) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r + 2.5} fill={INK} />
      <circle cx={cx} cy={cy} r={r} fill={color} />
    </>
  );
}

function Motif({ sport }: { sport: SportKey }) {
  switch (sport) {
    case "running":
      return (
        <g>
          <OutlinedCircle cx={205} cy={44} r={17} color={SKIN} />
          <OutlinedStroke d="M203 61 L186 128" color={WHITE} width={15} />
          <OutlinedStroke d="M196 73 L174 58 L156 76" color={SKIN} width={10} />
          <OutlinedStroke d="M196 78 L217 98 L207 121" color={SKIN} width={10} />
          <OutlinedStroke d="M186 128 L166 167 L180 206" color={ORANGE} width={16} />
          <OutlinedStroke d="M186 128 L212 156 L239 141" color={ORANGE} width={16} />
        </g>
      );
    case "strength":
      return (
        <g>
          <rect x="136" y="118" width="128" height="20" rx="10" fill={INK} />
          <rect x="140" y="121" width="120" height="14" rx="7" fill={WHITE} opacity={0.9} />
          <rect x="88" y="88" width="52" height="78" rx="12" fill={INK} />
          <rect x="94" y="94" width="40" height="66" rx="9" fill={BLUE} />
          <rect x="260" y="88" width="52" height="78" rx="12" fill={INK} />
          <rect x="266" y="94" width="40" height="66" rx="9" fill={BLUE} />
          <rect x="70" y="100" width="20" height="54" rx="8" fill={INK} />
          <rect x="74" y="104" width="12" height="46" rx="6" fill={YELLOW} />
          <rect x="310" y="100" width="20" height="54" rx="8" fill={INK} />
          <rect x="314" y="104" width="12" height="46" rx="6" fill={YELLOW} />
        </g>
      );
    case "yoga":
      return (
        <g>
          <path
            d="M200 20 A45 45 0 0 1 245 65"
            fill="none"
            stroke={WHITE}
            strokeWidth={3}
            opacity={0.5}
          />
          <OutlinedCircle cx={200} cy={72} r={19} color={SKIN} />
          <path
            d="M141 208 Q147 125 200 125 Q253 125 259 208 Z"
            fill={INK}
          />
          <path d="M144 206 Q150 128 200 128 Q250 128 256 206 Z" fill={BLUE} />
          <OutlinedCircle cx={163} cy={168} r={9} color={ORANGE} />
          <OutlinedCircle cx={237} cy={168} r={9} color={ORANGE} />
        </g>
      );
    case "futsal":
      return (
        <g>
          <OutlinedCircle cx={188} cy={47} r={15} color={SKIN} />
          <OutlinedStroke d="M188 62 L174 118" color={RED} width={15} />
          <OutlinedStroke d="M174 118 L163 158 L177 204" color={WHITE} width={14} />
          <OutlinedStroke d="M174 118 L214 138 L253 130" color={WHITE} width={14} />
          <OutlinedStroke d="M181 71 L154 89" color={SKIN} width={9} />
          <OutlinedStroke d="M197 71 L224 64" color={SKIN} width={9} />
          <OutlinedCircle cx={268} cy={122} r={19} color={YELLOW} />
          <path
            d="M288 108 Q300 122 288 137"
            fill="none"
            stroke={WHITE}
            strokeWidth={4}
            strokeLinecap="round"
            opacity={0.7}
          />
        </g>
      );
    case "bouldering":
      return (
        <g>
          <OutlinedCircle cx={140} cy={60} r={9} color={YELLOW} />
          <OutlinedCircle cx={262} cy={55} r={10} color={BLUE} />
          <OutlinedCircle cx={215} cy={205} r={10} color={YELLOW} />
          <OutlinedCircle cx={110} cy={205} r={17} color={RED} />
          <OutlinedCircle cx={165} cy={165} r={13} color={YELLOW} />
          <OutlinedCircle cx={225} cy={130} r={14} color={BLUE} />
          <OutlinedCircle cx={270} cy={90} r={14} color={RED} />
          <OutlinedCircle cx={235} cy={55} r={11} color={YELLOW} />
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
  const colors = BACKDROPS[sport];

  return (
    <svg
      viewBox="0 0 400 260"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={sport}
    >
      <TriBackdrop colors={colors} />
      <Motif sport={sport} />
    </svg>
  );
}
