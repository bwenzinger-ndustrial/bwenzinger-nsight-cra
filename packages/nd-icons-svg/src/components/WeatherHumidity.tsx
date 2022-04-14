import * as React from 'react';
import { SVGProps } from 'react';

const SvgWeatherHumidity = (props: SVGProps<SVGSVGElement>) => (
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
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="m7.496 7 4.599 4.688c1.86 1.894 2.416 4.744 1.41 7.22C12.5 21.386 10.13 23 7.5 23c-2.63 0-5-1.615-6.005-4.091-1.006-2.477-.45-5.327 1.41-7.221L7.495 7ZM18.998 1l2.83 2.93c1.144 1.184 1.487 2.965.868 4.513C22.076 9.991 20.618 11 19 11c-1.618 0-3.077-1.01-3.696-2.557-.619-1.548-.276-3.33.869-4.513L18.998 1Z" />
    </g>
  </svg>
);

export default SvgWeatherHumidity;
