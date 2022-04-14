import * as React from 'react';
import { SVGProps } from 'react';

const SvgCombine = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="m17 17 5-5-5-5" />
      <path d="M22 12H12L6 3H2M10 15l-4 6H2" />
    </g>
  </svg>
);

export default SvgCombine;
