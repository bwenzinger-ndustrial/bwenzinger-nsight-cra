import * as React from 'react';
import { SVGProps } from 'react';

const SvgTrendingDown = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m23 18-9.5-9.5-5 5L1 6" />
      <path d="M17 18h6v-6" />
    </g>
  </svg>
);

export default SvgTrendingDown;
