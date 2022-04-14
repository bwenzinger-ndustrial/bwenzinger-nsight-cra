import React, { Fragment } from 'react';
import { unescape } from 'he';
import { isNaN, isNumber } from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { WarningTriangle } from '@ndustrial/nd-icons-svg';
import { KPI_UNIT_DISPLAY_HASH } from '@ndustrial/nsight-common/kpi-config/constants';

const propTypes = {
  isLoading: PropTypes.bool,
  KPIIcon: PropTypes.elementType,
  kpiKey: PropTypes.string,
  unit: PropTypes.string,
  value: PropTypes.number,
  unitPosition: PropTypes.string
};

const Container = styled.div`
  align-items: center;
  font-size: ${rem('28px')};
  display: inline-flex;
  font-weight: 300;
  letter-spacing: ${rem('1.17px')};
`;

const LoadingText = styled.div`
  font-size: ${rem('10px')};
  line-height: ${rem('32px')};
  letter-spacing: ${rem('0.5px')};
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #979797;
  text-transform: uppercase;
`;

const Value = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('26px')};
  font-weight: 300;
  letter-spacing: ${rem('1.17px')};
  margin-right: 12px;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    font-size: ${rem('28px')};
    letter-spacing: ${rem('1.25px')};
  }
`;

const Unit = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('12px')};
  font-weight: 300;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    font-size: ${rem('14px')};
  }
`;

const Icon = styled.div`
  padding-right: 12px;

  svg {
    height: ${rem(25)};
    stroke: ${({ theme }) => theme.colors.primary};
    width: ${rem(25)};
    margin-top: 4px;
  }
`;

const WarningTriangleIcon = styled(WarningTriangle)`
  stroke: ${({ theme }) => theme.colors.failure};
  height: 0.5em;
  margin-left: 8px;
  width: 0.5em;
`;

function KPIValue({
  isLoading,
  KPIIcon,
  kpiKey,
  unit,
  value,
  unitPosition = 'postfix'
}) {
  if (isLoading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  const displayUnit = KPI_UNIT_DISPLAY_HASH[kpiKey]
    ? unescape(KPI_UNIT_DISPLAY_HASH[kpiKey])
    : unit;

  return (
    <Container>
      {isNumber(value) && !isNaN(value) ? (
        <Fragment>
          <Icon>{KPIIcon ? <KPIIcon /> : <svg />}</Icon>
          {unitPosition === 'prefix' && <Unit>{displayUnit}</Unit>}
          <Value>{value.toLocaleString('en-US')}</Value>
          {unitPosition === 'postfix' && <Unit>{displayUnit}</Unit>}
        </Fragment>
      ) : (
        <Fragment>
          <Icon>{KPIIcon ? <KPIIcon /> : <svg />}</Icon>
          {unitPosition === 'prefix' && <Unit>{displayUnit}</Unit>}
          <Value>---</Value>
          {unitPosition === 'postfix' && <Unit>{displayUnit}</Unit>}
          <WarningTriangleIcon />
        </Fragment>
      )}
    </Container>
  );
}

KPIValue.propTypes = propTypes;

export default KPIValue;
