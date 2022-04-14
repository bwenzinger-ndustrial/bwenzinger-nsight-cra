import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Information } from '@ndustrial/nd-icons-svg';

const propTypes = {
  className: PropTypes.string,
  requiredType: PropTypes.string.isRequired
};

const Icon = styled(Information)`
  stroke: ${({ theme }) => theme.colors.primary};
  height: 16px;
  width: 16px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${rem('15px')};
  font-weight: 500;
  margin: 0;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 15px;
  max-width: 75%;

  @media screen and (min-width: 425px) {
    max-width: none;
  }

  ${Icon} {
    margin-right: 10px;
  }
`;

function Instructions({ className, requiredType }) {
  const selectionText = {
    facility: 'a facility',
    organization: 'an organization'
  }[requiredType];

  return (
    <Container className={className}>
      <Icon />
      <Text>Select {selectionText} from the dropdown above to begin</Text>
    </Container>
  );
}

Instructions.propTypes = propTypes;

export default Instructions;
