import type { ReactNode } from "react";

/* Product illustrations.
   One controlled palette owned by this page: a plum line, a warm neutral body
   and a lighter neutral for secondary areas. No per-piece colour — the set
   reads as one catalogue, and the tile does the separating.
   Stand-ins until real photography exists. */

type Tones = { ink: string; tint: string; warm: string };
type Good = { colour: (t: Tones) => ReactNode; key: () => ReactNode };

/* two weights, both heavier than the interface icons — a product is an
   object on the page, not a control */
const HAIR = 5.5;
const THIN = 5.5;
const MED = 8.5;
const FAT = 8.5;

const k = (w: number) => ({
  strokeWidth: w,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
});

/* ── jewellery ─────────────────────────────────────────────── */

const hoops: Good = {
  colour: ({ ink, tint }) => (
    <>
      <circle cx="60" cy="92" r="34" fill="none" stroke={ink} strokeWidth="15" />
      <circle cx="107" cy="76" r="25" fill="none" stroke={ink} strokeWidth="15" />
      <circle cx="60" cy="92" r="34" fill="none" stroke={tint} strokeWidth="8" />
      <circle cx="107" cy="76" r="25" fill="none" stroke={tint} strokeWidth="8" />
    </>
  ),
  key: () => (
    <>
      <circle cx="60" cy="92" r="34" {...k(MED)} />
      <circle cx="60" cy="92" r="20" {...k(HAIR)} />
      <circle cx="107" cy="76" r="25" {...k(THIN)} />
      <circle cx="107" cy="76" r="13" {...k(HAIR)} />
      <path d="M60 58v-6M107 51v-5" {...k(MED)} />
      <circle cx="60" cy="50" r="6" fill="currentColor" stroke="none" />
      <circle cx="107" cy="45" r="5" fill="currentColor" stroke="none" />
    </>
  ),
};

const jhumka: Good = {
  colour: ({ ink, tint }) => (
    <>
      <path d="M46 100a34 30 0 0 1 68 0Z" fill={ink} />
      <path d="M46 100a34 30 0 0 1 68 0 34 30 0 0 1-68 0Z" fill={tint} />
      <circle cx="80" cy="52" r="10" fill={ink} />
      {[52, 62, 72, 82, 92, 102, 112].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={100 + (i === 3 ? 24 : 17 + (i % 2) * 6)}
          r="6.5"
          fill={ink}
        />
      ))}
    </>
  ),
  key: () => (
    <>
      <path d="M80 20a12 12 0 0 1 0 24" {...k(THIN)} />
      <circle cx="80" cy="52" r="10" {...k(THIN)} />
      <path d="M46 100a34 30 0 0 1 68 0Z" {...k(FAT)} />
      <path d="M53 86h54" {...k(HAIR)} />
      <path d="M58 74h44" {...k(HAIR)} />
      {[52, 62, 72, 82, 92, 102, 112].map((x, i) => {
        const y = 100 + (i === 3 ? 24 : 17 + (i % 2) * 6);
        return (
          <g key={x}>
            <path d={`M${x} 100V${y - 6}`} {...k(HAIR)} />
            <circle cx={x} cy={y} r="6.5" {...k(THIN)} />
          </g>
        );
      })}
    </>
  ),
};

const pendant: Good = {
  colour: ({ ink, tint }) => (
    <>
      <path d="M80 90l26 28-26 32-26-32Z" fill={ink} />
      <path d="M80 90l26 28-26 32Z" fill={tint} />
      <path
        d="M30 34c0 46 22 64 50 64s50-18 50-64"
        fill="none"
        stroke={ink}
        strokeWidth="7"
      />
      <path
        d="M30 34c0 46 22 64 50 64s50-18 50-64"
        fill="none"
        stroke={tint}
        strokeWidth="3"
      />
    </>
  ),
  key: () => (
    <>
      <path d="M30 34c0 46 22 64 50 64s50-18 50-64" {...k(THIN)} />
      <path d="M80 90l26 28-26 32-26-32Z" {...k(FAT)} />
      <path d="M54 118h52" {...k(HAIR)} />
      <path d="M80 90v60" {...k(HAIR)} />
      <circle cx="30" cy="34" r="6" fill="currentColor" stroke="none" />
      <circle cx="130" cy="34" r="6" fill="currentColor" stroke="none" />
    </>
  ),
};

