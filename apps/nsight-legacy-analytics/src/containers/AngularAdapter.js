import React from 'react';
import { useSelector } from 'react-redux';

import { FullScreenLoadingIndicator } from '@ndustrial/nsight-common/components';
import { LegacyAngularAdapter } from '@ndustrial/nsight-common/containers';
import {
  getFeedsWithStatuses,
  getFeedsWithStatusesCompletionStatus
} from '@ndustrial/nsight-common/selectors';

import AnalyticsPlaceholder from '../components/AnalyticsPlaceholder';

function AngularAdapter() {
  // Mostly useful for a page refresh and navigating quickly to alerts page
  const feedsHaveLoaded = useSelector(getFeedsWithStatusesCompletionStatus);
  const feeds = useSelector(getFeedsWithStatuses);

  if (!feedsHaveLoaded)
    return <FullScreenLoadingIndicator loadingText="Loading Analytics Page" />;

  return feeds.length ? (
    <LegacyAngularAdapter legacyPath="analytics/sensors" />
  ) : (
    <AnalyticsPlaceholder />
  );
}

export default AngularAdapter;
