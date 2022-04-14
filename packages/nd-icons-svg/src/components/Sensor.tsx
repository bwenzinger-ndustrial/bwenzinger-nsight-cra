import * as React from 'react';
import { SVGProps } from 'react';

const SvgSensor = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(2 4)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={10} cy={8} r={2} />
      <path d="M14.24 3.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49M17.07.93c3.904 3.905 3.904 10.235 0 14.14m-14.14 0C-.974 11.165-.974 4.835 2.93.93" />
    </g>
  </svg>
);

export default SvgSensor;
