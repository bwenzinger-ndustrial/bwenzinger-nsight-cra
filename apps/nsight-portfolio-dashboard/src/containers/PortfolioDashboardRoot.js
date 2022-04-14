import React, { Fragment } from 'react';

import { KPIDashboardHeader } from '@ndustrial/nsight-common/containers';

import Routes from '../routes';

const PortfolioDashboardRoot = () => {
  return (
    <Fragment>
      <KPIDashboardHeader sectionTitle="Portfolio" />
      <Routes />
    </Fragment>
  );
};

export default PortfolioDashboardRoot;
