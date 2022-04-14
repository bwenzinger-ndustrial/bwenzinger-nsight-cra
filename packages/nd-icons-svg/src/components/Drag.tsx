import * as React from 'react';
import { SVGProps } from 'react';

const SvgDrag = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M9 6.5h1v1H9zM9 11.5h1v1H9zM9 16.5h1v1H9zM14 6.5h1v1h-1zM14 11.5h1v1h-1zM14 16.5h1v1h-1z" />
    </g>
  </svg>
);

export default SvgDrag;
