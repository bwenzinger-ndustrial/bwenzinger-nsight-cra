import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ChartPie as UnstyledChartPie } from '@ndustrial/nd-icons-svg';
import { Loader } from '@ndustrial/nd-loader-react';
import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';
import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';

import { blacken } from '../../utils/colors';
import TooltipIcon from '../TooltipIcon';
import KPIEmptyChange from './KPIEmptyChange';
import KPIValue from './KPIValue';

const propTypes = {
  kpiWindow: PropTypes.string.isRequired,
  changeDate: PropTypes.shape({
    current: PropTypes.string.isRequired,
    previous: PropTypes.string.isRequired
  }),
  changeDirection: PropTypes.oneOf([
    'positive',
    'negative',
    'neutral',
    'blank'
  ]),
  className: PropTypes.string,
  kpiConfig: PropTypes.shape({
    compareBy: PropTypes.string.isRequired,
    changeLanguage: PropTypes.object.isRequired,
    detail: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    interval: PropTypes.number.isRequired,
    cardDisplayLabel: PropTypes.string,
    label: PropTypes.string.isRequired,
    monthly: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    daily: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    tooltip: PropTypes.string,
    unitPosition: PropTypes.string,
    unit: PropTypes.string,
    isNegativeIndicator: PropTypes.bool
  }).isRequired,
  comparisonValue: PropTypes.any,
  isEstimated: PropTypes.bool,
  isLoading: PropTypes.bool,
  KPIIcon: PropTypes.elementType,
  kpiCardData: PropTypes.object,
  onKpiClick: PropTypes.func.isRequired,
  percentChange: PropTypes.number,
  value: PropTypes.number
};

const getKpiQualifier = (isNegativeIndicator) => (changeDirection) => {
  switch (changeDirection) {
    case 'positive':
      return isNegativeIndicator ? 'failure' : 'success';
    case 'negative':
      return isNegativeIndicator ? 'success' : 'failure';
    default:
      return changeDirection;
  }
};

const getVersusText = (kpiConfig, changeDate) => {
  if (kpiConfig && kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC) {
    return kpiConfig.detail.breakdown[1].name;
  } else {
    return changeDate && changeDate.previous;
  }
};

const getEfficiencyText = (kpiQualifier, kpiConfig) => {
  switch (kpiQualifier) {
    case 'success':
      return kpiConfig.changeLanguage.positive;
    case 'failure':
      return kpiConfig.changeLanguage.negative;
    default:
      return '---';
  }
};

const ChartPie = styled(UnstyledChartPie)`
  position: absolute;
  stroke: #fff;
`;

const ContainerDiv = styled.div`
  background-color: #fff;
  border: 1px solid
    ${(props) => {
      switch (props.status) {
        case 'success':
          return props.theme.colors.success;
        case 'failure':
          return props.theme.colors.failure;
        default:
          return '#d8d8d8';
      }
    }};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 0 6px
      ${(props) => {
        switch (props.status) {
          case 'success':
            return blacken(props.theme.colors.success, 0.2);
          case 'failure':
            return blacken(props.theme.colors.failure, 0.2);
          default:
            return blacken('#d8d8d8', 0.2);
        }
      }};
  }

  @media screen and (min-width: 1440px) {
    padding-left: 12px;
  }

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    flex-direction: row;
    height: 80px;
  }
`;

const InfoContainer = styled.div`
  padding: 10px;
  position: relative;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    align-items: center;
    display: flex;
    padding: 0 10px;
  }
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('10px')};
  font-weight: 700;
  letter-spacing: ${rem('0.36px')};
  line-height: 1rem;
  text-transform: uppercase;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    font-size: ${rem('12px')};
    letter-spacing: ${rem('.44px')};
  }
`;

const Tooltip = styled(UnstyledTooltip)`
  position: absolute;
  right: 10px;
  top: 10px;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    position: static;
    right: 0;
    top: 0;
  }
`;

const KPILabelContainer = styled.div`
  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    align-items: center;
    display: flex;

    ${Tooltip} {
      margin-left: 8px;
    }
  }
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
  }
`;

const StyledTooltipIcon = styled(TooltipIcon)`
  background: #606060;
  border: 1px solid #606060;
  border-radius: 50%;
  stroke: #606060;
  opacity: 0.8;
  padding: 1px;
`;

