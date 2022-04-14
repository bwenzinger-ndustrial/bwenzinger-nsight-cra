import * as React from 'react';
import { SVGProps } from 'react';

const SvgVisibilityOn = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(1 4)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 8s4-8 11-8 11 8 11 8-4 8-11 8S0 8 0 8Z" />
      <circle cx={11} cy={8} r={3} />
    </g>
  </svg>
);

export default SvgVisibilityOn;
