import * as React from 'react';
import { SVGProps } from 'react';

const SvgDatabase = (props: SVGProps<SVGSVGElement>) => (
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
      <ellipse cx={9} cy={3} rx={9} ry={3} />
      <path d="M18 10c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M0 3v14c0 1.66 4 3 9 3s9-1.34 9-3V3" />
    </g>
  </svg>
);

export default SvgDatabase;
