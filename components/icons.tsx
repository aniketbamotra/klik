/* One stroke weight, one cap style, one 24px grid. */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
  focusable: "false" as const,
};

type P = { className?: string };

export const Search = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
);

export const Bag = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4.5 7.5h15l-1.2 12H5.7Z" />
    <path d="M8.75 10V6.75a3.25 3.25 0 0 1 6.5 0V10" />
  </svg>
);

export const User = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="8.5" r="3.75" />
    <path d="M4.75 20a7.25 7.25 0 0 1 14.5 0" />
  </svg>
);

export const ArrowRight = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4.5 12h15" />
    <path d="M13.5 6l6 6-6 6" />
  </svg>
);

export const Menu = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Truck = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M2.75 6.75h11v10h-11z" />
    <path d="M13.75 10.25h3.6l3.9 3.4v3.1h-7.5z" />
    <circle cx="7" cy="18.5" r="1.75" />
    <circle cx="17" cy="18.5" r="1.75" />
  </svg>
);

export const Return = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 11a8 8 0 1 1 2.2 5.5" />
    <path d="M3.5 5.5V11H9" />
  </svg>
);

export const Shield = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3.25l7 2.5v6c0 4.3-2.9 7.7-7 9-4.1-1.3-7-4.7-7-9v-6z" />
    <path d="M9 12l2.25 2.25L15.25 10" />
  </svg>
);