const stackRings: Good = {
  colour: ({ ink, tint }) => (
    <>
      {[44, 80, 116].map((cy, i) => (
        <ellipse
          key={cy}
          cx="80"
          cy={cy}
          rx={i === 1 ? 51 : 43}
          ry={i === 1 ? 18 : 15}
          fill="none"
          stroke={i === 1 ? tint : ink}
          strokeWidth="14"
        />
      ))}
      <circle cx="80" cy="26" r="9" fill={ink} />
    </>
  ),
  key: () => (
    <>
      {[44, 80, 116].map((cy, i) => (
        <ellipse
          key={cy}
          cx="80"
          cy={cy}
          rx={i === 1 ? 51 : 43}
          ry={i === 1 ? 18 : 15}
          {...k(i === 1 ? MED : THIN)}
        />
      ))}
      <circle cx="80" cy="26" r="9" {...k(THIN)} />
    </>
  ),
};

const bangles: Good = {
  colour: ({ ink, tint }) => (
    <>
      <g transform="rotate(-14 80 80)">
        <ellipse cx="62" cy="80" rx="26" ry="50" fill="none" stroke={ink} strokeWidth="13" />
        <ellipse cx="62" cy="80" rx="26" ry="50" fill="none" stroke={tint} strokeWidth="6" />
      </g>
      <g transform="rotate(12 80 80)">
        <ellipse cx="103" cy="80" rx="22" ry="44" fill="none" stroke={ink} strokeWidth="13" />
        <ellipse cx="103" cy="80" rx="22" ry="44" fill="none" stroke={tint} strokeWidth="6" />
      </g>
    </>
  ),
  key: () => (
    <>
      <g transform="rotate(-14 80 80)">
        <ellipse cx="62" cy="80" rx="26" ry="50" {...k(MED)} />
        <ellipse cx="62" cy="80" rx="15" ry="39" {...k(HAIR)} />
      </g>
      <g transform="rotate(12 80 80)">
        <ellipse cx="103" cy="80" rx="22" ry="44" {...k(THIN)} />
        <ellipse cx="103" cy="80" rx="12" ry="34" {...k(HAIR)} />
      </g>
    </>
  ),
};

const studs: Good = {
  colour: ({ ink, tint }) => {
    const petals = (cx: number, cy: number, r: number, fill: string) =>
      [0, 60, 120, 180, 240, 300].map((d) => {
        const a = (d * Math.PI) / 180;
        return (
          <circle
            key={d}
            cx={cx + Math.cos(a) * r}
            cy={cy + Math.sin(a) * r}
            r={r * 0.64}
            fill={fill}
          />
        );
      });
    return (
      <>
        {petals(56, 60, 26, ink)}
        <circle cx="56" cy="60" r="15" fill={tint} />
        {petals(106, 106, 20, ink)}
      </>
    );
  },
  key: () => {
    const petals = (cx: number, cy: number, r: number, w: number) =>
      [0, 60, 120, 180, 240, 300].map((d) => {
        const a = (d * Math.PI) / 180;
        return (
          <circle
            key={d}
            cx={cx + Math.cos(a) * r}
            cy={cy + Math.sin(a) * r}
            r={r * 0.64}
            {...k(w)}
          />
        );
      });
    return (
      <>
        {petals(56, 60, 26, THIN)}
        <circle cx="56" cy="60" r="15" {...k(MED)} />
        {petals(106, 106, 20, HAIR)}
        <circle cx="106" cy="106" r="11" {...k(THIN)} />
      </>
    );
  },
};

const anklet: Good = {
  colour: ({ ink, tint }) => (
    <>
      <path
        d="M24 60c14 24 28 24 42 0s28-24 42 0 28 24 28 0"
        fill="none"
        stroke={ink}
        strokeWidth="9"
      />
      <path
        d="M24 60c14 24 28 24 42 0s28-24 42 0 28 24 28 0"
        fill="none"
        stroke={tint}
        strokeWidth="4"
      />
      {[40, 62, 84, 106, 128].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={102 + (i % 2) * 12}
          r="11"
          fill={i % 2 ? tint : ink}
        />
      ))}
    </>
  ),
  key: () => (
    <>
      <path d="M24 60c14 24 28 24 42 0s28-24 42 0 28 24 28 0" {...k(MED)} />
      {[40, 62, 84, 106, 128].map((x, i) => {
        const y = 102 + (i % 2) * 12;
        return (
          <g key={x}>
            <path d={`M${x} 72V${y - 11}`} {...k(HAIR)} />
            <circle cx={x} cy={y} r="11" {...k(THIN)} />
            <path d={`M${x - 6} ${y}h12`} {...k(HAIR)} />
          </g>
        );
      })}
    </>
  ),
};

