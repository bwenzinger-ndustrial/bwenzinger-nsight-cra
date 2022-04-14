import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  copy: PropTypes.string,
  className: PropTypes.string
};

const RtpOverview = styled.div`
  align-items: stretch;
  background: #f3f6f9;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px 15px 15px;
  height: 233px;

  @media screen and (min-width: 897px) {
    padding: 11px 20px 20px;
    height: auto;
  }
`;

const RtpTitle = styled.h3`
  font-size: ${rem('10px')};
  font-weight: 500;
  line-height: ${rem('12px')};
  margin: 0;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.primary};
`;

const RtpText = styled.p`
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
  font-size: ${rem('12px')};
  line-height: ${rem('16px')};
  color: ${({ theme }) => theme.colors.text};
  flex-grow: 1;
  padding-left: 2px;
  padding-bottom: 10px;
`;

const RtpUpdated = styled.p`
  font-size: ${rem('10px')};
  line-height: ${rem('12px')};
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 300;
  font-style: italic;
  letter-spacing: -0.1px;
  margin: 0;
`;

const RtpDate = styled.span`
  font-size: ${rem('10px')};
  line-height: ${rem('12px')};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-style: normal;
  letter-spacing: 0.5px;
  margin-left: 10px;
`;

const RtpOverviewComponent = ({ copy, className }) => {
  return (
    <RtpOverview className={className}>
      <RtpTitle>Rate Narrative</RtpTitle>
      <RtpText>{copy}</RtpText>
      <RtpUpdated>
        Last Updated:
        <RtpDate>October 21, 2018 05:23 PM</RtpDate>
      </RtpUpdated>
    </RtpOverview>
  );
};

RtpOverviewComponent.propTypes = propTypes;

export { RtpOverviewComponent as RtpOverview };
