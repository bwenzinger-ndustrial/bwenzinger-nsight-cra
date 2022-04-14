import * as React from 'react';
import { SVGProps } from 'react';

const SvgSlidersHorizontal = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M3 4h7M14 4h7M3 12h9M16 12h5M3 20h5M12 20h9M10 1v6M16 9v6M8 17v6" />
    </g>
  </svg>
);

export default SvgSlidersHorizontal;
