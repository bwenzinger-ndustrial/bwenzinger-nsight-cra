import React, { Fragment } from 'react';
import { NotificationContainer } from 'react-notifications';

import ImpactContainer from './ImpactContainer';

const ImpactRoot = () => {
  return (
    <Fragment>
      <NotificationContainer />
      <ImpactContainer />
    </Fragment>
  );
};

export default ImpactRoot;
