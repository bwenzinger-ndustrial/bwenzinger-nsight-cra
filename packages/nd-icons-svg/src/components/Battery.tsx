import * as React from 'react';
import { SVGProps } from 'react';

const SvgBattery = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(1 6)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width={18} height={12} rx={2} />
      <path d="M22 7V5" />
    </g>
  </svg>
);

export default SvgBattery;
