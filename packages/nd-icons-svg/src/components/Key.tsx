import * as React from 'react';
import { SVGProps } from 'react';

const SvgKey = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(2 2)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 0-2 2 2-2ZM9.39 9.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777l.001-.001Zm0 0L13.5 5.5 9.39 9.61ZM13.5 5.5l3 3L20 5l-3-3-3.5 3.5Zm0 0L17 2l-3.5 3.5Z" />
      <circle cx={5.5} cy={13.5} r={2} />
    </g>
  </svg>
);

export default SvgKey;
