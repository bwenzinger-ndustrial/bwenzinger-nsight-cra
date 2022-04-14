import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CheckCircle, WarningTriangle } from '@ndustrial/nd-icons-svg';

const propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  isExpired: PropTypes.bool
};

const StatusColor = ({ isExpired, theme }) => {
  return isExpired ? theme.colors.failure : theme.colors.primary;
};

const AlarmIcon = styled(WarningTriangle)`
  stroke: ${({ theme }) => theme.colors.failure};
  height: 13px;
  width: 13px;
`;

const CheckCircleIcon = styled(CheckCircle)`
  stroke: ${({ theme }) => theme.colors.primary};
  height: 13px;
  width: 13px;
`;

const ScheduleActiveStatus = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const ScheduleStatus = styled.p`
  color: ${StatusColor};
  margin: 0;
  align-items: center;
  display: flex;
  font-size: ${rem('10px')};
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 1.2;

  ${AlarmIcon},
  ${CheckCircleIcon} {
    margin-right: 6px;
  }
`;

const StatusText = ({ isActive, isExpired, className }) => {
  if (!isActive) {
    return null;
  }

  if (isExpired) {
    return (
      <ScheduleStatus isExpired={isExpired} className={className}>
        <AlarmIcon />
        <ScheduleActiveStatus>Active Schedule</ScheduleActiveStatus>&nbsp;w/
        Expired Contract
      </ScheduleStatus>
    );
  }

  return (
    <ScheduleStatus className={className}>
      <CheckCircleIcon />
      <ScheduleActiveStatus>Active Schedule</ScheduleActiveStatus>
    </ScheduleStatus>
  );
};

StatusText.propTypes = propTypes;

export default StatusText;
