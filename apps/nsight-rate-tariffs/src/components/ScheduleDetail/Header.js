import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ArrowLeft } from '@ndustrial/nd-icons-svg';
import { QueryLink } from '@ndustrial/nsight-common/components';

import { Header, HeaderText } from '../common/Header';

const propTypes = {
  className: PropTypes.string,
  isPublished: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired
};

const UnpublishedText = styled.span`
  font-style: italic;
`;

const FlexHeader = styled(Header)`
  display: flex;

  ${UnpublishedText} {
    margin-left: 4px;
  }
`;

const Arrow = styled(ArrowLeft)`
  cursor: pointer;
  stroke: #fff;
  height: 22px;
  width: 22px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  padding: 5px;
`;

const StyledLink = styled(QueryLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${Arrow} {
    margin-right: 15px;
  }
`;

function ScheduleDetailHeader({ className, isPublished, label }) {
  return (
    <FlexHeader className={className}>
      <StyledLink to="/rate-tariffs">
        <Arrow />
      </StyledLink>
      <HeaderText>
        {label}
        {!isPublished && <UnpublishedText>(Unpublished)</UnpublishedText>}
      </HeaderText>
    </FlexHeader>
  );
}

ScheduleDetailHeader.propTypes = propTypes;

export default ScheduleDetailHeader;
