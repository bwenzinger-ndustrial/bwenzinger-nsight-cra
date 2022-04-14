import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

// TODO: Needs to be replaced when updated to v3.0.0
import { DocumentTextMissing } from '@ndustrial/nd-icons-svg';
import { QueryLink } from '@ndustrial/nsight-common/components';
import { whiten } from '@ndustrial/nsight-common/utils/colors';

const MissingContractFileIcon = styled(DocumentTextMissing)`
  font-size: ${rem('110px')};
  stroke: ${({ theme }) => whiten(theme.colors.primary, 0.5)};
`;

const Anchor = styled(QueryLink)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 400;
  display: inline-block;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${rem('14px')};
  font-weight: 300;
  text-align: center;
`;

const MissingContractFileContainer = styled.div`
  align-items: center;
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => whiten(theme.colors.primary, 0.9)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 600px;

  ${MissingContractFileIcon} {
    margin-bottom: 25px;
  }

  ${Text} {
    margin: 5px 0;
  }
`;

function MissingContractFileGraphic() {
  return (
    <MissingContractFileContainer>
      <MissingContractFileIcon />
      <Text>You currently have no utility contract uploaded, </Text>
      <Text>
        go to{' '}
        <Anchor to="/utility-contract-upload">Utility Contract Upload</Anchor>{' '}
        to get started.
      </Text>
    </MissingContractFileContainer>
  );
}

export default MissingContractFileGraphic;
