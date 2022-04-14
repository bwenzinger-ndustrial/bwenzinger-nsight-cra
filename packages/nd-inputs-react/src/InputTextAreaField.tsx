import React, { ForwardedRef, HTMLProps, ReactNode, Ref } from 'react';
import styled from 'styled-components';

import FormControl from './FormControl';
import InputLabel from './InputLabel';
import FormHelperText from './FormHelperText';
import { Tooltip as UnStyledTooltip } from '@ndustrial/nd-tooltip-react';
import {
  Info as InfoIcon,
  Pencil as PencilIcon
} from '@ndustrial/nd-icons-svg';
import InputTextArea, { InputTextAreaProps } from './InputTextArea';

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

export type InputTextAreaFieldProps = Omit<InputTextAreaProps, 'ref'> &
  PassedProps;

const UnStyledInputTextAreaField = React.forwardRef(
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
      ...rest
    }: InputTextAreaFieldProps,
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
          <InputTextArea
            ref={ref}
            disabled={disabled}
            invalid={invalid}
            // multiline={multiline}
            required={required}
            {...rest}
          />
          {helperText && <FormHelperText as="div">{helperText}</FormHelperText>}
        </label>
      </FormControl>
    );
  }
);

UnStyledInputTextAreaField.displayName = 'UnStyledInputTextField';

const InputTextAreaField = styled(
  UnStyledInputTextAreaField
)<InputTextAreaFieldProps>``;

InputTextAreaField.displayName = 'InputTextField';

export default InputTextAreaField;
