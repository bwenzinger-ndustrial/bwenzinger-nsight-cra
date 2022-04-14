import * as React from 'react';
import { SVGProps } from 'react';

const SvgArrowUp = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M12 19.5v-14M4.95 10.5l7-7 7 7" />
    </g>
  </svg>
);

export default SvgArrowUp;
