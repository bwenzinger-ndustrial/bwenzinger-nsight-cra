import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  FormControlLabel,
  RadioButton,
  RadioGroup
} from '@ndustrial/nd-inputs-react';

const BALANCING_AUTHORITIES = ['CPLW', 'CPLE', 'DEP'];

const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  margin: 8px 0 8px 24px;
`;

const RadioFormControlLabel = styled(FormControlLabel)`
  span {
    font-size: ${rem('12px')};
    font-weight: 700;
  }
`;

const SelectedText = styled.span`
  font-size: ${rem('12px')};
  margin: 10px;
`;

const InlineRadio = styled(RadioGroup)`
  z-index: 20;
`;

const propTypes = {
  setBalancingAuthority: PropTypes.func.isRequired,
  selectedBalancingAuthority: PropTypes.string.isRequired
};

export function BalancingAuthoritySelector({
  setBalancingAuthority,
  selectedBalancingAuthority
}) {
  return (
    <RadioButtonContainer>
      <SelectedText>Balancing Authority: </SelectedText>
      <InlineRadio
        id="balancingAuthority"
        inline
        onChange={(e) => {
          setBalancingAuthority(e.currentTarget.value);
        }}
        value={selectedBalancingAuthority}
      >
        {BALANCING_AUTHORITIES.map((authority) => {
          return (
            <RadioFormControlLabel
              control={(props) => <RadioButton {...props} />}
              key={authority}
              value={authority}
              label={authority}
            />
          );
        })}
      </InlineRadio>
    </RadioButtonContainer>
  );
}

BalancingAuthoritySelector.propTypes = propTypes;

export default BalancingAuthoritySelector;
