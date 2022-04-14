import * as React from 'react';
import { SVGProps } from 'react';

const SvgChevronsRight = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
    </g>
  </svg>
);

export default SvgChevronsRight;
