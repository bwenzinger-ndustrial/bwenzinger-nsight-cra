import * as React from 'react';
import { SVGProps } from 'react';

const SvgOctagonOutline = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86z"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgOctagonOutline;
