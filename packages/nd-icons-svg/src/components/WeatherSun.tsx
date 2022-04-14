import * as React from 'react';
import { SVGProps } from 'react';

const SvgWeatherSun = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(1 1)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={11} cy={11} r={5} />
      <path d="M11 0v2M11 20v2M3.22 3.22l1.42 1.42M17.36 17.36l1.42 1.42M0 11h2M20 11h2M3.22 18.78l1.42-1.42M17.36 4.64l1.42-1.42" />
    </g>
  </svg>
);

export default SvgWeatherSun;
