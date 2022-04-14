import * as React from 'react';
import { SVGProps } from 'react';

const SvgList = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M8 6h13M8 12h13M8 18h13M3 18h.01M3 12h.01M3 6h.01" />
    </g>
  </svg>
);

export default SvgList;
