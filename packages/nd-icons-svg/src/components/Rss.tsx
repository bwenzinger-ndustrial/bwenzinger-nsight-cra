import * as React from 'react';
import { SVGProps } from 'react';

const SvgRss = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(4 4)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 7a9 9 0 0 1 9 9M0 0c8.837 0 16 7.163 16 16" />
      <circle cx={1} cy={15} r={1} />
    </g>
  </svg>
);

export default SvgRss;
