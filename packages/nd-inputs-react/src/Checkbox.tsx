import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { NdCheckboxProps } from './types';

export const CheckboxFill = styled.div`
  height: 9px;
  margin: 2px;
  width: 9px;
`;

export const CheckboxBorder = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: #979797;
  height: 100%;
  transition: all 0.15s ease-out;
  width: 100%;

  ${CheckboxFill} {
    background-color: #0b588a;
  }
`;

export const CheckboxInput = styled.input`
  cursor: inherit;
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  padding: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

function UnStyledCheckbox({
  checked = false,
  className,
  disabled = false,
  ...rest
}: NdCheckboxProps) {
  return (
    <div className={className}>
      <CheckboxInput
        {...rest}
        aria-disabled={disabled}
        checked={checked}
        disabled={disabled}
        type="checkbox"
      />
      <CheckboxBorder>{checked && <CheckboxFill />}</CheckboxBorder>
    </div>
  );
}

const Checkbox = styled(UnStyledCheckbox)<NdCheckboxProps>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: inline-block;
  height: 15px;
  position: relative;
  width: 15px;
  transition: all 0.15s ease-out;

  ${CheckboxInput}:focus + ${CheckboxBorder},
  ${CheckboxInput}:hover + ${CheckboxBorder} {
    border-color: #0b588a;
  }

  ${CheckboxInput}:disabled + ${CheckboxBorder} {
    border-color: ${({ theme }) => theme.colors.disabled};

    ${CheckboxFill} {
      background-color: ${({ theme }) => theme.colors.disabled};
    }
  }

  ${CheckboxInput}:invalid + ${CheckboxBorder} {
    border-color: ${({ theme }) => theme.colors.failure};
  }
`;

export default Checkbox;
