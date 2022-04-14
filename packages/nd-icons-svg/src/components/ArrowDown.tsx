import * as React from 'react';
import { SVGProps } from 'react';

const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    stroke="#0B588A"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth={2}
    {...props}
  >
    <g fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5v14M4.95 12.5l7 7 7-7" />
    </g>
  </svg>
);

export default SvgArrowDown;
