import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UnstyledPagination from './Pagination';

const propTypes = {
  availableDates: PropTypes.array,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  visibleDate: PropTypes.string
};

const HeaderText = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.5px;
  margin: 0;
  text-align: center;
`;

const Pagination = styled(UnstyledPagination)``;

const HeaderContainer = styled.div`
  position: relative;

  ${HeaderText} {
    width: 100%;
  }

  ${Pagination} {
    bottom: 0;
    position: absolute;
    top: 0;
  }
`;

function Header({ availableDates, className, title, visibleDate }) {
  return (
    <HeaderContainer className={className}>
      <HeaderText>{title}</HeaderText>
      <Pagination availableDates={availableDates} visibleDate={visibleDate} />
    </HeaderContainer>
  );
}

Header.propTypes = propTypes;

export default Header;
