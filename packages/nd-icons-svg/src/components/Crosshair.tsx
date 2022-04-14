import * as React from 'react';
import { SVGProps } from 'react';

const SvgCrosshair = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M20 10h-4M4 10H0M10 4V0M10 20v-4" />
    </g>
  </svg>
);

export default SvgCrosshair;
