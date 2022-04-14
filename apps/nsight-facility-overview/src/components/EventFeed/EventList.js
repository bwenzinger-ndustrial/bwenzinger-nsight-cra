/* eslint-disable react/prop-types */
import React from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { WarningTriangle } from '@ndustrial/nd-icons-svg';

import List from '../List';
import ListItemIcon from '../ListItemIcon';
import ListItemText from '../ListItemText';
import Text from '../Text';
import EventListItem from './EventListItem';

const ScrollingListContainer = styled.div`
  overflow-y: scroll;
  border-top: 1px solid #d8d8d8;
`;

const CriticalIcon = styled(({ isResolved, ...props }) => (
  <WarningTriangle {...props} />
))`
  stroke: ${({ isResolved, theme }) =>
    isResolved ? theme.colors.gray : theme.colors.failure};
`;

const StyledList = styled(List)`
  ${EventListItem} {
    margin: -1px 0;
  }
`;

const StyledListItemText = styled(ListItemText)`
  padding: 8px;

  ${Text} {
    margin-bottom: 5px;
  }
`;

const TimestampContainer = styled.div`
  flex: 1;
  text-align: right;
`;

const propTypes = {
  className: PropTypes.string,
  feedTypesByLabel: PropTypes.objectOf(
    PropTypes.shape({
      troubleshootingUrl: PropTypes.string
    })
  ),
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
  timezone: PropTypes.string
};

const defaultProps = {
  feedTypesByLabel: {}
};

function calculateMessage(objectName, locationName, deviceName) {
  return `${objectName} ${
    locationName ? `in ${locationName} ` : ''
  }is not reporting data${deviceName ? ` from ${deviceName}.` : '.'}`;
}

function EventItem({
  message,
  triggerDate,
  resolveDate,
  timezone,
  troubleshootingUrl
}) {
  const overrideColor = resolveDate && 'gray';

  return (
    <EventListItem color={overrideColor || 'failure'}>
      <ListItemIcon>
        <CriticalIcon height="1.5em" width="1.5em" isResolved={!!resolveDate} />
      </ListItemIcon>
      <StyledListItemText>
        <Text size=".75em" spacing={1.25} weight={700} color={overrideColor}>
          {message}
        </Text>
        {resolveDate && (
          <Text size=".75em" weight={700} spacing={1.2} color={overrideColor}>
            (RESOLVED on{' '}
            {DateTime.fromISO(resolveDate, { zone: timezone }).toFormat(
              "MM/dd/yyyy 'at' hh:mm a ZZZZ"
            )}
            )
          </Text>
        )}
        {troubleshootingUrl && (
          <a
            href={troubleshootingUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Text size=".75em" weight={300} spacing={1.2} color={overrideColor}>
              Troubleshoot
            </Text>
          </a>
        )}
      </StyledListItemText>
      <TimestampContainer>
        <div>
          <Text size=".75em" weight={300} spacing={1.2} color={overrideColor}>
            {DateTime.fromISO(triggerDate, { zone: timezone }).toFormat(
              'MM/dd/yyyy'
            )}
          </Text>
        </div>
        <div>
          <Text size=".75em" weight={300} spacing={1.2} color={overrideColor}>
            {DateTime.fromISO(triggerDate, { zone: timezone }).toFormat(
              'hh:mm a ZZZZ'
            )}
          </Text>
        </div>
      </TimestampContainer>
    </EventListItem>
  );
}

function UnStyledEventList({ className, events, feedTypesByLabel, timezone }) {
  const eventComponents = events.reduce(
    (accumulator, { data, triggerDate, resolveDate, id }) => {
      const feedType = feedTypesByLabel[data.feed_type];

      if (data.field_groupings && data.field_groupings.length) {
        data.field_groupings.forEach(
          ({ label, location_tag_label, box_tag_label }) => {
            // Use the feed key if the device label is missing and there is no location
            const deviceLabel =
              box_tag_label || (!location_tag_label && data.feed_key);

            const eventMessage = calculateMessage(
              label,
              location_tag_label,
              deviceLabel
            );

            accumulator.push(
              <EventItem
                key={`${id}_${label}`}
                triggerDate={triggerDate}
                resolveDate={resolveDate}
                message={eventMessage}
                timezone={timezone}
                troubleshootingUrl={feedType && feedType.troubleshootingUrl}
              />
            );
          }
        );
      }

      const eventMessage = calculateMessage(
        data.feed_key,
        data.location_tag_label,
        data.box_tag_label
      );

      accumulator.push(
        <EventItem
          key={id}
          triggerDate={triggerDate}
          resolveDate={resolveDate}
          message={eventMessage}
          timezone={timezone}
          troubleshootingUrl={feedType && feedType.troubleshootingUrl}
        />
      );

      return accumulator;
    },
    []
  );

  return (
    <ScrollingListContainer className={className}>
      <StyledList>{eventComponents}</StyledList>
    </ScrollingListContainer>
  );
}

UnStyledEventList.propTypes = propTypes;
UnStyledEventList.defaultProps = defaultProps;

const EventList = styled(UnStyledEventList)``;

export default EventList;
