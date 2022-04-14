import React from 'react';
import styled from 'styled-components';

import { CheckboxBorder, CheckboxFill, CheckboxInput } from './Checkbox';
import { NdCheckboxProps, NdRadioButtonProps } from './types';

const RadioButtonBorder = styled(CheckboxBorder)`
  border-radius: 50%;
`;

const RadioButtonFill = styled(CheckboxFill)`
  border-radius: 50%;
`;

const RadioButtonInput = styled(CheckboxInput)``;

export interface RadioButtonPassedProps {
  value?: any;
}

export interface RadioButtonStylingProps {
  disabled?: boolean;
}

type ControlProps = NdCheckboxProps & RadioButtonPassedProps;

function UnStyledRadioButton({
  checked = false,
  className,
  disabled = false,
  ...rest
}: ControlProps) {
  return (
    // <div className={className} disabled={disabled}>
    <div className={className}>
      <RadioButtonInput
        {...rest}
        aria-disabled={disabled}
        checked={checked}
        disabled={disabled}
        type="radio"
      />
      <RadioButtonBorder>{checked && <RadioButtonFill />}</RadioButtonBorder>
    </div>
  );
}

const RadioButton = styled(UnStyledRadioButton)<NdRadioButtonProps>`
  position: relative;
  height: 15px;
  width: 15px;
  display: inline-block;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${RadioButtonInput}:focus + ${RadioButtonBorder} {
    border-color: #0b588a;
  }

  ${RadioButtonInput}:disabled + ${RadioButtonBorder} {
    border-color: #d5d5d5;
    cursor: not-allowed ${RadioButtonFill} {
      background-color: #d5d5d5;
    }
  }
`;

export default RadioButton;
