import React from 'react';
import { isEmpty, isNumber, round } from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

const Container = styled.div`
  position: relative;

  img {
    max-height: 60px;

    @media screen and (min-width: 560px) {
      max-height: 75px;
    }
  }
`;

const Title = styled.div`
  margin-top: 8px;
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${rem('14px')};

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    font-size: ${rem('18px')};
  }
`;

const Value = styled.div`
  margin-top: 8px;
  color: ${(props) => {
    if (props.value > 0) {
      return props.theme.colors.success;
    } else if (props.value < 0) {
      return props.theme.colors.failure;
    } else {
      return '#5F5F5F';
    }
  }};
  font-size: ${rem('20px')};
  letter-spacing: 1.2px;
`;

const propTypes = {
  className: PropTypes.string,
  config: PropTypes.object.isRequired,
  co2MetricKey: PropTypes.string.isRequired,
  comparisonEmissions: PropTypes.object.isRequired,
  primaryEmissions: PropTypes.object.isRequired,
  theme: PropTypes.object
};

const Equivalency = withTheme(function({
  className,
  comparisonEmissions,
  primaryEmissions,
  config,
  co2MetricKey,
  theme
}) {
  let value = '---';
  let primaryValue = 0;
  let comparisonValue = 0;

  const icon = config.icon;

  if (
    !isEmpty(primaryEmissions.data) &&
    !isEmpty(
      comparisonEmissions.data &&
        primaryEmissions.data[co2MetricKey] &&
        comparisonEmissions.data[co2MetricKey]
    )
  ) {
    primaryValue = primaryEmissions.data[co2MetricKey].reduce(function(
      acc,
      val
    ) {
      return acc + val.value;
    },
    0);
    comparisonValue = comparisonEmissions.data[co2MetricKey].reduce(function(
      acc,
      val
    ) {
      return acc + val.value;
    },
    0);
    value = (primaryValue - comparisonValue) / config.divisor;
  }

  return (
    <Container className={className}>
      <div>
        <img src={icon} />
        <Value value={value}>
          {isNumber(value) ? round(value).toLocaleString() : '---'}
        </Value>
      </div>
      <Title>{config.title}</Title>
    </Container>
  );
});

Equivalency.propTypes = propTypes;

export default Equivalency;
