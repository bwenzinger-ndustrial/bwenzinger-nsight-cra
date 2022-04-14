import * as React from 'react';
import { SVGProps } from 'react';

const SvgHamburger = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M3 12h18M3 6h18M3 18h18" />
    </g>
  </svg>
);

export default SvgHamburger;
