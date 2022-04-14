import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PrimaryButton } from '@ndustrial/nd-button-react';
import { Check } from '@ndustrial/nd-icons-svg';
import { whiten } from '@ndustrial/nsight-common/utils/colors';

const NO_OPP = () => {};

const STEP_SIZE = '30px';
const HOVER_SELECTED_TRANSFORM = 'transform: scale(1.15, 1.15);';

const ItemCheck = styled(Check)`
  stroke: #fff;
  position: absolute;
  font-size: 1.2rem;
`;

const StepItemDot = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${STEP_SIZE};
  height: ${STEP_SIZE};
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  position: relative;
  z-index: 1;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
  }
`;

const StepItemLabel = styled.span`
  font-size: 0.9rem;
  top: -1.8rem;
  width: calc(3 * ${STEP_SIZE});
  position: absolute;
  left: -${STEP_SIZE};
  text-align: center;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
  }
`;

const StepItem = styled.span`
  display: inline-block;
  width: ${STEP_SIZE};
  position: relative;
  margin-bottom: 1rem;
  cursor: pointer;

  // controls hover state, any other changes
  * {
    transition: all 0.1s linear;
  }

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
  }

  ${StepItemDot} {
    border-color: ${({ theme, isSelected, isComplete }) => {
      if (isSelected || isComplete) return theme.colors.primary;
      return theme.colors.gray;
    }};

    background-color: ${({ theme, isComplete }) =>
      isComplete ? theme.colors.primary : 'white'};
  }

  ${StepItemLabel} {
    color: ${({ isSelected }) => (isSelected ? '#cd5800' : `gray`)};
  }

  ${StepItemLabel}, ${StepItemDot} {
    ${({ isSelected }) => isSelected && HOVER_SELECTED_TRANSFORM}
  }

  &:hover {
    ${StepItemLabel}, ${StepItemDot} {
      ${({ isSelected }) => !isSelected && HOVER_SELECTED_TRANSFORM}
    }
  }
`;

const StepItems = styled.div`
  margin: 2rem auto 0;  
  
  ${StepItem} + ${StepItem} {
    margin-left: 100px;
  
    &::before {
      content: '';
      border-bottom: 2px dotted ${({ theme }) =>
        whiten(theme.colors.gray, 0.5)};
      transform: translateX(-100px);
      width: 100px;
      height: 50%;
      position: absolute;
      z-index: 0;
    }
  }
`;

const Content = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex: 1;
  overflow: auto;
  width: 100%;
`;

const PrevButton = styled(PrimaryButton)`
  grid-column: button-start;
`;

const NextButton = styled(PrimaryButton)`
  grid-column: button-end;
`;

const SaveAndCloseButton = styled(PrimaryButton)`
  grid-column: button-center;
`;

const NavigationButtons = styled.div`
  display: grid;
  grid-template-columns: [button-start] 100px [button-center] 100px [button-end] 100px;
  column-gap: 1rem;
  margin-top: 25px;
`;

const SteppedFlowWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.node,
      label: PropTypes.string,
      isTouched: PropTypes.bool,
      setTouchedOnShow: PropTypes.bool
    })
  ).isRequired,
  onSubmit: PropTypes.func,
  className: PropTypes.string.isRequired,
  isNewFlow: PropTypes.bool
};

const SteppedFlow = ({ steps, isNewFlow, onSubmit, className, ...rest }) => {
  const [_steps, _setSteps] = useState([...steps]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const updateStep = useCallback(
    (stepIndex, props) => {
      _setSteps((currentSteps) => {
        const updatedSteps = [...currentSteps];
        updatedSteps[stepIndex] = {
          ...updatedSteps[stepIndex],
          ...props
        };
        return updatedSteps;
      });
    },
    [_setSteps]
  );

  const incrementStep = () => setCurrentStepIndex(currentStepIndex + 1);
  const decrementStep = () => setCurrentStepIndex(currentStepIndex - 1);

  const prevDisabled = currentStepIndex === 0;
  const nextDisabled = currentStepIndex === steps.length - 1;

  const memoizedSetComplete = useCallback(
    (idx, isComplete) => {
      updateStep(idx, { isComplete });
    },
    [updateStep]
  );

  useEffect(() => {
    if (!isNewFlow) {
      _setSteps((currentSteps) => {
        return currentSteps.map((step) => ({ ...step, isTouched: true }));
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    updateStep(currentStepIndex, { isTouched: true });
  }, [currentStepIndex, updateStep]);

  return (
    <SteppedFlowWrapper className={className}>
      <StepItems>
        {_steps.map((step, idx) => (
          <StepItem
            key={idx}
            onClick={() => setCurrentStepIndex(idx)}
            isSelected={idx === currentStepIndex}
            isComplete={_steps[idx].isComplete}
            isTouched={_steps[idx].isTouched}
          >
            <StepItemLabel>{step.label}</StepItemLabel>
            <StepItemDot>{step.isComplete && <ItemCheck />}</StepItemDot>
          </StepItem>
        ))}
      </StepItems>
      {/* Everything gets passed down into the children, and they determine how to use it */}
      {_steps.map(({ StepComponent }, idx) => (
        <Content key={idx} isVisible={idx === currentStepIndex}>
          <StepComponent
            setComplete={memoizedSetComplete}
            onSubmit={onSubmit}
            steps={_steps}
            idx={idx}
            {...rest}
          />
        </Content>
      ))}
      <NavigationButtons>
        <PrevButton
          type={'button'}
          onClick={!prevDisabled ? decrementStep : NO_OPP}
          disabled={prevDisabled}
        >
          Previous
        </PrevButton>
        <SaveAndCloseButton type={'button'} onClick={onSubmit}>
          Save & Close
        </SaveAndCloseButton>
        <NextButton
          type={'button'}
          onClick={!nextDisabled ? incrementStep : NO_OPP}
          disabled={nextDisabled}
        >
          Next
        </NextButton>
      </NavigationButtons>
    </SteppedFlowWrapper>
  );
};

SteppedFlow.propTypes = propTypes;

export default SteppedFlow;
