import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { fixtures } from '@ndustrial/nsight-test-utils';
import mountWithTheme from '@ndustrial/nsight-test-utils/mountWithTheme';

import EventFeed from './index';

describe('nsight-facility-overview/components/EventFeed', function() {
  let baseProps;
  let clock;
  let eventFeed;

  beforeEach(function() {
    baseProps = {
      events: [],
      getTriggeredEvents: sinon.stub(),
      getFeedTypes: sinon.stub(),
      isLoading: false,
      lastUpdatedAt: 1564411178691,
      selectedFacility: fixtures.build('facility')
    };
    clock = sinon.useFakeTimers();
    eventFeed = mountWithTheme(
      <MemoryRouter>
        <EventFeed {...baseProps} />
      </MemoryRouter>
    );
  });

  afterEach(function() {
    eventFeed.unmount();
    sinon.restore();
    clock.restore();
  });

  context('on mount', function() {
    it('calls get events', function() {
      expect(baseProps.getTriggeredEvents).to.be.calledOnce();
      expect(baseProps.getTriggeredEvents).to.be.calledWith(
        baseProps.selectedFacility.id
      );
    });

    it('calls get feed types', function() {
      expect(baseProps.getFeedTypes).to.be.calledOnce();
    });
  });

  context('on manual refresh', function() {
    beforeEach(function() {
      baseProps.getTriggeredEvents.reset();
    });

    it('calls get events', function() {
      eventFeed.find('button#events-refresh-icon-button').simulate('click');
      expect(baseProps.getTriggeredEvents).to.be.calledOnce();
      expect(baseProps.getTriggeredEvents).to.be.calledWith(
        baseProps.selectedFacility.id
      );
    });
  });

  context('on interval', function() {
    let expectedCalls;

    beforeEach(function() {
      expectedCalls = faker.random.number({ min: 1, max: 5 });
    });

    it('calls the get events on an interval', function() {
      for (let i = 1; i < expectedCalls; i++) {
        clock.tick(300000);
        setTimeout(() => {
          return expect(baseProps.getTriggeredEvents.callCount).to.equal(i + 1);
        }, 500);
      }
    });
  });
});
