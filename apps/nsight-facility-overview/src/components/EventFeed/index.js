import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Refresh as RefreshIcon } from '@ndustrial/nd-icons-svg';
import { QueryLink } from '@ndustrial/nsight-common/components';
import Card, { Content } from '@ndustrial/nsight-common/components/Card';
import IconButton from '@ndustrial/nsight-common/components/IconButton';
import { useInterval } from '@ndustrial/nsight-common/hooks';

import TimeAgo from '../TimeAgo';
import EventFeedEmpty from './EventFeedEmpty';
import EventList from './EventList';

const Anchor = styled(QueryLink)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 400;
  display: inline-block;
  text-align: center;
`;

const StyledCard = styled(Card)`
  ${Anchor} {
    padding-top: 10px;
  }

  ${Content} {
    flex-direction: column;
  }
`;

const ContentBox = styled.div`
  background: repeating-linear-gradient(
    45deg,
    #efefef,
    #efefef 2px,
    #f5f5f5 2px,
    #f5f5f5 12px
  );
  border: 1px solid #d8d8d8;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;

  ${EventList} {
    position: absolute;
    top: ${({ isLoading }) => (isLoading ? '50px' : '-1px')};
    right: -1px;
    bottom: -1px;
    left: -1px;
    transition: top 0.1s ease;
  }
`;

const StyledIconButton = styled(IconButton)`
  svg {
    stroke: #979797;
  }

  &:hover,
  &:focus {
    svg {
      stroke: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const GET_DATA_INTERVAL = 300000;

const propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.shape({
        feed_key: PropTypes.string.isRequired
      }).isRequired,
      triggerDate: PropTypes.string.isRequired,
      resolveDate: PropTypes.string,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  feedTypesByLabel: PropTypes.objectOf(
    PropTypes.shape({
      troubleshootingUrl: PropTypes.string
    })
  ),
  getFeedTypes: PropTypes.func.isRequired,
  getTriggeredEvents: PropTypes.func.isRequired,
  hasData: PropTypes.bool,
  isLoading: PropTypes.bool,
  lastUpdatedAt: PropTypes.number,
  selectedFacility: PropTypes.shape({
    id: PropTypes.number.isRequired,
    timezone: PropTypes.string.isRequired
  })
};

function EventFeed({
  className,
  error,
  feedTypesByLabel,
  getFeedTypes,
  getTriggeredEvents,
  events,
  hasData,
  isLoading,
  lastUpdatedAt,
  selectedFacility
}) {
  useEffect(() => {
    getTriggeredEvents(selectedFacility.id);
  }, [selectedFacility, getTriggeredEvents]);

  useEffect(() => {
    getFeedTypes();
  }, [getFeedTypes]);

  useInterval(() => getTriggeredEvents(selectedFacility.id), GET_DATA_INTERVAL);

  const noEvents = !!lastUpdatedAt && !hasData && !isLoading;

  return (
    <StyledCard
      className={className}
      title="Event Feed"
      subtitle={
        <span>
          <em>Last updated</em>: <TimeAgo date={lastUpdatedAt} />
        </span>
      }
      renderRight={() => (
        <StyledIconButton
          id="events-refresh-icon-button"
          onClick={() => getTriggeredEvents(selectedFacility.id)}
        >
          <RefreshIcon />
        </StyledIconButton>
      )}
      error={error}
      hasData={noEvents ? false : hasData}
      isLoading={isLoading}
    >
      <ContentBox>
        {!error && noEvents && <EventFeedEmpty />}
        {!noEvents && (
          <EventList
            events={events}
            feedTypesByLabel={feedTypesByLabel}
            timezone={selectedFacility.timezone}
          />
        )}
      </ContentBox>
      <Anchor to="/device-status">View Device Status Page</Anchor>
    </StyledCard>
  );
}

EventFeed.propTypes = propTypes;

export default EventFeed;
