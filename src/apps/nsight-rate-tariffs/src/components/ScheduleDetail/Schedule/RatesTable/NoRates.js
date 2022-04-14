import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  padding: 12px;
  text-align: center;
`;

function NoRates() {
  return <Content>No rates available</Content>;
}

export default NoRates;
