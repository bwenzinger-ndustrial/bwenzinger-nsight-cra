import * as React from 'react';
import { SVGProps } from 'react';

const SvgTooltipQuestion = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10Z"
      fill="#606060"
      stroke="#606060"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.03 7.532A4.101 4.101 0 0 1 15 8.9c0 2.735-4.101 4.102-4.101 4.102M11.008 17.325h.014"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgTooltipQuestion;
