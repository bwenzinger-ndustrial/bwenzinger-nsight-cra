import * as React from 'react';
import { SVGProps } from 'react';

const SvgTruck = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(1 3)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h15v13H0zM15 5h4l3 3v5h-7z" />
      <circle cx={4.5} cy={15.5} r={2.5} />
      <circle cx={17.5} cy={15.5} r={2.5} />
    </g>
  </svg>
);

export default SvgTruck;
