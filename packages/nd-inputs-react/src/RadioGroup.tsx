import React, { InputHTMLAttributes } from 'react';
import FormGroup from './FormGroup';

interface RadioGroupPassedProps {
  children: JSX.Element | JSX.Element[] | any;
  inline?: boolean;
  onChange: (event: any) => void;
  value: any;
}

type RadioGroupProps = InputHTMLAttributes<HTMLDivElement> &
  RadioGroupPassedProps;

function RadioGroup({ children, inline, value, ...rest }: RadioGroupProps) {
  return (
    <FormGroup inline={inline}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          checked: child.props.value === value,
          ...rest
        });
      })}
    </FormGroup>
  );
}

export default RadioGroup;
