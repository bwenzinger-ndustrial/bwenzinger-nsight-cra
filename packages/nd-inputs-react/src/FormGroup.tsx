import styled from 'styled-components';

import FormControlLabel from './FormControlLabel';

interface Props {
  inline?: boolean;
}

const FormGroup = styled.div<Props>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ inline }) => (inline ? 'row' : 'column')};

  ${FormControlLabel} {
    margin: 10px;
    display: flex;
  }
`;

export default FormGroup;
