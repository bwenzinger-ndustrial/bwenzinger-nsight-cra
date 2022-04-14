import * as React from 'react';
import { SVGProps } from 'react';

const SvgShieldOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    stroke="#0B588A"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgShieldOn;
