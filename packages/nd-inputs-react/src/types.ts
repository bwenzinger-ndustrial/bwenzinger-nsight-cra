import { InputHTMLAttributes, ReactNode } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { RadioButtonPassedProps, RadioButtonStylingProps } from './RadioButton';

export interface NdFormControlStylingProps {
  disabled?: boolean;
  invalid?: boolean;
}

export interface NdFormControlPassedProps {
  children?: ReactNode;
  className?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
}

export type NdFormControlProps = NdFormControlStylingProps &
  NdFormControlPassedProps;

export type NdFormControlLabelAdapterProps = FieldRenderProps<string, any> &
  (NdRadioButtonProps | NdCheckboxProps);

export type NdRadioButtonProps = NdCheckboxProps &
  RadioButtonPassedProps &
  RadioButtonStylingProps;

export interface NdCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
}
