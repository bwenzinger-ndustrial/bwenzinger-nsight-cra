import * as React from 'react';
import { SVGProps } from 'react';

const SvgPhone = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(5 2)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width={14} height={20} rx={2} />
      <path d="M4 4h6v8H4zM7 16h.01" />
    </g>
  </svg>
);

export default SvgPhone;
