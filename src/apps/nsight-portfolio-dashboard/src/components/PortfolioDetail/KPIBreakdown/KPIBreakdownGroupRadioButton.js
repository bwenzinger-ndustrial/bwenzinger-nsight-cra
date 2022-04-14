import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { RadioButton } from '@ndustrial/nd-inputs-react';

import {
  InlineRadio,
  RadioButtonRow,
  RadioButtonRowLabel,
  RadioFormControlLabel
} from './KPIBreakdownStyledComponents';

const VALUES = {
  FACILITY: 'Facility',
  GROUPING: 'Facility Grouping'
};

const propTypes = {
  isGrouped: PropTypes.bool.isRequired,
  setIsGrouped: PropTypes.func.isRequired
};

const Wrapper = styled(RadioButtonRow)`
  margin-bottom: 0.5rem;
`;

/* stylelint-disable */
const RowLabel = styled(RadioButtonRowLabel)`
  margin-right: 7px !important;
  color: ${({ theme }) => theme.colors.text};
`;
/* stylelint-enable */

const Label = styled(RadioFormControlLabel)`
  color: ${({ theme }) => theme.colors.text};

  span {
    font-size: 0.8rem;
  }
`;

const KpiBreakdownGroupRadioButton = ({ isGrouped, setIsGrouped }) => {
  // const [value, setValue] = useState(isGrouped ? VALUES.FACILITY : VALUES.GROUPING)

  const setRadioValue = useCallback(
    (e) => {
      if (e.currentTarget.value === VALUES.FACILITY) {
        setIsGrouped(false);
      } else {
        setIsGrouped(true);
      }
    },
    [setIsGrouped]
  );

  return (
    <Wrapper>
      <RowLabel>I want to view data by: </RowLabel>
      <InlineRadio
        id="tableType"
        inline
        onChange={setRadioValue}
        value={isGrouped ? VALUES.GROUPING : VALUES.FACILITY}
      >
        <Label
          control={(props) => <RadioButton {...props} />}
          value={VALUES.FACILITY}
          label={VALUES.FACILITY}
        />
        <Label
          control={(props) => <RadioButton {...props} />}
          value={VALUES.GROUPING}
          label={VALUES.GROUPING}
        />
      </InlineRadio>
    </Wrapper>
  );
};

KpiBreakdownGroupRadioButton.propTypes = propTypes;

export default KpiBreakdownGroupRadioButton;
