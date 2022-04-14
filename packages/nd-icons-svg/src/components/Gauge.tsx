import * as React from 'react';
import { SVGProps } from 'react';

const SvgGauge = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(2 2)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={10} cy={10} r={10} />
      <path d="M10 9v3" />
      <circle cx={10} cy={14} r={2} />
      <path d="M10 4h.01M14 6h.01M6 6h.01M4 10h.01M16 10h.01" />
    </g>
  </svg>
);

export default SvgGauge;