/* ── things for the house ──────────────────────────────────── */

const vase: Good = {
  colour: ({ ink, tint }) => (
    <>
      <path d="M63 24h34v24c27 17 31 64 12 88H51c-19-24-15-71 12-88Z" fill={ink} />
      <path d="M80 48c27 17 31 64 12 88H80Z" fill={tint} />
    </>
  ),
  key: () => (
    <>
      <path d="M63 24h34v24c27 17 31 64 12 88H51c-19-24-15-71 12-88Z" {...k(FAT)} />
      <path d="M45 86h70" {...k(MED)} />
      <path d="M49 104h62" {...k(HAIR)} />
      <path d="M56 24h48" {...k(MED)} />
    </>
  ),
};

const diya: Good = {
  colour: ({ ink, tint, warm }) => (
    <>
      <path d="M80 22c15 18 15 28 0 36-15-8-15-18 0-36Z" fill={warm} />
      <path d="M30 82h100c-6 30-26 44-50 44S36 112 30 82Z" fill={ink} />
      <path d="M80 82h50c-6 30-26 44-50 44Z" fill={tint} />
    </>
  ),
  key: () => (
    <>
      <path d="M80 22c15 18 15 28 0 36-15-8-15-18 0-36Z" {...k(THIN)} />
      <path d="M80 58v22" {...k(HAIR)} />
      <path d="M30 82h100c-6 30-26 44-50 44S36 112 30 82Z" {...k(FAT)} />
      <path d="M24 82h112" {...k(MED)} />
      <path d="M54 104h52" {...k(HAIR)} />
    </>
  ),
};

const candleHolder: Good = {
  colour: ({ ink, tint, warm }) => (
    <>
      <path d="M80 14c10 12 10 20 0 26-10-6-10-14 0-26Z" fill={warm} />
      <path d="M74 74h12v28H74Z" fill={tint} />
      <path d="M58 60h44l-7 16H65Z" fill={ink} />
      <ellipse cx="80" cy="108" rx="19" ry="9" fill={ink} />
      <path d="M42 136h76l-11-24H53Z" fill={ink} />
      <path d="M80 136h38l-11-24H80Z" fill={tint} />
    </>
  ),
  key: () => (
    <>
      <path d="M80 14c10 12 10 20 0 26-10-6-10-14 0-26Z" {...k(THIN)} />
      <rect x="68" y="40" width="24" height="22" rx="3" {...k(HAIR)} />
      <path d="M58 60h44l-7 16H65Z" {...k(THIN)} />
      <path d="M74 74h12v28H74Z" {...k(HAIR)} />
      <ellipse cx="80" cy="108" rx="19" ry="9" {...k(THIN)} />
      <path d="M42 136h76l-11-24H53Z" {...k(FAT)} />
    </>
  ),
};

const planter: Good = {
  colour: ({ ink, tint }) => (
    <>
      <path d="M80 66c0-25 12-40 31-44-2 25-12 40-31 44Z" fill={ink} />
      <path d="M78 68c-4-23-17-33-35-35 6 23 19 33 35 35Z" fill={tint} />
      <path d="M40 80h80l-11 56H51Z" fill={ink} />
      <path d="M80 80h40l-11 56H80Z" fill={tint} />
    </>
  ),
  key: () => (
    <>
      <path d="M80 66c0-25 12-40 31-44-2 25-12 40-31 44Z" {...k(THIN)} />
      <path d="M78 68c-4-23-17-33-35-35 6 23 19 33 35 35Z" {...k(THIN)} />
      <path d="M80 78V40" {...k(HAIR)} />
      <path d="M40 80h80l-11 56H51Z" {...k(FAT)} />
      <path d="M34 80h92" {...k(MED)} />
      <path d="M52 106h56" {...k(HAIR)} />
    </>
  ),
};

