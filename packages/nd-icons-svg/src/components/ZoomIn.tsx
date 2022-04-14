import * as React from 'react';
import { SVGProps } from 'react';

const SvgZoomIn = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(3 3)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={8} cy={8} r={8} />
      <path d="m18 18-4.35-4.35M8 5v6M5 8h6" />
    </g>
  </svg>
);

export default SvgZoomIn;
