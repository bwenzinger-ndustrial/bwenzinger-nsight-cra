import * as React from 'react';
import { SVGProps } from 'react';

const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
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
      <rect x={7} y={7} width={13} height={13} rx={2} />
      <path d="M3 13H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </g>
  </svg>
);

export default SvgCopy;
