import React, { ReactNode } from 'react';
import styled from 'styled-components';

import FormLabel from './FormLabel';
import InputLabel from './InputLabel';
import FormHelperText from './FormHelperText';
import FormGroup from './FormGroup';
import { NdFormControlProps, NdFormControlStylingProps } from './types';

function UnStyledFormControl({
  children,
  className,
  helperText,
  label,
  required = false
}: NdFormControlProps) {
  return (
    <div className={className}>
      {label && (
        <FormLabel>
          {label}
          {required && <span>&nbsp;*</span>}
        </FormLabel>
      )}
      {children}
      {helperText && <FormHelperText as="div">{helperText}</FormHelperText>}
    </div>
  );
}

const FormControl = styled(UnStyledFormControl)<NdFormControlStylingProps>`
  border: 0;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  > ${FormLabel} {
    margin-left: 10px;
  }

  > label ${InputLabel}, > ${InputLabel} {
    margin-bottom: 5px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }

  > label ${FormHelperText}, > ${FormHelperText} {
    margin-top: 5px;
    color: ${({ invalid, theme }) =>
      invalid ? theme.colors.failure : theme.colors.text};
  }

  ${FormGroup} + ${FormHelperText} {
    margin-left: 10px;
  }
`;

export default FormControl;
