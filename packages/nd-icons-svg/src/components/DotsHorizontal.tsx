import * as React from 'react';
import { SVGProps } from 'react';

const SvgDotsHorizontal = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(4 11)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={8} cy={1} r={1} />
      <circle cx={15} cy={1} r={1} />
      <circle cx={1} cy={1} r={1} />
      <path d="M1 1h.01M8 1h.01M15 1h.01" />
    </g>
  </svg>
);

export default SvgDotsHorizontal;
