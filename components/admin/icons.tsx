/* Admin icon set — same 24px grid and 1.6 stroke as the storefront's, so the
   two surfaces share one drawing hand. */

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

export const Gauge = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 18a8 8 0 1 1 16 0" />
    <path d="M12 18l4.5-5" />
  </svg>
);

export const Box = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3.5l7.5 4v9L12 20.5 4.5 16.5v-9z" />
    <path d="M4.5 7.5L12 11.5l7.5-4" />
    <path d="M12 11.5v9" />
  </svg>
);

export const Layers = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3.5l8 4.5-8 4.5-8-4.5z" />
    <path d="M4 12.5l8 4.5 8-4.5" />
  </svg>
);

export const Receipt = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M5.5 3.5h13v17l-2.2-1.5-2.2 1.5-2.1-1.5-2.2 1.5-2.1-1.5-2.2 1.5z" />
    <path d="M9 8.5h6M9 12.5h6" />
  </svg>
);

export const Plus = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Upload = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 16V4" />
    <path d="M7.5 8.5L12 4l4.5 4.5" />
    <path d="M4.5 16v3.5h15V16" />
  </svg>
);

export const Trash = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4.5 6.5h15" />
    <path d="M9.5 6.5V4.5h5v2" />
    <path d="M6.5 6.5l1 13h9l1-13" />
  </svg>
);

export const Star = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 4l2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8z" />
  </svg>
);

export const Menu = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Back = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M19.5 12h-15" />
    <path d="M10.5 6l-6 6 6 6" />
  </svg>
);

export const Logout = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M14 4.5H5.5v15H14" />
    <path d="M18.5 12h-9" />
    <path d="M15 8.5l3.5 3.5L15 15.5" />
  </svg>
);

export const Shop = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 9.5h16v10H4z" />
    <path d="M4.5 9.5L6 4.5h12l1.5 5" />
    <path d="M9.5 19.5v-5h5v5" />
  </svg>
);
