import * as React from 'react';
import { SVGProps } from 'react';

const SvgElectricityOff = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M12.41 6.75 13 2l-2.43 2.92M18.57 12.91 21 10h-5.34M8 8l-5 6h9l-1 8 5-6M1 1l22 22" />
    </g>
  </svg>
);

export default SvgElectricityOff;
