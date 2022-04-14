import React from 'react';
import styled from 'styled-components';

import { QueryLink } from '@ndustrial/nsight-common/components';

const Instructions = styled.div``;

const StyledLink = styled(QueryLink)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: none;
`;

function ContractInstructions() {
  return (
    <Instructions>
      Select a Contract from the list or{' '}
      <StyledLink to={`/utility-contract-upload/contract/new`}>
        create a new one.
      </StyledLink>
    </Instructions>
  );
}

export default ContractInstructions;
