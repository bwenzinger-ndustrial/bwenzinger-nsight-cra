import * as React from 'react';
import { SVGProps } from 'react';

const SvgUnlock = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(3 1)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect y={10} width={18} height={11} rx={2} />
      <path d="M4 10V6a5 5 0 0 1 9.9-1" />
    </g>
  </svg>
);

export default SvgUnlock;
