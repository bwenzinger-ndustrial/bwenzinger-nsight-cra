import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Label = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  margin-left: 10px;
`;

interface ControlProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  control: (props: any) => ReactNode;
  label: string;
  required?: boolean;
}

interface StylingProps {
  disabled?: boolean;
}

type Props = ControlProps & StylingProps & any;

function UnStyledFormControlLabel({
  className,
  control,
  label,
  required,
  ...rest
}: ControlProps) {
  return (
    <label className={className}>
      {control({ required, ...rest })}
      <Label>
        {label}
        {required && <span>&nbsp;*</span>}
      </Label>
    </label>
  );
}

const FormControlLabel = styled(UnStyledFormControlLabel)<Props>`
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;

  ${Label} {
    color: ${({ disabled }) => disabled && '#D5D5D5'};
  }
`;

export default FormControlLabel;
