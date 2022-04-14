import * as React from 'react';
import { SVGProps } from 'react';

const SvgWater = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    stroke="#0B588A"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m12 2.69 5.66 5.66a8 8 0 1 1-11.31 0L12 2.69Z"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgWater;
