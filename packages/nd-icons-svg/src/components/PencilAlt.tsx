import * as React from 'react';
import { SVGProps } from 'react';

const SvgPencilAlt = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M12 21h9M16.5 4.5a2.121 2.121 0 0 1 3 3L7 20l-4 1 1-4L16.5 4.5Z" />
    </g>
  </svg>
);

export default SvgPencilAlt;
