import * as React from 'react';
import { SVGProps } from 'react';

const SvgInfo = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M7.09 7a3 3 0 0 1 5.83 1c0 2-3 3-3 3M10 15h.01" />
    </g>
  </svg>
);

export default SvgInfo;
