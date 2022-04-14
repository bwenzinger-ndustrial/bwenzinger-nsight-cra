import React, {
  ForwardedRef,
  HTMLProps,
  InputHTMLAttributes,
  LegacyRef,
  ReactNode,
  Ref
} from 'react';
import { ChangeEventHandler } from 'react';
import styled, { css } from 'styled-components';

const IconContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;

  svg {
    transition: all 0.15s ease-out;
  }
`;

export interface StyledInputTextAreaProps {
  hasEndIcon?: boolean;
  invalid?: boolean;
}

const commonCss = css<StyledInputTextAreaProps>`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ invalid, theme }) =>
    invalid ? theme.colors.failure : '#E6E6E6'};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  height: 100%;
  font-size: 1rem;
  padding-top: 10px;
  padding-right: ${({ hasEndIcon }) =>
    hasEndIcon ? 'calc(1rem + 20px)' : '10px'};
  padding-bottom: 10px;
  padding-left: 10px;
  resize: none;
  transition: all 0.15s ease-out;

  :disabled {
    background-color: #f4f4f4;
    cursor: not-allowed;
  }

  :focus {
    outline: 0;
    border-color: ${({ invalid, theme }) =>
      invalid ? theme.colors.failure : '#0b588a'};
  }

  :invalid {
    border-color: ${({ theme }) => theme.colors.failure};
  }

  ::placeholder {
    color: #c2c2c2;
  }
`;

const StyledTextArea = styled.textarea<StyledInputTextAreaProps>`
  ${commonCss}
`;

const StyledInput = styled.input<StyledInputTextAreaProps>`
  ${commonCss}
`;

const InputContainer = styled.div`
  position: relative;

  ${StyledInput}:focus + ${IconContainer} {
    svg {
      stroke: #0b588a;
    }
  }
`;

export interface InputTextAreaPassedProps {
  disabled?: boolean;
  endIcon?: ReactNode;
  invalid?: boolean;
  multiline?: boolean;
  required?: boolean;
}

// type StandardHTMLProps = React.ComponentProps<"input"> | React.ComponentProps<"textarea"> & (InputHTMLAttributes<HTMLInputElement> | InputHTMLAttributes<HTMLTextAreaElement>);
type StandardHTMLProps = InputHTMLAttributes<HTMLTextAreaElement>;
// type StandardHTMLProps = InputHTMLAttributes<HTMLInputElement>;

export type InputTextAreaProps = StandardHTMLProps &
  InputTextAreaPassedProps &
  StyledInputTextAreaProps;

const InputTextArea = React.forwardRef<HTMLTextAreaElement, InputTextAreaProps>(
  (
    { disabled = false, endIcon, invalid = false, multiline, ...rest },
    ref: Ref<any>
  ) => {
    return (
      <InputContainer className="nd-inputs-react-inputtext-inputcontainer">
        <StyledTextArea
          {...rest}
          className="nd-inputs-react-inputtext-input"
          ref={ref as ForwardedRef<HTMLTextAreaElement>}
          aria-disabled={disabled}
          aria-invalid={invalid}
          disabled={disabled}
          hasEndIcon={!!endIcon}
          invalid={invalid}
        />
        {endIcon && <IconContainer>{endIcon}</IconContainer>}
      </InputContainer>
    );
  }
);

// InputText.propTypes = propTypes;
// InputText.defaultProps = defaultProps;
InputTextArea.displayName = 'InputTextArea';

export default InputTextArea;
