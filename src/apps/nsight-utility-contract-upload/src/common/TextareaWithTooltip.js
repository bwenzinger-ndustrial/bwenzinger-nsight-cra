import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { InputTextField } from '@ndustrial/nd-inputs-react';

import { colors } from './constants.js';

const propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired
  }).isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  Tooltip: PropTypes.node
};

const LabelText = styled.span`
  font-size: 0.833rem;
  color: ${colors.grayVeryDark};
  margin-right: 10px;
`;

const StyledTextField = styled(InputTextField)`
  textarea {
    min-height: 140px;
  }
`;

function TextareaWithTooltip(props) {
  const { input, label, Tooltip, required, ...rest } = props;

  return (
    <label>
      {label && (
        <LabelText>
          {label}
          {required && <span>&nbsp;*</span>}
        </LabelText>
      )}
      {Tooltip}

      <StyledTextField
        {...input}
        multiline
        required
        onChange={(event) => input.onChange(event.target.value)}
        {...rest}
      />
    </label>
  );
}

TextareaWithTooltip.propTypes = propTypes;

export default TextareaWithTooltip;
