import React, { Fragment, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';
import {
  DetailCardDivider,
  TooltipIcon
} from '@ndustrial/nsight-common/components';
import Card, { Content, Title } from '@ndustrial/nsight-common/components/Card';
import { KPI_ICON_HASH } from '@ndustrial/nsight-common/kpi-config/constants';

import KPIBreakdownContainer from '../../containers/KPIBreakdownContainer';
import KPIDetailChartContainer from '../../containers/KPIDetailChartContainer';

const propTypes = {
  error: PropTypes.string,
  kpiConfig: PropTypes.shape({
    label: PropTypes.string.isRequired,
    monthly: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string
    }).isRequired,
    tooltip: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    compareBy: PropTypes.string
  }).isRequired,
  warning: PropTypes.string,
  comparisonDates: PropTypes.shape({
    from: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment)
    ]),
    to: PropTypes.instanceOf(moment)
  }).isRequired,
  primaryDates: PropTypes.shape({
    from: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.instanceOf(moment)
    ]),
    to: PropTypes.instanceOf(moment)
  }),
  facilityKpiValues: PropTypes.array
};

const KPI_ICONS = Object.keys(KPI_ICON_HASH).reduce((memo, key) => {
  memo[key] = styled(KPI_ICON_HASH[key])`
    height: 40px;
    width: 40px;
  `;

  return memo;
}, {});

// NOTE: This map/join looks a little funky -- it works via the `toString`
// method implemented on every styled-component
const StyledCard = styled(Card)`
  ${Object.keys(KPI_ICONS)
    .map((key) => KPI_ICONS[key])
    .join(',')} {
    @media screen and (min-width: 897px) and (orientation: landscape),
      screen and (min-width: 768px) and (orientation: portrait) {
      margin-left: 20px;
    }
  }
`;

const Tooltip = styled(UnstyledTooltip)`
  display: inline-flex;
`;

// this is to center the title text accounting for the tooltip icon
const StyledCardTitle = styled(Title)`
  ${Tooltip} {
    margin-left: 10px;
  }
`;

const CardContent = styled(Content)`
  flex-direction: column;
  overflow: hidden;
`;

const CardTop = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    flex-direction: row;
  }
`;

const CardBottom = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledChartContainer = styled(KPIDetailChartContainer)`
  height: 350px;
`;

// const StyledKpiSummary = styled(KpiSummary)`
//   flex-basis: 300px;
// `;

function DetailCard({
  error,
  kpiConfig,
  warning,
  comparisonDates,
  primaryDates,
  facilityKpiValues
}) {
  const [detailChart, setDetailChart] = useState([]);
  const Icon = KPI_ICONS[kpiConfig.icon];

  // const kpiWindow = useKpiWindow(kpiConfig);

  // const isLoadingFacilityValues = useMemo(() => {
  //   if (facilityKpiValues.length < 1) {
  //     return true;
  //   }

  //   return facilityKpiValues.some((facility) => {
  //     const { calculatedPrimaryData, calculatedComparisonData } = facility;
  //     return !calculatedPrimaryData || !calculatedComparisonData;
  //   });
  // }, [facilityKpiValues]);

  // const primaryValue = useMemo(() => {
  //   if (
  //     facilityKpiValues &&
  //     facilityKpiValues.length > 0 &&
  //     !isLoadingFacilityValues
  //   ) {
  //     if (kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.DATE) {
  //       return calculateKpiValue(
  //         facilityKpiValues
  //           .filter((facilityKpiValue) => !facilityKpiValue.hasMissingData)
  //           .map((facility) => {
  //             return {
  //               ...facility.calculatedPrimaryData.kpi.kpiFormulaParts
  //             };
  //           }),
  //         kpiConfig.monthly.formula,
  //         kpiConfig.compareBy
  //       );
  //     } else {
  //       return calculateKpiValue(
  //         facilityKpiValues
  //           .filter((facilityKpiValue) => !facilityKpiValue.hasMissingData)
  //           .map((facility) => facility.calculatedPrimaryData.kpi.kpiValue),
  //         kpiConfig.monthly.formula,
  //         kpiConfig.compareBy
  //       );
  //     }
  //   } else {
  //     return undefined;
  //   }
  // }, [facilityKpiValues, isLoadingFacilityValues, kpiConfig]); // eslint-disable-line react-hooks/exhaustive-deps

  // const comparisonValue = useMemo(() => {
  //   if (
  //     facilityKpiValues &&
  //     facilityKpiValues.length > 0 &&
  //     !isLoadingFacilityValues
  //   ) {
  //     if (kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.DATE) {
  //       return calculateKpiValue(
  //         facilityKpiValues
  //           .filter((facilityKpiValue) => !facilityKpiValue.hasMissingData)
  //           .map((facility) => {
  //             return {
  //               ...facility.calculatedComparisonData.kpi.kpiFormulaParts
  //             };
  //           }),
  //         kpiConfig.monthly.formula,
  //         kpiConfig.compareBy
  //       );
  //     } else {
  //       return calculateKpiValue(
  //         facilityKpiValues
  //           .filter((facilityKpiValue) => !facilityKpiValue.hasMissingData)
  //           .map((facility) => facility.calculatedComparisonData.kpi.kpiValue),
  //         kpiConfig.monthly.formula,
  //         kpiConfig.compareBy
  //       );
  //     }
  //   } else {
  //     return undefined;
  //   }
  // }, [facilityKpiValues, isLoadingFacilityValues, kpiConfig]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledCard
      error={error}
      isDraggable
      isFullHeight
      title={
        <StyledCardTitle>
          {kpiConfig.label}
          {kpiConfig.tooltip && (
            <Tooltip
              content={kpiConfig.tooltip}
              placement="right"
              tagName="span"
            >
              <TooltipIcon />
            </Tooltip>
          )}
        </StyledCardTitle>
      }
      renderLeft={() => <Icon />}
      warning={warning}
    >
      <CardContent>
        <CardTop>
          {/* <StyledKpiSummary
            kpiWindow={kpiWindow}
            kpi={kpiConfig}
            comparisonDates={comparisonDates}
            primaryDates={primaryDates}
            primaryValue={primaryValue}
            comparisonValue={comparisonValue}
          /> */}
          <StyledChartContainer
            kpiConfig={kpiConfig}
            detailChart={detailChart}
            setDetailChart={setDetailChart}
          />
        </CardTop>

        {!error ? (
          <Fragment>
            <DetailCardDivider warning={warning} />
            <CardBottom>
              <KPIBreakdownContainer kpiConfig={kpiConfig} />
            </CardBottom>
          </Fragment>
        ) : null}
      </CardContent>
    </StyledCard>
  );
}

DetailCard.propTypes = propTypes;

export default DetailCard;
