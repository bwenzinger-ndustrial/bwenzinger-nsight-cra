import * as React from 'react';
import { SVGProps } from 'react';

const SvgCompass = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(2 2)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={10} cy={10} r={10} />
      <path d="m14.24 5.76-2.12 6.36-6.36 2.12 2.12-6.36z" />
    </g>
  </svg>
);

export default SvgCompass;
