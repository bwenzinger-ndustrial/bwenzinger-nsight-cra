import React, { Fragment } from 'react';
import styled from 'styled-components';

import { FeaturePlaceholder } from '@ndustrial/nsight-common/components';

import placeholderImage from '../assets/analytics_placeholder.png';

const AlertsPlaceholderContainer = styled.div`
  height: 100%;
  width: 100%;
  background: ${() => {
    return '#eaeaea'; // TODO, add color to the theme component uiKitBackground prop in nd-react-common
  }};

  > * {
    height: 100%;
  }
`;

function AnalyticsPlaceholder() {
  return (
    <AlertsPlaceholderContainer>
      <FeaturePlaceholder
        placeholder={placeholderImage}
        text={
          <Fragment>
            The{' '}
            <a
              href="https://ndustrialio.atlassian.net/servicedesk/customer/portal/6/topic/0fa422eb-7b6d-46c8-80db-d49db4b8d75b/article/892731393"
              target="_blank"
              rel="noopener noreferrer"
            >
              Analytics page
            </a>{' '}
            is currently only available to facilities that have implemented
            energy monitoring devices.
          </Fragment>
        }
        subtext={
          <Fragment>
            If you would like to learn how this facility can upgrade to
            real-time energy monitoring devices, please contact{' '}
            <a href="mailto:support@ndustrial.io">support@ndustrial.io</a>
          </Fragment>
        }
      />
    </AlertsPlaceholderContainer>
  );
}

export default AnalyticsPlaceholder;
