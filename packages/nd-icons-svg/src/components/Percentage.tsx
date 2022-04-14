import * as React from 'react';
import { SVGProps } from 'react';

const SvgPercentage = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(4 4)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 1 1 15" />
      <circle cx={2.5} cy={2.5} r={2.5} />
      <circle cx={13.5} cy={13.5} r={2.5} />
    </g>
  </svg>
);

export default SvgPercentage;
