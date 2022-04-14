import React from 'react';
import { Field as ReactFinalFormField } from 'react-final-form';

function Field(props) {
  return <ReactFinalFormField parse={(value) => value} {...props} />;
}

export default Field;
