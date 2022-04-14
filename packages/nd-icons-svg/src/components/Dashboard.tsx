import * as React from 'react';
import { SVGProps } from 'react';

const SvgDashboard = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M3 6h9M8 12h13M3 18v-6M21 18H8M21 6h-4" />
    </g>
  </svg>
);

export default SvgDashboard;
