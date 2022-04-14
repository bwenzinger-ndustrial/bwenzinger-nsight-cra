import React from 'react';
import { withRouter } from 'react-router-dom';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import queryString from 'qs';
import styled from 'styled-components';

import { PrimaryButton, SecondaryButton } from '@ndustrial/nd-button-react';
import { QueryLink } from '@ndustrial/nsight-common/components';

import { KPI_ICON_HASH } from '../../kpi-config/constants';

const PrimaryButtonGrow = styled(PrimaryButton)`
  width: 100%;
`;

const SecondaryButtonGrow = styled(SecondaryButton)`
  background-color: #fff;
  width: 100%;
`;

const KPIText = styled.span`
  text-transform: uppercase;
  font-size: ${rem('12px')};

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    font-size: ${rem('14px')};
  }
`;

DetailSelector.propTypes = {
  buttonSize: PropTypes.string,
  className: PropTypes.string,
  kpiWindow: PropTypes.string.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }),
  kpiConfig: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    monthly: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    daily: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    interval: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired
};

function DetailSelector(props) {
  const { buttonSize, className, location, kpiConfig, kpiWindow } = props;

  const { metric } = queryString.parse(location.search, {
    ignoreQueryPrefix: true
  });

  // KPI Cards states are always based on monthly key (for now)
  const KPIIcon = KPI_ICON_HASH[kpiConfig.icon];

  let isActive = false;
  const addUrlParamsForInactiveButton = {
    metric: kpiConfig.slug
  };

  if (kpiWindow && metric) {
    isActive = kpiConfig.slug === metric;
  }

  return isActive ? (
    <PrimaryButtonGrow
      className={className}
      component={QueryLink}
      icon={<KPIIcon />}
      size={buttonSize}
      removeParams={['metric']}
    >
      <KPIText>{kpiConfig.label}</KPIText>
    </PrimaryButtonGrow>
  ) : (
    <SecondaryButtonGrow
      className={className}
      component={QueryLink}
      icon={<KPIIcon />}
      size={buttonSize}
      addParams={addUrlParamsForInactiveButton}
    >
      <KPIText>{kpiConfig.label}</KPIText>
    </SecondaryButtonGrow>
  );
}

DetailSelector.defaultProps = {
  buttonSize: 'large'
};

export default withRouter(DetailSelector);
