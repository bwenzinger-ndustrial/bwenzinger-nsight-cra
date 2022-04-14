import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import { FullScreenLoadingIndicator } from '@ndustrial/nsight-common/components';
import FullScreenMinusNav from '@ndustrial/nsight-common/components/layout/FullScreenMinusNav';

import Header from '../containers/Header';
import SiteNavigation from '../containers/SiteNavigation';
import ApplicationLoadingIndicator from './ApplicationLoadingIndicator';

const propTypes = {
  children: PropTypes.any,
  hasInitiallyLoaded: PropTypes.bool,
  isLoadingApplicationGroupings: PropTypes.bool,
  isLoggingOut: PropTypes.bool,
  location: PropTypes.object
};

function Dashboard(props) {
  const {
    children,
    isLoadingApplicationGroupings,
    isLoggingOut,
    location,
    hasInitiallyLoaded
  } = props;

  if (!hasInitiallyLoaded) {
    return <ApplicationLoadingIndicator />;
  }

  if (isLoggingOut) {
    return <FullScreenLoadingIndicator loadingText="Logging out" />;
  }

  return (
    <FullScreenMinusNav.Container>
      <Header location={location} />

      <SiteNavigation />

      {isLoadingApplicationGroupings ? (
        <ApplicationLoadingIndicator />
      ) : (
        <FullScreenMinusNav.Content>
          <Suspense fallback={<ApplicationLoadingIndicator />}>
            {children}
          </Suspense>
        </FullScreenMinusNav.Content>
      )}
    </FullScreenMinusNav.Container>
  );
}

Dashboard.propTypes = propTypes;

export default Dashboard;
