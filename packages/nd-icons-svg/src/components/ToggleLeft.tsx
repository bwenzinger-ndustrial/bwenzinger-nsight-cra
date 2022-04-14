import * as React from 'react';
import { SVGProps } from 'react';

const SvgToggleLeft = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(1 5)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width={22} height={14} rx={7} />
      <circle cx={7} cy={7} r={3} />
    </g>
  </svg>
);

export default SvgToggleLeft;
