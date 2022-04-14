import * as React from 'react';
import { SVGProps } from 'react';

const SvgWeatherSnowflake = (props: SVGProps<SVGSVGElement>) => (
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
      <g strokeWidth={2} transform="translate(2 2)">
        <circle cx={10} cy={18.182} r={1.818} />
        <circle
          transform="matrix(1 0 0 -1 0 3.636)"
          cx={10}
          cy={1.818}
          r={1.818}
        />
        <path d="M10 6.364V4.545M10 13.636v1.819" />
        <circle cx={10} cy={10} r={2.727} />
        <path d="M5.364 14.636h.009M14.636 14.636h.01M5.364 5.364h.009M14.636 5.364h.01" />
        <circle transform="rotate(90 1.818 10)" cx={1.818} cy={10} r={1.818} />
        <circle
          transform="matrix(0 1 1 0 8.182 -8.182)"
          cx={18.182}
          cy={10}
          r={1.818}
        />
        <path d="M13.636 10h1.819M6.364 10H4.545" />
      </g>
    </g>
  </svg>
);

export default SvgWeatherSnowflake;
