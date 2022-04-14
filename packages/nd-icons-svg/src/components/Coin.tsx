import * as React from 'react';
import { SVGProps } from 'react';

const SvgCoin = (props: SVGProps<SVGSVGElement>) => (
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
      <ellipse transform="rotate(90 12 9)" cx={12} cy={9} rx={9} ry={8} />
      <path d="M1 7h3M3 3h3M1 11h3M3 15h3M12.5 18h-4c-4.427 0-8-4-8-9s3.573-9 8-9h4" />
    </g>
  </svg>
);

export default SvgCoin;
