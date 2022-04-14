import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('14px')};
  font-weight: 300;
  text-align: center;
  margin: 5px;
`;

const Anchor = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 400;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

function Instructions() {
  return (
    <Container>
      <Text>Your facility does not currently have a Rate Tariff Schedule.</Text>
      <Text>
        For any help or questions please contact{' '}
        <Anchor href="mailto:support@ndustrial.io">support@ndustrial.io</Anchor>
      </Text>
    </Container>
  );
}

export default Instructions;
