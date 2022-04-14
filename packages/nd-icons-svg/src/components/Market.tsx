import * as React from 'react';
import { SVGProps } from 'react';

const SvgMarket = (props: SVGProps<SVGSVGElement>) => (
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
      transform="translate(1 3)"
      strokeWidth={2}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6" />
      <path d="M12 18v-8h5v8" />
      <circle cx={7} cy={12} r={2} />
      <path d="M16.872 4.058c-.329-.011-.63.17-.827.492-.338.553-1.24 1.428-2.224 1.428-.852 0-1.75-.966-1.839-1.208-.226-.634-.817-.921-1.318-.638a1.04 1.04 0 0 0-.367.356c-.08.151-.126.24-.138.268C10.06 4.996 9.074 6 8.21 6 7.101 6 6.198 4.93 5.968 4.556c-.192-.314-.482-.49-.801-.49h-.025c-.322.014-.62.222-.798.56-.185.35-1.074 1.312-2.308 1.312C.99 5.938 0 5.155 0 4.328c0-.203.023-.317.134-.7l.56-2.135A2 2 0 0 1 2.628 0l16.74.001a2 2 0 0 1 1.935 1.492l.573 2.18h0c.107.36.124.495.124.678 0 .898-1.093 1.594-2.032 1.594-1.222 0-2.113-.97-2.3-1.325-.178-.337-.475-.547-.796-.562Z" />
    </g>
  </svg>
);

export default SvgMarket;