const ChangeContainer = styled.div`
  align-items: center;
  background: ${(props) => {
    switch (props.status) {
      case 'success':
        return props.theme.colors.success;
      case 'failure':
        return props.theme.colors.failure;
      case 'neutral':
        return props.theme.colors.gray;
      default:
        return 'repeating-linear-gradient(45deg,#efefef,#efefef 2px, #f5f5f5 2px,#f5f5f5 12px)';
    }
  }};
  border-top: ${(props) =>
    props.status === 'blank' ? '1px solid #d8d8d8' : 'none'};
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 75px;
  justify-content: center;
  position: relative;
  width: 100%;

  ${ChartPie} {
    top: 5px;
    right: 10px;
  }

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    border-left: ${(props) =>
      props.status === 'blank' ? '1px solid #d8d8d8' : 'none'};
    border-top: initial;
    height: 100%;
    justify-content: center;
    margin-left: auto;
    width: 120px;
  }
`;

const PrimaryValue = styled.div`
  font-size: ${rem('10px')};
  font-weight: 500;
  letter-spacing: ${rem('0.74px')};
  text-align: center;
`;

const PrimaryDate = styled.div`
  font-size: ${rem('10px')};
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: ${rem('0.74px')};
  margin-bottom: 4px;
  margin-top: 4px;
  text-align: center;
`;

const ComparisonValue = styled.div`
  font-size: ${rem('11px')};
  font-weight: 500;
  letter-spacing: ${rem('0.74px')};
  text-align: center;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const EfficiencyChange = styled.div`
  font-size: ${rem('19px')};
  font-weight: 700;
  letter-spacing: ${rem('0.74px')};
`;

const EfficiencyDirection = styled.div`
  font-size: ${rem('11px')};
  font-weight: 400;
  letter-spacing: ${rem('0.74px')};
  margin-top: 4px;
`;

function KPICard(props) {
  const {
    kpiWindow,
    changeDate,
    changeDirection,
    className,
    comparisonValue,
    isEstimated,
    isLoading,
    KPIIcon,
    kpiConfig,
    onKpiClick,
    percentChange,
    value
  } = props;

  const kpiQualifier = getKpiQualifier(kpiConfig.isNegativeIndicator)(
    changeDirection
  );
  const efficiencyText = getEfficiencyText(kpiQualifier, kpiConfig);
  const versusText = getVersusText(kpiConfig, changeDate);

  function renderChangeContent() {
    if (isLoading) {
      return <Loader />;
    } else if (!kpiQualifier || kpiQualifier === 'blank') {
      return <KPIEmptyChange />;
    } else {
      return (
        <>
          {isEstimated ? <ChartPie /> : null}
          <PrimaryValue>vs. {versusText}</PrimaryValue>
          <ComparisonValue>
            {comparisonValue ? comparisonValue.toLocaleString('en-US') : '--'}
          </ComparisonValue>
          {/*
          TODO: Math.abs is a stop gap.  Once we switch to the more/less
          TODO: efficient phrasing, we will not need negative/positive values,
          TODO: just the words more or less
        */}
          <EfficiencyChange>{Math.abs(percentChange)}%</EfficiencyChange>
          <EfficiencyDirection>{efficiencyText}</EfficiencyDirection>
        </>
      );
    }
  }

  return (
    <ContainerDiv
      className={className}
      status={kpiQualifier}
      onClick={onKpiClick}
    >
      <InfoContainer>
        <CenterContainer>
          <PrimaryDate>{changeDate && changeDate.current}</PrimaryDate>
          <KPILabelContainer>
            <Label>{kpiConfig.cardDisplayLabel || kpiConfig.label}</Label>
            {kpiConfig.tooltip ? (
              <Tooltip content={kpiConfig.tooltip} placement="left">
                <StyledTooltipIcon />
              </Tooltip>
            ) : (
              <StyledTooltipIcon />
            )}
          </KPILabelContainer>
          <KPIValue
            isLoading={isLoading}
            kpiKey={kpiConfig[kpiWindow].key}
            KPIIcon={KPIIcon}
            unit={kpiConfig.unit}
            value={value}
            unitPosition={kpiConfig.unitPosition}
          />
        </CenterContainer>
      </InfoContainer>

      <ChangeContainer status={kpiQualifier}>
        {renderChangeContent()}
      </ChangeContainer>
    </ContainerDiv>
  );
}

KPICard.propTypes = propTypes;

export default KPICard;
