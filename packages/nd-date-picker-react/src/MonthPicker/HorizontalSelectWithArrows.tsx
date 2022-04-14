import React, { useEffect } from 'react';
import styled from 'styled-components';
import { defaultTheme } from '@ndustrial/nd-theme-react';
import { NextMonth, PreviousMonth } from '../Navigation';
import constants from '../constants';

const { TOGGLE_TRANSITION_SPEED } = constants;

const HSContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HSContainerValues = styled.div`
  color: ${defaultTheme.uiKitText.textTertiay};
  margin: 0 1rem;
  overflow: hidden;
`;

interface HSValueAnimatorProps {
  valueIndex?: number;
}

const HSValueAnimator = styled.div<HSValueAnimatorProps>`
  transition: transform ${TOGGLE_TRANSITION_SPEED}s ease-out;
  transform: translateX(
    ${({ valueIndex }) => (valueIndex ? `-${valueIndex * 100}%` : 0)}
  );
  position: relative;
  white-space: nowrap;
`;

const HSButton = styled.span`
  cursor: pointer;
  font-size: 20px;
`;

const HSValue = styled.span`
  width: 100%;
  display: inline-block;
  text-align: center;
`;

interface HorizontalSelectWithArrowsProps {
  values: number[];
  valueIndex?: number;
  className?: string;
  onUpdateIndex: (value: number) => void;
}

function HorizontalSelectWithArrows({
  onUpdateIndex,
  valueIndex = 1,
  values,
  className
}: HorizontalSelectWithArrowsProps) {
  const updateIndex = (direction: number) => {
    const newIndex = valueIndex + direction;
    if (newIndex < values.length && newIndex >= 0) {
      onUpdateIndex(newIndex);
    }
  };

  useEffect(() => {
    onUpdateIndex(valueIndex);
  }, [valueIndex]);

  return (
    <HSContainer className={className}>
      <HSButton onClick={() => updateIndex(-1)}>
        <PreviousMonth />
      </HSButton>
      <HSContainerValues>
        <HSValueAnimator valueIndex={valueIndex}>
          {values.map((value) => (
            <HSValue key={`hs_${value}`}>{value}</HSValue>
          ))}
        </HSValueAnimator>
      </HSContainerValues>
      <HSButton onClick={() => updateIndex(1)}>
        <NextMonth />
      </HSButton>
    </HSContainer>
  );
}

export default HorizontalSelectWithArrows;
