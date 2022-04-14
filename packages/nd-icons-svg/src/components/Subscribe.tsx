import * as React from 'react';
import { SVGProps } from 'react';

const SvgSubscribe = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M5 11.55a11 11 0 0 1 14.08 0M1.42 8c6.046-5.33 15.114-5.33 21.16 0M8.53 15.11a6 6 0 0 1 6.95 0M12 19h.01" />
    </g>
  </svg>
);

export default SvgSubscribe;
