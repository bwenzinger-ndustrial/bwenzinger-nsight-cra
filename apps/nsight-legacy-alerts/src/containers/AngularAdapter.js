import React from 'react';
import { useSelector } from 'react-redux';

import { FullScreenLoadingIndicator } from '@ndustrial/nsight-common/components';
import { LegacyAngularAdapter } from '@ndustrial/nsight-common/containers';
import {
  getFeedsWithStatuses,
  getFeedsWithStatusesCompletionStatus
} from '@ndustrial/nsight-common/selectors';

import AlertsPlaceholder from '../components/AlertsPlaceholder';

function AngularAdapter() {
  // Mostly useful for a page refresh and navigating quickly to alerts page
  const feedsHaveLoaded = useSelector(getFeedsWithStatusesCompletionStatus);
  const feeds = useSelector(getFeedsWithStatuses);

  if (!feedsHaveLoaded)
    return (
      <FullScreenLoadingIndicator loadingText="Loading Alerts for Analytics" />
    );

  return feeds.length ? (
    <LegacyAngularAdapter legacyPath="alerts" />
  ) : (
    <AlertsPlaceholder />
  );
}

export default AngularAdapter;
