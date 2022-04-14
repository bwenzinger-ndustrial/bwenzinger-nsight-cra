import * as React from 'react';
import { SVGProps } from 'react';

const SvgMapPin = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(3 1)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 9c0 7-9 13-9 13S0 16 0 9a9 9 0 1 1 18 0h0Z" />
      <circle cx={9} cy={9} r={3} />
    </g>
  </svg>
);

export default SvgMapPin;
