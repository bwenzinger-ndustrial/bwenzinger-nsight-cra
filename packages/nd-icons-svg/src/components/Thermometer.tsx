import * as React from 'react';
import { SVGProps } from 'react';

const SvgThermometer = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(7 1)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 13.76V2.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0h0Z" />
      <circle cx={4.5} cy={17.5} r={2} />
      <path d="M7 9H5M4.5 13v2M7 5H5" />
    </g>
  </svg>
);

export default SvgThermometer;