const mirror: Good = {
  colour: ({ ink, tint }) => (
    <>
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i * (360 / 14) * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={80 + Math.cos(a) * 51}
            cy={80 + Math.sin(a) * 51}
            r="13"
            fill={ink}
          />
        );
      })}
      <circle cx="80" cy="80" r="43" fill={ink} />
      <circle cx="80" cy="80" r="30" fill={tint} />
    </>
  ),
  key: () => (
    <>
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i * (360 / 14) * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={80 + Math.cos(a) * 51}
            cy={80 + Math.sin(a) * 51}
            r="13"
            {...k(HAIR)}
          />
        );
      })}
      <circle cx="80" cy="80" r="43" {...k(FAT)} />
      <circle cx="80" cy="80" r="30" {...k(THIN)} />
      <path d="M64 92c4-15 12-23 24-27" {...k(MED)} />
    </>
  ),
};

const incense: Good = {
  colour: ({ ink, tint }) => (
    <>
      <path d="M26 104h108c0 18-13 26-54 26s-54-8-54-26Z" fill={ink} />
      <path d="M80 104h54c0 18-13 26-54 26Z" fill={tint} />
      <circle cx="62" cy="40" r="8" fill={ink} />
    </>
  ),
  key: () => (
    <>
      <path d="M97 20c-15 9-15 21-4 27s10 19-5 25" {...k(HAIR)} />
      <path d="M62 48v56" {...k(THIN)} />
      <circle cx="62" cy="40" r="8" {...k(THIN)} />
      <path d="M26 104h108c0 18-13 26-54 26s-54-8-54-26Z" {...k(FAT)} />
      <path d="M20 104h120" {...k(MED)} />
    </>
  ),
};

const katori: Good = {
  colour: ({ ink, tint }) => (
    <>
      <path d="M26 58h108c-4 36-25 54-54 54S30 94 26 58Z" fill={ink} />
      <path d="M80 58h54c-4 36-25 54-54 54Z" fill={tint} />
      <path d="M61 112h38l7 24H54Z" fill={ink} />
    </>
  ),
  key: () => (
    <>
      <path d="M26 58h108c-4 36-25 54-54 54S30 94 26 58Z" {...k(FAT)} />
      <path d="M20 58h120" {...k(MED)} />
      <path d="M46 82h68" {...k(HAIR)} />
      <path d="M61 112h38l7 24H54Z" {...k(THIN)} />
    </>
  ),
};

export const GOODS = {
  hoops,
  jhumka,
  pendant,
  stackRings,
  bangles,
  studs,
  anklet,
  vase,
  diya,
  candleHolder,
  planter,
  mirror,
  incense,
  katori,
} as const;

export type GoodKey = keyof typeof GOODS;


/* sampled from klik logo.png — the drawings are made of the mark */
const LINE = "#3c2848";
const BODY = "#ffe4c4";
const BODY_SOFT = "#fff3e2";
/* the logo's orange, reserved for things that actually carry a flame */
const WARM = "#ffa444";

/* Flat two-tone illustration on the page's own palette. */
export function GoodFigure({
  good,
  label,
  scale = 1,
}: {
  good: GoodKey;
  /** when set, the drawing is announced instead of hidden */
  label?: string;
  /** optical size relative to the tile — a stud should not fill it */
  scale?: number;
}) {
  const g = GOODS[good];
  const inset = (160 * (1 - scale)) / 2;
  return (
    <svg
      viewBox={`${-inset} ${-inset} ${160 + inset * 2} ${160 + inset * 2}`}
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {label && <title>{label}</title>}
      <defs>
        <radialGradient id={`ground-${good}`}>
          <stop offset="0%" stopColor={LINE} stopOpacity="0.2" />
          <stop offset="100%" stopColor={LINE} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* the object rests on something instead of floating in the tile */}
      <ellipse cx="80" cy="148" rx="50" ry="8" fill={`url(#ground-${good})`} />
      <g>
        {g.colour({ ink: BODY, tint: BODY_SOFT, warm: WARM })}
      </g>
      <g stroke={LINE} fill="none">
        {g.key()}
      </g>
    </svg>
  );
}
