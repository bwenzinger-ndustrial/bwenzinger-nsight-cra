import React, { ForwardedRef, HTMLProps, ReactNode, Ref } from 'react';
import styled from 'styled-components';

import FormControl from './FormControl';
import InputLabel from './InputLabel';
import InputText, { InputTextProps } from './InputText';
import FormHelperText from './FormHelperText';
import { Tooltip as UnStyledTooltip } from '@ndustrial/nd-tooltip-react';
import {
  Info as InfoIcon,
  Pencil as PencilIcon
} from '@ndustrial/nd-icons-svg';
import InputTextArea from './InputTextArea';

const Tooltip = styled(UnStyledTooltip)`
  margin-left: 5px;
  display: flex;
  align-items: center;
`;

interface PassedProps {
  className?: string;
  helperText?: string;
  label?: string | ReactNode;
  tooltipContent?: any;
  // disabled?: boolean,
  // invalid?: boolean,
  // multiline?: boolean,
  // required?: boolean,
  // type?: string
}

export type InputTextFieldProps = Omit<InputTextProps, 'ref'> & PassedProps;

const UnStyledInputTextField = React.forwardRef(
  (
    {
      className,
      disabled,
      helperText,
      invalid,
      label,
      multiline = false,
      required = false,
      tooltipContent,
      type = 'text',
      ...rest
    }: InputTextFieldProps,
    ref: Ref<any>
  ) => {
    return (
      <FormControl className={className} disabled={disabled} invalid={invalid}>
        <label>
          {label && (
            <InputLabel as="div">
              {label}
              {required && <span>&nbsp;*</span>}
              {!!tooltipContent && (
                <Tooltip content={tooltipContent}>
                  <InfoIcon stroke="#0b588a" />
                </Tooltip>
              )}
            </InputLabel>
          )}
          <InputText
            ref={ref}
            disabled={disabled}
            endIcon={
              type === 'text' &&
              !multiline &&
              !disabled && <PencilIcon stroke="#BEBEBE" />
            }
            invalid={invalid}
            // multiline={multiline}
            required={required}
            type={type}
            {...rest}
          />
          {helperText && <FormHelperText as="div">{helperText}</FormHelperText>}
        </label>
      </FormControl>
    );
  }
);

UnStyledInputTextField.displayName = 'UnStyledInputTextField';

const InputTextField = styled(UnStyledInputTextField)<InputTextFieldProps>``;

InputTextField.displayName = 'InputTextField';

export default InputTextField;
