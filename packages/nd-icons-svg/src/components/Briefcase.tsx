import * as React from 'react';
import { SVGProps } from 'react';

const SvgBriefcase = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(2 3)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect y={4} width={20} height={14} rx={2} />
      <path d="M14 18V2a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16" />
    </g>
  </svg>
);

export default SvgBriefcase;
