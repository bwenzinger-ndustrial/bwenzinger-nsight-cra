import * as React from 'react';
import { SVGProps } from 'react';

const SvgWarningTriangle = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M10.29 4.36 1.82 18.5a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 4.36a2 2 0 0 0-3.42 0ZM12 9.5v4M12 17.5h.01" />
    </g>
  </svg>
);

export default SvgWarningTriangle;
