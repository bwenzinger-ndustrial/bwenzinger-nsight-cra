import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GraphDataToggle from './GraphDataToggle';

const propTypes = {
  cpDates: PropTypes.object
};

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
  position: absolute;
  margin: 0 auto;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);

  @media screen and (min-width: 560px) {
    flex-direction: row;
  }
`;

const RelativeContainer = styled.div`
  position: relative;
`;

function Header({ cpDates }) {
  return (
    <RelativeContainer>
      <PageHeadingContainer>
        <PageHeading>Coincident Peak</PageHeading>
      </PageHeadingContainer>
      <GraphDataToggle cpDates={cpDates} />
    </RelativeContainer>
  );
}

Header.propTypes = propTypes;

export default Header;
