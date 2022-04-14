import React from 'react';
import FormControlLabel from './FormControlLabel';
import RadioButton from './RadioButton';
import Checkbox from './Checkbox';
import { FieldRenderProps } from 'react-final-form';
import { NdFormControlLabelAdapterProps } from './types';

function FormControlLabelAdapter({
  input,
  ...rest
}: NdFormControlLabelAdapterProps) {
  return (
    <FormControlLabel
      {...input}
      {...rest}
      // label={label}
      control={(props: any) =>
        input.type === 'radio' ? (
          <RadioButton {...props} />
        ) : (
          <Checkbox {...props} />
        )
      }
    />
  );
}

export default FormControlLabelAdapter;
