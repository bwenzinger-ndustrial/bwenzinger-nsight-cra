import * as React from 'react';
import { SVGProps } from 'react';

const SvgBuildings = (props: SVGProps<SVGSVGElement>) => (
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
      <g strokeWidth={2}>
        <path d="M10 2H2v20h8zM3 6h6M3 10h6M3 14h6M3 18h6M6 3v18" />
      </g>
      <path strokeWidth={2} d="M10 8h12v14H10zM20 8V6" />
      <path strokeWidth={2} d="M14 22v-6h4v6z" />
      <path d="M17.5 12.5v-1h1v1zM13.5 12.5v-1h1v1z" />
    </g>
  </svg>
);

export default SvgBuildings;
