import * as React from 'react';
import { SVGProps } from 'react';

const SvgUmbrella = (props: SVGProps<SVGSVGElement>) => (
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
      d="M23 12a11.05 11.05 0 0 0-22 0h22Zm-5 7a3 3 0 0 1-6 0v-7l6 7Z"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgUmbrella;
