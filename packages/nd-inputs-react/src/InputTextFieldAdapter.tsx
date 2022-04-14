import React from 'react';
import InputTextField, { InputTextFieldProps } from './InputTextField';
import { FieldRenderProps } from 'react-final-form';

export type InputTextFieldAdapterProps = FieldRenderProps<string, any> &
  InputTextFieldProps;

const InputTextFieldAdapter = ({
  helperText,
  input,
  meta,
  ...rest
}: InputTextFieldAdapterProps) => {
  return (
    <InputTextField
      {...input}
      {...rest}
      helperText={(meta?.touched ? meta?.error : '') || helperText || ''}
      invalid={meta?.touched && meta?.invalid}
    />
  );
};

export default InputTextFieldAdapter;
