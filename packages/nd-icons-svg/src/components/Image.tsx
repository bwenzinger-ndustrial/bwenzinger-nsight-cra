import * as React from 'react';
import { SVGProps } from 'react';

const SvgImage = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(3 3)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width={18} height={18} rx={2} />
      <circle cx={5.5} cy={5.5} r={1.5} />
      <path d="m18 12-5-5L2 18" />
    </g>
  </svg>
);

export default SvgImage;
