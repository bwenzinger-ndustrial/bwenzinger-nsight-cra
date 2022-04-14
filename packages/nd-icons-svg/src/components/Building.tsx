import * as React from 'react';
import { SVGProps } from 'react';

const SvgBuilding = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    stroke="#0B588A"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <path strokeWidth={2} d="M6 5h12v18H6z" />
      <path strokeWidth={2} d="M10 23v-6h4v6z" />
      <path d="M9.5 13.5v-1h1v1zM13.5 13.5v-1h1v1zM9.5 9.5v-1h1v1zM13.5 9.5v-1h1v1z" />
      <path d="M16 5V3M8 1h4v4H8z" strokeWidth={2} />
    </g>
  </svg>
);

export default SvgBuilding;
