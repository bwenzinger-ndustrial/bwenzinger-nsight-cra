import * as React from 'react';
import { SVGProps } from 'react';

const SvgConnectedGrid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    stroke="#0B588A"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="M10 20H6M10 12H6M10 4H6M18 4h-4" />
      <circle cx={20} cy={20} r={2} />
      <circle cx={20} cy={12} r={2} />
      <circle cx={20} cy={4} r={2} />
      <circle cx={12} cy={20} r={2} />
      <circle cx={12} cy={12} r={2} />
      <circle cx={12} cy={4} r={2} />
      <circle cx={4} cy={20} r={2} />
      <circle cx={4} cy={12} r={2} />
      <circle cx={4} cy={4} r={2} />
      <path d="M20 14v4M12 6v4" />
    </g>
  </svg>
);

export default SvgConnectedGrid;
