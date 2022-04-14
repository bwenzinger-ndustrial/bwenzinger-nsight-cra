import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  FullScreenLoadingIndicator,
  MissingSelection
} from '@ndustrial/nsight-common/components';

import UnstyledDeviceStatusText from './DeviceStatusText';
import DeviceStatusCircleTextGroup from './Table/DeviceStatusCircleTextGroup';
import DeviceStatusTable from './Table/DeviceStatusTable';

const propTypes = {
  actions: PropTypes.shape({
    events: PropTypes.shape({
      subscribeUserToEvent: PropTypes.func.isRequired,
      unsubscribeUserFromEvent: PropTypes.func.isRequired
    })
  }),
  currentUserId: PropTypes.string,
  feeds: PropTypes.array,
  hasLoadedFeeds: PropTypes.bool,
  hasSelectedFacilitySlug: PropTypes.bool,
  selectedFacility: PropTypes.shape({
    name: PropTypes.string
  })
};

const DeviceStatusText = styled(UnstyledDeviceStatusText)``;

const HeaderText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('20px')};
  font-weight: 300;
  line-height: 1.167;
  margin: 0;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    font-size: ${rem('24px')};
  }
`;

const ContainerDiv = styled.div`
  background: #eaeaea;
  flex: 1;
  padding: 10px 0;

  @media screen and (min-width: 897px) {
    padding: 10px;
  }
`;
const Header = styled.div`
  border-bottom: 1px solid #d8d8d8;
  padding: 15px 10px;
`;

const DeviceStatusContainer = styled.div`
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const DeviceStatusLegendContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: inline-flex;
  font-size: ${rem('14px')};
  font-weight: 400;
  justify-content: space-around;
  letter-spacing: 0.5px;
  line-height: 1.2;
  margin: auto;
  width: 60%;

  @media screen and (min-width: 897px) {
    align-self: center;
    display: block;
  }
`;

const DeviceStatusTextContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: relative;

  @media screen and (min-width: 897px) {
    flex-direction: row;
  }

  ${DeviceStatusLegendContainer} {
    margin-bottom: 30px;

    @media screen and (min-width: 897px) {
      position: absolute;
    }
  }

  ${DeviceStatusText} {
    margin: 0 calc(15% - 30px);
  }
`;

function DeviceStatus(props) {
  const {
    actions,
    currentUserId,
    feeds,
    hasLoadedFeeds,
    hasSelectedFacilitySlug,
    selectedFacility
  } = props;

  if (!hasLoadedFeeds && hasSelectedFacilitySlug) {
    return (
      <FullScreenLoadingIndicator loadingText="Loading Device Status Table" />
    );
  }

  return (
    <Fragment>
      <Helmet>
        <title>
          {selectedFacility && selectedFacility.name + ' - Device Status'}
        </title>
      </Helmet>
      <Header>
        <HeaderText>Device Status</HeaderText>
      </Header>
      <ContainerDiv>
        {hasSelectedFacilitySlug ? (
          <DeviceStatusContainer>
            <DeviceStatusTextContainer>
              <DeviceStatusLegendContainer>
                <DeviceStatusCircleTextGroup status="Active" text="Healthy" />
                <DeviceStatusCircleTextGroup
                  status="Critical"
                  text="Critical"
                />
              </DeviceStatusLegendContainer>
              <DeviceStatusText />
            </DeviceStatusTextContainer>
            <DeviceStatusTable
              currentUserId={currentUserId}
              feeds={feeds}
              subscribeUserToEvent={actions.events.subscribeUserToEvent}
              unsubscribeUserFromEvent={actions.events.unsubscribeUserFromEvent}
            />
          </DeviceStatusContainer>
        ) : (
          <MissingSelection requiredType="facility" />
        )}
      </ContainerDiv>
    </Fragment>
  );
}

DeviceStatus.propTypes = propTypes;

export default DeviceStatus;
