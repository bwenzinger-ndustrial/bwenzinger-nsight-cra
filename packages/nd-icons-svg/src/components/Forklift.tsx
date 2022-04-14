import * as React from 'react';
import { SVGProps } from 'react';

const SvgForklift = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(1 5)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 13.5H0v-7h3v-6h5a2 2 0 0 1 1.6.8l3.9 5.2h4M22 13.5h-4.5V0M12.5 13.5H7" />
      <circle cx={4.5} cy={13.5} r={2.5} />
      <circle cx={15} cy={13.5} r={2.5} />
    </g>
  </svg>
);

export default SvgForklift;
