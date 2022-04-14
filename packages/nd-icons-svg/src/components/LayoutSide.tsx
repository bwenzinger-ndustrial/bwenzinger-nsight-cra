import * as React from 'react';
import { SVGProps } from 'react';

const SvgLayoutSide = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(3 3)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width={18} height={18} rx={2} />
      <path d="M6 0v18" />
    </g>
  </svg>
);

export default SvgLayoutSide;
