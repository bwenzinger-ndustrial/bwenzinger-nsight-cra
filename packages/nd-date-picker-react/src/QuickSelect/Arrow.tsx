import React, { SVGProps } from 'react';
import styled from 'styled-components';

import { ChevronDown } from '@ndustrial/nd-icons-svg';

export interface ArrowIconStyledProps {
  isOpen: boolean;
}

export type ArrowIconProps = ArrowIconStyledProps & SVGProps<SVGSVGElement>;

function SanitizedTriangleDown({ isOpen, ...rest }: ArrowIconProps) {
  return <ChevronDown {...rest} />;
}

const AccordionArrow = styled(SanitizedTriangleDown)<ArrowIconProps>`
  stroke: #2764ae;
  font-size: 12px;
  transform: rotate(${({ isOpen }) => (!isOpen ? '-90' : '0')}deg);
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

export default AccordionArrow;
