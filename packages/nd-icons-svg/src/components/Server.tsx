import * as React from 'react';
import { SVGProps } from 'react';

const SvgServer = (props: SVGProps<SVGSVGElement>) => (
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
      <rect width={20} height={8} rx={2} />
      <rect y={12} width={20} height={8} rx={2} />
      <path d="M4 4h.01M4 16h.01" />
    </g>
  </svg>
);

export default SvgServer;
