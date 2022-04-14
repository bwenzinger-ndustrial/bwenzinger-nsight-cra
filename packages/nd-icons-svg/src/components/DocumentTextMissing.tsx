import * as React from 'react';
import { SVGProps } from 'react';

const SvgDocumentTextMissing = (props: SVGProps<SVGSVGElement>) => (
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
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="M14 2v6h6" />
      <path d="M8 2h6l6 6v6M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2L4 4ZM1 1l22 22" />
    </g>
  </svg>
);

export default SvgDocumentTextMissing;
