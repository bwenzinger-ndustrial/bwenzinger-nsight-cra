import React from 'react';
import styled from 'styled-components';
import { ChevronDown } from '@ndustrial/nd-icons-svg';
import { Button as UnstyledButton } from '@ndustrial/nd-menu-button-react';
import { NdDropdownButtonProps } from './types';

const ArrowContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Arrow = styled(ChevronDown)`
  stroke: ${({ theme }) => theme.colors.primary};
  height: 16px;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 16px;

  [aria-expanded='true'] & {
    transform: rotate(180deg);
  }
`;

const ButtonContainer = styled(UnstyledButton)`
  background: #fff;
  border: 1px solid #e6e6e6;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  outline-color: #ccc;
  outline-width: thin;
  padding: 8px ${40 + 14}px 8px 14px;
  position: relative;
  width: 100%;

  ${ArrowContainer} {
    border-left: 1px solid #f2f2f2;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
  }
`;

function DropdownButton({ children, ...props }: NdDropdownButtonProps) {
  return (
    <ButtonContainer tag="div" {...props}>
      {children}

      <ArrowContainer aria-hidden>
        <Arrow />
      </ArrowContainer>
    </ButtonContainer>
  );
}

export default DropdownButton;
