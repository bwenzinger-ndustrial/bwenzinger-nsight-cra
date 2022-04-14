import * as React from 'react';
import { SVGProps } from 'react';

const SvgProfileCheck = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(1 3)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18v-2a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v2" />
      <circle cx={7.5} cy={4} r={4} />
      <path d="m16 8 2 2 4-4" />
    </g>
  </svg>
);

export default SvgProfileCheck;
