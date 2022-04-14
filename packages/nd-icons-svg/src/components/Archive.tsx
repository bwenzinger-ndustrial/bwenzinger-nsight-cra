import * as React from 'react';
import { SVGProps } from 'react';

const SvgArchive = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
    </g>
  </svg>
);

export default SvgArchive;
