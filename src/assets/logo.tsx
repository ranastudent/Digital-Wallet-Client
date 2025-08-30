// logo.tsx
import React from "react";

const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="56"
      height="56"
      role="img"
      aria-label="Digital Wallet logo with a flying bird dropping money"
      {...props} // allows you to pass className, style, width, height etc.
    >
      <defs>
        <style>
          {`
          .outline { stroke: #0f172a; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; fill: none; }
          .wallet  { fill: #0ea5b7; }
          .note    { fill: #22c55e; }
          .noteEdge{ stroke: #0f172a; stroke-width: 4; fill: none; }
          .coin    { fill: #f1c40f; }
          .muted   { stroke: #64748b; stroke-width: 3; stroke-linecap: round; fill: none; }
        `}
        </style>
      </defs>

      <circle cx="128" cy="128" r="120" fill="#f8fafc" />

      {/* Wallet */}
      <g>
        <rect x="40" y="96" width="148" height="92" rx="18" className="wallet" />
        <rect x="40" y="96" width="148" height="92" rx="18" className="outline" />
        <path d="M40 124h148" className="outline" />
        <circle cx="164" cy="138" r="7" fill="#fff" stroke="#0f172a" strokeWidth="4" />
      </g>

      {/* Bird */}
      <g className="outline">
        <path d="M160 64c12 10 27 14 46 8" />
        <path d="M206 72l10-4" />
        <path d="M158 64c6 10 6 19 1 27" />
        <path d="M170 80l-10 8" />
      </g>

      <path d="M146 70h-12" className="muted" />
      <path d="M150 86h-16" className="muted" />

      {/* Notes & Coins */}
      <g>
        <rect x="182" y="104" width="28" height="16" rx="2" className="note" />
        <rect x="182" y="104" width="28" height="16" rx="2" className="noteEdge" />
        <circle cx="196" cy="112" r="4" fill="#bbf7d0" stroke="#0f172a" strokeWidth="2" />
        <path d="M196 96v8" className="muted" />

        <g transform="rotate(8 170 138)">
          <rect x="156" y="130" width="26" height="15" rx="2" className="note" />
          <rect x="156" y="130" width="26" height="15" rx="2" className="noteEdge" />
          <circle cx="169" cy="137.5" r="3.5" fill="#bbf7d0" stroke="#0f172a" strokeWidth="2" />
        </g>
        <path d="M169 122v8" className="muted" />

        <g transform="rotate(-7 156 164)">
          <rect x="144" y="156" width="24" height="14" rx="2" className="note" />
          <rect x="144" y="156" width="24" height="14" rx="2" className="noteEdge" />
          <circle cx="156" cy="163" r="3.2" fill="#bbf7d0" stroke="#0f172a" strokeWidth="2" />
        </g>
        <path d="M156 148v8" className="muted" />

        <circle cx="188" cy="150" r="6" className="coin" stroke="#0f172a" strokeWidth="4" />
        <circle cx="174" cy="170" r="5" className="coin" stroke="#0f172a" strokeWidth="4" />
      </g>
    </svg>
  );
};

export default Logo;
