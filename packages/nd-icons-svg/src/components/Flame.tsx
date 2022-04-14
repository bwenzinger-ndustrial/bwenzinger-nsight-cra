import * as React from 'react';
import { SVGProps } from 'react';

const SvgFlame = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2.69c-1.333 4.873-1 7.643 1 8.31 2 .667 3.553-.217 4.66-2.65a8 8 0 1 1-11.31 0L12 2.69Z" />
      <path d="m12.003 15 2.123 2.05a2.828 2.828 0 0 1 .65 3.16C14.314 21.294 13.22 22 12.006 22s-2.308-.706-2.772-1.79a2.828 2.828 0 0 1 .651-3.16l2.12-2.05Z" />
    </g>
  </svg>
);

export default SvgFlame;
