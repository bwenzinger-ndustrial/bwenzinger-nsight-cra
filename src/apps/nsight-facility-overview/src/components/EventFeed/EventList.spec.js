import React from 'react';
import { expect } from 'chai';

import { renderWithAppContext } from '@ndustrial/nsight-common/test/testRenderer';
import { fixtures } from '@ndustrial/nsight-test-utils';

import EventList from './EventList';

describe('nsight-facility-overview/src/components/EventList', function() {
  context('feeds', function() {
    it('renders location', function() {
      const event = fixtures.build('event');
      event.data.feed_key = 'feed_key';
      event.data.location_tag_label = 'Location A';

      const { queryByText } = renderWithAppContext(
        <EventList events={[event]} />
      );

      // Regex: field group and location in same string
      expect(
        queryByText(/(?=.*?\bfeed_key\b)(?=.*?\bLocation A\b).*/)
      ).to.not.be.null();
    });

    it('renders the feed key', function() {
      const event = fixtures.build('event');

      const { queryByText } = renderWithAppContext(
        <EventList events={[event]} />
      );

      expect(queryByText(new RegExp(`/${event.data.feed_key}/`))).to.be.null();
    });

    it('renders location and device', function() {
      const event = fixtures.build('event');
      event.data.feed_key = 'Feed';
      event.data.location_tag_label = 'Location';
      event.data.box_tag_label = 'Device';

      const { queryByText } = renderWithAppContext(
        <EventList events={[event]} />
      );

      // Regex: field group and location in same string
      expect(
        queryByText(/(?=.*?\bFeed\b)(?=.*?\bLocation\b)(?=.*?\bDevice\b).*/)
      ).to.not.be.null();
    });

    it('renders device', function() {
      const event = fixtures.build('event');
      event.data.feed_key = 'Feed';
      event.data.box_tag_label = 'Device';

      const { queryByText } = renderWithAppContext(
        <EventList events={[event]} />
      );

      // Regex: field group and location in same string
      expect(
        queryByText(/(?=.*?\bFeed\b)(?=.*?\bDevice\b).*/)
      ).to.not.be.null();
    });

    it('renders resolved events', function() {
      const event = fixtures.build('event');
      event.data.feed_key = 'Feed';
      event.data.box_tag_label = 'Device';
      event.resolveDate = '1970-01-01T00:00:00Z';

      const { queryByText } = renderWithAppContext(
        <EventList events={[event]} />
      );

      expect(queryByText(/resolved/i)).to.not.be.null();
    });
  });

  context('field groupings', function() {
    it('handles multiple events', function() {
      const event = fixtures.build('event');
      event.data.field_groupings = [
        { label: 'Field Group 1' },
        { label: 'Field Group 2' }
      ];

      const { queryByText } = renderWithAppContext(
        <EventList events={[event]} />
      );

      expect(queryByText(/Field Group 1/)).to.not.be.null();
      expect(queryByText(/Field Group 2/)).to.not.be.null();
    });

    it('renders location', function() {
      const event = fixtures.build('event');
      event.data.field_groupings = [
        { label: 'Field Group 1', location_tag_label: 'Location A' },
        { label: 'Field Group 2', location_tag_label: 'Location B' }
      ];

      const { queryByText } = renderWithAppContext(
        <EventList events={[event]} />
      );

      // Regex: field group and location in same string
      expect(
        queryByText(/(?=.*?\bField Group 1\b)(?=.*?\bLocation A\b).*/)
      ).to.not.be.null();

      expect(
        queryByText(/(?=.*?\bField Group 2\b)(?=.*?\bLocation B\b).*/)
      ).to.not.be.null();
    });

    it('does not render feed name if location is present', function() {
      const event = fixtures.build('event');
      event.data.field_groupings = [
        { label: 'Field Group 1', location_tag_label: 'Location A' },
        { label: 'Field Group 2', location_tag_label: 'Location B' }
      ];

      const { queryByText } = renderWithAppContext(
        <EventList events={[event]} />
      );

      expect(queryByText(new RegExp(`/${event.data.feed_key}/`))).to.be.null();
    });

    it('renders location and device', function() {
      const event = fixtures.build('event');
      event.data.field_groupings = [
        {
          label: 'FieldGroup',
          location_tag_label: 'Location',
          box_tag_label: 'Device'
        }
      ];

      const { queryByText } = renderWithAppContext(
        <EventList events={[event]} />
      );

      // Regex: field group and location in same string
      expect(
        queryByText(
          /(?=.*?\bFieldGroup\b)(?=.*?\bLocation\b)(?=.*?\bDevice\b).*/
        )
      ).to.not.be.null();
    });

    it('renders device', function() {
      const event = fixtures.build('event');
      event.data.field_groupings = [
        {
          label: 'FieldGroup',
          box_tag_label: 'Device'
        }
      ];

      const { queryByText } = renderWithAppContext(
        <EventList events={[event]} />
      );

      // Regex: field group and location in same string
      expect(
        queryByText(/(?=.*?\bFieldGroup\b)(?=.*?\bDevice\b).*/)
      ).to.not.be.null();
    });

    it('renders feed if missing location and device', function() {
      const event = fixtures.build('event');
      event.data.feed_key = 'feed_key';
      event.data.field_groupings = [
        {
          label: 'FieldGroup'
        }
      ];

      const { queryByText } = renderWithAppContext(
        <EventList events={[event]} />
      );

      // Regex: field group and feed in same string
      expect(queryByText(/(?=.*\bFieldGroup\b).*feed_key/)).to.not.be.null();
    });
  });
});
