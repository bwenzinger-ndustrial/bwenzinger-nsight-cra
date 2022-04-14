import * as React from 'react';
import { SVGProps } from 'react';

const SvgPencilAlt2 = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M19.5 1.5a2.121 2.121 0 0 1 3 3L13 14l-4 1 1-4 9.5-9.5Z" />
    </g>
  </svg>
);

export default SvgPencilAlt2;
