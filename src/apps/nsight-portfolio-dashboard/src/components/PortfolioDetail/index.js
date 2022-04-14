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

import DetailHeaderContainer from '../../containers/DetailHeaderContainer';
import DetailCard from './DetailCard';

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
  facilityKpiValues: PropTypes.array,
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

function PortfolioDetail(props) {
  const {
    facilityKpiValues,
    comparisonDates,
    kpiConfig,
    primaryDates,
    resetComparisonDetailData,
    resetPrimaryDetailData,
    setComparisonDates,
    setPrimaryDates
  } = props;
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

  const useSingleDatePicker =
    kpiConfig && kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC;

  const hasSomeDates = () =>
    (primaryDates.to && primaryDates.from) ||
    (comparisonDates.to && comparisonDates.from);

  return (
    <ContainerDiv>
      <DetailHeaderContainer />
      <StyledMobileKPIMenu
        handleMenuChange={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
        isOptionsMenuOpen={isOptionsMenuOpen}
      >
        <DetailComparisonOptions
          comparisonDates={comparisonDates}
          pickerRange={datePickerConstants.calendarTypes.MONTH}
          primaryDates={primaryDates}
          resetComparisonDetailData={resetComparisonDetailData}
          resetPrimaryDetailData={resetPrimaryDetailData}
          setComparisonDates={setComparisonDates}
          setPrimaryDates={setPrimaryDates}
          isDayCalendarType={false}
          useSingleDatePicker={useSingleDatePicker}
        />
      </StyledMobileKPIMenu>

      <DetailsContainerDiv>
        {kpiConfig && hasSomeDates() ? (
          <DetailCard
            facilityKpiValues={facilityKpiValues}
            primaryDates={primaryDates}
            comparisonDates={comparisonDates}
            endDate={primaryDates.to && primaryDates.to.toDate()}
            kpiConfig={kpiConfig}
            startDate={comparisonDates.from && comparisonDates.from.toDate()}
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
}

PortfolioDetail.propTypes = propTypes;

export default PortfolioDetail;
