import React from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FlashMessageGroup as UnstyledFlashMessageGroup } from '@ndustrial/nd-flash-message-react';
import {
  FullScreenLoadingIndicator,
  MissingSelection
} from '@ndustrial/nsight-common/components';

import { Header, HeaderText } from '../common/Header';
import { HeatmapScale } from '../common/HeatmapScale';
import ExpiredContractFlash from './ExpiredContractFlash';
import NoContractFlash from './NoContractFlash';
import UnstyledNoSchedule from './NoSchedule';
import {
  ScheduleContainer as UnstyledScheduleContainer,
  ScheduleList
} from './ScheduleList';

const propTypes = {
  hasLoadedSchedules: PropTypes.bool,
  hasSelectedFacilitySlug: PropTypes.bool,
  schedules: PropTypes.array,
  selectedFacility: PropTypes.object
};

const ContractFlashGroup = styled(UnstyledFlashMessageGroup)``;
const NoSchedule = styled(UnstyledNoSchedule)``;

const ScheduleContainer = styled(UnstyledScheduleContainer)`
  padding: 10px;

  ${ContractFlashGroup} {
    margin-bottom: 10px;
  }

  ${NoSchedule} {
    margin-top: 6px;
  }
`;

function Schedules(props) {
  const {
    hasLoadedSchedules,
    hasSelectedFacilitySlug,
    schedules,
    selectedFacility
  } = props;

  const hasExpiredContract = schedules.some((schedule) => {
    return !!(schedule.contract && moment().isAfter(schedule.contract.endDate));
  });

  const hasNoContract = schedules.some((schedule) => {
    return !schedule.isRtpRate && !(schedule && schedule.contract);
  });

  function renderScheduleOverview() {
    if (!hasLoadedSchedules && hasSelectedFacilitySlug) {
      return (
        <FullScreenLoadingIndicator loadingText="Loading Rate Tariff Schedules" />
      );
    } else {
      return (
        <ScheduleContainer>
          <Helmet>
            {/* Using extra interpolation to avoid this bug:
              https://github.com/nfl/react-helmet/issues/408 */}
            <title>{`${selectedFacility.name} - Rate Tariffs`}</title>
          </Helmet>

          {(hasExpiredContract || hasNoContract) && (
            <ContractFlashGroup>
              {hasExpiredContract && <ExpiredContractFlash />}
              {hasNoContract && <NoContractFlash />}
            </ContractFlashGroup>
          )}

          {schedules.length > 0 ? (
            <ScheduleList facility={selectedFacility} schedules={schedules} />
          ) : (
            <NoSchedule />
          )}
        </ScheduleContainer>
      );
    }
  }

  return (
    <>
      <Header>
        <HeaderText>Rate Tariff Schedules</HeaderText>
      </Header>

      <HeatmapScale />

      {hasSelectedFacilitySlug ? (
        renderScheduleOverview()
      ) : (
        <MissingSelection requiredType="facility" />
      )}
    </>
  );
}

Schedules.propTypes = propTypes;

export default Schedules;
