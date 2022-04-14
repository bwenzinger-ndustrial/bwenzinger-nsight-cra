import * as React from 'react';
import { SVGProps } from 'react';

const SvgChartDot = (props: SVGProps<SVGSVGElement>) => (
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
      transform="rotate(-90 11 10)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={10} cy={3} r={3} />
      <circle cx={3} cy={11} r={3} />
      <circle cx={15} cy={19} r={3} />
      <path d="m5.59 13.51 6.83 3.98M7.75 5 5 8" />
    </g>
  </svg>
);

export default SvgChartDot;
