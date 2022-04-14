import * as React from 'react';
import { SVGProps } from 'react';

const SvgAward = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(5 1)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={7} cy={7} r={7} />
      <circle cx={7} cy={7} r={3} />
      <path d="M3.21 12.89 2 22l5-3 5 3-1.21-9.12" />
    </g>
  </svg>
);

export default SvgAward;
