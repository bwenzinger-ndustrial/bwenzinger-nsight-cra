import * as React from 'react';
import { SVGProps } from 'react';

const SvgRefresh = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M22 4v6h-6" />
      <path d="M19.49 15a9 9 0 1 1-2.12-9.36L22 10" />
    </g>
  </svg>
);

export default SvgRefresh;
