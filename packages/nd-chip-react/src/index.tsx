import React from 'react';
import styled from 'styled-components';
import { NdChipProps } from './types';
export * from './types';

const ChipIcon = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  stroke: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  font-size: 0.7rem;
`;

const ChipLabel = styled.label`
  cursor: auto;
  display: inline-block;
`;

const Chip = styled.div`
  align-items: center;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  color: ${({ theme }) => theme.colors.text};
  display: inline-flex;
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  padding: 8px 14px;

  ${ChipIcon}:not(:last-child),
  ${ChipLabel}:not(:last-child) {
    margin-right: 10px;
  }
`;

const ChipGroupWrapper = styled.div`
  overflow: hidden;
`;

const ChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -5px;

  ${Chip} {
    margin: 5px;
  }
`;

function ChipGroupComponent(props: NdChipProps) {
  const { children, className, ...rest } = props;

  return (
    <ChipGroupWrapper className={className} {...rest}>
      <ChipGroup>{children}</ChipGroup>
    </ChipGroupWrapper>
  );
}

export { Chip, ChipGroupComponent as ChipGroup, ChipIcon, ChipLabel };
