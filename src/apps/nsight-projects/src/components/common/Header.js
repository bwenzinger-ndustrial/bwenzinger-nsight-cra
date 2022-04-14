import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';

const PageHeading = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('20px')};
  font-weight: 300;
  margin: 0;

  @media screen and (min-width: 600px) {
    font-size: ${rem('24px')};
  }
`;

const PageHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  left: 15px;
  padding: 16px 10px;
  @media screen and (min-width: 560px) {
    flex-direction: row;
  }
`;

const RelativeContainer = styled.div`
  position: relative;
`;

function Header() {
  return (
    <RelativeContainer>
      <PageHeadingContainer>
        <PageHeading>Projects</PageHeading>
      </PageHeadingContainer>
    </RelativeContainer>
  );
}

export default Header;
