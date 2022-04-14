import * as React from 'react';
import { SVGProps } from 'react';

const SvgRuler = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(2 6)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width={20} height={12} rx={2} />
      <path d="M10 1v4M5 1v4M15 1v4" />
    </g>
  </svg>
);

export default SvgRuler;
