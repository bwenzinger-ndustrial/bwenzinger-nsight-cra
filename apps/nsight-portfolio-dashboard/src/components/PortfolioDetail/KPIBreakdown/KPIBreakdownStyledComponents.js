import { rem } from 'polished';
import styled from 'styled-components';

import { FormControlLabel, RadioGroup } from '@ndustrial/nd-inputs-react';

const RadioButtonRow = styled.div`
  display: flex;
`;

const RadioButtonRowLabel = styled.div`
  display: flex;
  align-items: center;
`;

const RadioFormControlLabel = styled(FormControlLabel)`
  span {
    font-size: ${rem('12px')};
    font-weight: 700;
  }
`;

const InlineRadio = styled(RadioGroup)`
  z-index: 20;
`;

export {
  InlineRadio,
  RadioButtonRow,
  RadioButtonRowLabel,
  RadioFormControlLabel
};
