import * as React from 'react';
import { SVGProps } from 'react';

const SvgLock = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(3 2)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect y={9} width={18} height={11} rx={2} />
      <path d="M4 9V5a5 5 0 1 1 10 0v4" />
    </g>
  </svg>
);

export default SvgLock;
