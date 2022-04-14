import React from 'react';
import SingleDatePicker, { SingleDatePickerProps } from './SingleDatePicker';
import { FieldRenderProps } from 'react-final-form';
import moment from 'moment';

// const propTypes = {
//   children: PropTypes.any,
//   disabled: PropTypes.bool,
//   helperText: PropTypes.string,
//   input: PropTypes.shape({
//     value: PropTypes.any
//   }).isRequired,
//   meta: PropTypes.shape({
//     error: PropTypes.any,
//     invalid: PropTypes.bool,
//     touched: PropTypes.bool
//   }).isRequired,
//   render: PropTypes.any
// };

export type SingleDatePickerAdapterProps = FieldRenderProps<
  moment.Moment,
  any
> &
  SingleDatePickerProps;

function SingleDatePickerAdapter(props: SingleDatePickerAdapterProps) {
  const {
    children,
    helperText,
    input: { name, onBlur, onChange, onFocus, type, value, ...input },
    meta,
    render,
    ...rest
  } = props;
  // const normalizedValue = value === '' ? null : value;

  return (
    <SingleDatePicker
      {...input}
      {...rest}
      id={name}
      helperText={(meta.touched ? meta.error : '') || helperText}
      invalid={meta.touched && meta.invalid}
      onDateChange={onChange}
      onFocusChange={({ focused }) => {
        if (focused) {
          onFocus();
        } else {
          onBlur();
        }
      }}
      value={value ?? null}
    />
  );
}

export default SingleDatePickerAdapter;
