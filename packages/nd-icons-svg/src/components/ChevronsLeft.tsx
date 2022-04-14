import * as React from 'react';
import { SVGProps } from 'react';

const SvgChevronsLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    stroke="#0B588A"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m11 17-5-5 5-5M18 17l-5-5 5-5" />
    </g>
  </svg>
);

export default SvgChevronsLeft;
