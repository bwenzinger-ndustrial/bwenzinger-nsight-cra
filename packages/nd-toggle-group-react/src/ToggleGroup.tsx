import styled from 'styled-components';

import ToggleOption from './ToggleOption';

const ToggleGroup = styled.div`
  ${ToggleOption}:not(:first-child) {
    border-left: 0;
  }

  ${ToggleOption}:first-child {
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }

  ${ToggleOption}:last-child {
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }
`;

export default ToggleGroup;
