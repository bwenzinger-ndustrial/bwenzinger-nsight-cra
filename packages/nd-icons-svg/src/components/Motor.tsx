import * as React from 'react';
import { SVGProps } from 'react';

const SvgMotor = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M6 4h12a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H6h0V4ZM10 16h4a4 4 0 0 1 4 4h0-8v-4ZM11 8h6M11 12h6M2 8h4v4H2z" />
    </g>
  </svg>
);

export default SvgMotor;
