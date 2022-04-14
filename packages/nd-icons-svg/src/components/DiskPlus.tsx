import * as React from 'react';
import { SVGProps } from 'react';

const SvgDiskPlus = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M17.5 21h-14a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l1 .997M17.5 21a2 2 0 0 0 2-2v-4" />
      <path d="M15.5 21v-8h-10v8M5.5 3v5h7M19.5 5v6M16.5 8h6" />
    </g>
  </svg>
);

export default SvgDiskPlus;
