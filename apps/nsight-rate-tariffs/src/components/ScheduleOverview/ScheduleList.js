import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ScheduleBox as ScheduleBoxComponent } from './ScheduleBox';

const propTypes = {
  className: PropTypes.string,
  facility: PropTypes.shape({
    organization: PropTypes.shape({
      name: PropTypes.string
    }).isRequired
  }).isRequired,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      contract: PropTypes.shape({
        rateNarrative: PropTypes.string,
        endDate: PropTypes.string.isRequired
      }),
      effectiveEndDate: PropTypes.string,
      effectiveStartDate: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

const ScheduleContainer = styled.div`
  align-items: center;
  background: #eaeaea;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 10px 0;

  @media screen and (min-width: 897px) {
    padding: 10px;
  }
`;

const ScheduleBox = styled(ScheduleBoxComponent)`
  margin-top: 10px;
  width: 100%;

  &:first-of-type {
    margin-top: 0;
  }

  @media screen and (min-width: 900px) {
    width: calc(50% - 5px);

    &:nth-of-type(-n + 2) {
      margin-top: 0;
    }

    &:nth-of-type(2n + 1) {
      margin-right: 10px;
    }
  }
`;

const ScheduleList = styled.div`
  align-content: flex-start;
  background: #eaeaea;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  max-width: 1400px;
  width: 100%;
`;

const ScheduleListComponent = ({ className, facility, schedules }) => {
  return (
    <ScheduleList className={className}>
      {schedules.map((schedule) => {
        const contractEndDate =
          schedule.contract &&
          schedule.contract.endDate &&
          new Date(schedule.contract.endDate);
        const effectiveEndDate =
          schedule.effectiveEndDate && new Date(schedule.effectiveEndDate);
        const effectiveStartDate =
          schedule.effectiveStartDate && new Date(schedule.effectiveStartDate);
        const now = new Date();
        const isActive =
          effectiveStartDate &&
          now > effectiveStartDate &&
          (!effectiveEndDate || effectiveEndDate > now);
        const isExpired = schedule.contract && now > contractEndDate;

        return (
          <ScheduleBox
            isActive={isActive}
            isExpired={isExpired}
            key={schedule.id}
            organizationName={facility.organization.name}
            rateNarrative={schedule.contract && schedule.contract.rateNarrative}
            schedule={schedule}
          />
        );
      })}
    </ScheduleList>
  );
};

ScheduleListComponent.propTypes = propTypes;

export { ScheduleContainer, ScheduleListComponent as ScheduleList };
