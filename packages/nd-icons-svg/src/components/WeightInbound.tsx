import * as React from 'react';
import { SVGProps } from 'react';

const SvgWeightInbound = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M7.509 7h8.982a2 2 0 0 1 1.923 1.45l2.858 10A2 2 0 0 1 19.349 21H4.65a2 2 0 0 1-1.923-2.55l2.858-10A2 2 0 0 1 7.509 7Z" />
      <path d="m12 18 4-4-4-4M8 14h8M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </g>
  </svg>
);

export default SvgWeightInbound;
