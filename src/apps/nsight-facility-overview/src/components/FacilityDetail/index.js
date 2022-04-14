import React, { useState } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { datePickerConstants } from '@ndustrial/nd-date-picker-react';
import {
  DetailComparisonOptions,
  MobileKPIMenu
} from '@ndustrial/nsight-common/components';
import { NoSelectedKpi } from '@ndustrial/nsight-common/containers';
import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';

import { DetailCardContainer, DetailHeaderContainer } from '../../containers';

const ContainerDiv = styled.div`
  background-color: #e3e3e3;
`;

const DetailsContainerDiv = styled.div`
  padding-bottom: 10px;
  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    padding: 10px;
  }
`;

const StyledMobileKPIMenu = styled(MobileKPIMenu)`
  display: flex;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: none;
  }
`;

const propTypes = {
  isRealTimeEnabled: PropTypes.bool.isRequired,
  comparisonDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }).isRequired,
  primaryDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }).isRequired,
  resetComparisonDetailData: PropTypes.func,
  resetPrimaryDetailData: PropTypes.func,
  setComparisonDates: PropTypes.func.isRequired,
  setPrimaryDates: PropTypes.func.isRequired,
  kpiConfig: PropTypes.object
};

const FacilityDetail = ({
  isRealTimeEnabled,
  comparisonDates,
  primaryDates,
  resetComparisonDetailData,
  resetPrimaryDetailData,
  setComparisonDates,
  setPrimaryDates,
  kpiConfig
}) => {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

  // TODO, let's pay attention to this as we further define compareBy combinations
  //  with other metric flags, this will not make sense to do later
  const pickerRange =
    !isRealTimeEnabled ||
    (kpiConfig && kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC)
      ? datePickerConstants.calendarTypes.MONTH
      : datePickerConstants.calendarTypes.DAY;

  const useSingleDatePicker =
    kpiConfig && kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC;

  return (
    <ContainerDiv>
      <DetailHeaderContainer />
      <StyledMobileKPIMenu
        handleMenuChange={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
        isOptionsMenuOpen={isOptionsMenuOpen}
      >
        <DetailComparisonOptions
          comparisonDates={comparisonDates}
          pickerRange={pickerRange}
          primaryDates={primaryDates}
          resetComparisonDetailData={resetComparisonDetailData}
          resetPrimaryDetailData={resetPrimaryDetailData}
          setComparisonDates={setComparisonDates}
          setPrimaryDates={setPrimaryDates}
          useSingleDatePicker={useSingleDatePicker}
        />
      </StyledMobileKPIMenu>
      <DetailsContainerDiv>
        {kpiConfig ? (
          <DetailCardContainer
            endDate={primaryDates.to && primaryDates.to.toDate()}
            startDate={primaryDates.from && primaryDates.from.toDate()}
            kpiConfig={kpiConfig}
          />
        ) : (
          <NoSelectedKpi
            comparisonDates={comparisonDates}
            primaryDates={primaryDates}
          />
        )}
      </DetailsContainerDiv>
    </ContainerDiv>
  );
};

FacilityDetail.propTypes = propTypes;

export default FacilityDetail;
