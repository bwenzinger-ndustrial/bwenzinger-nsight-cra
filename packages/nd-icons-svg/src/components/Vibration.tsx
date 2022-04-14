import * as React from 'react';
import { SVGProps } from 'react';

const SvgVibration = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="m13.5 20-3-4.444 3-3.556-3-3.556L13.5 4M7.5 20l-3-4.444L7.5 12l-3-3.556L7.5 4M19.5 20l-3-4.444 3-3.556-3-3.556L19.5 4" />
    </g>
  </svg>
);

export default SvgVibration;
