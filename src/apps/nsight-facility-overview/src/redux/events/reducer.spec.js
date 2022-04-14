import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import fixture from '../../../test/fixtures/factories';
import actionTypes from './actionTypes';
import eventsReducer, { INITIAL_STATE } from './reducer';

describe('nsight-facility-overview/redux/events/reducer', function() {
  beforeEach(function() {
    this.clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    this.clock.restore();
  });

  it('returns the initial state', function() {
    expect(eventsReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe(`${actionTypes.EVENTS_GET_SUCCESS}`, function() {
    let nextState;
    let events;

    beforeEach(function() {
      events = fixture.buildList('event', 10).map((event) => {
        return { ...event, data: JSON.stringify(event.data) };
      });
    });

    it('limits the events to 5', function() {
      nextState = eventsReducer(INITIAL_STATE, {
        type: actionTypes.EVENTS_GET_SUCCESS,
        payload: events
      });
      expect(nextState.items.length).to.equal(4);
    });

    it('filters out monnit feed types', function() {
      const monnitEvent = fixture.build('event', {
        data: JSON.stringify({
          feed_key: '1234',
          feed_type: 'monnit'
        })
      });

      events.push(monnitEvent);

      nextState = eventsReducer(INITIAL_STATE, {
        type: actionTypes.EVENTS_GET_SUCCESS,
        payload: events
      });

      nextState.items.forEach((item) => {
        expect(item.id).to.not.equal(monnitEvent.id);
      });
    });

    it('does not store the event that has invalid data', function() {
      const validEvents = fixture.buildList('event', 2);
      const invalidEvents = fixture.buildList('event', 2, { data: null });

      nextState = eventsReducer(INITIAL_STATE, {
        type: actionTypes.EVENTS_GET_SUCCESS,
        payload: [...validEvents, ...invalidEvents].map((item) => ({
          ...item,
          data: JSON.stringify(item.data)
        }))
      });
      expect(nextState.items.length).to.equal(2);
      expect(nextState.items).to.not.includes(invalidEvents);
    });

    it('updates the lastUpdated property', function() {
      nextState = eventsReducer(INITIAL_STATE, {
        type: actionTypes.EVENTS_GET_SUCCESS,
        payload: []
      });
      expect(nextState.lastUpdatedAt).to.equal(0);
      this.clock.tick(1000);
      nextState = eventsReducer(INITIAL_STATE, {
        type: actionTypes.EVENTS_GET_SUCCESS,
        payload: []
      });
      expect(nextState.lastUpdatedAt).to.equal(1000);
    });
  });

  describe(`${actionTypes.EVENTS_GET_FAILURE}`, function() {
    let nextState;
    let expectedEvents;
    let expectedError;

    beforeEach(function() {
      expectedError = faker.hacker.phrase();

      expectedEvents = fixture.buildList(
        'event',
        faker.random.number({ min: 2, max: 10 })
      );

      nextState = eventsReducer(INITIAL_STATE, {
        type: actionTypes.EVENTS_GET_FAILURE,
        payload: expectedError
      });
    });

    it('returns the correct value', function() {
      expect(nextState.error).to.deep.equal(expectedError);
    });

    it('values are reset to an empty array', function() {
      expect(nextState.items).to.deep.equal([]);
    });

    context(
      'when data already exists and there is a failure on an interval call',
      function() {
        let prevState;
        let nextState;

        beforeEach(function() {
          expectedError = faker.hacker.phrase();

          prevState = eventsReducer(INITIAL_STATE, {
            type: actionTypes.EVENTS_GET_SUCCESS,
            payload: expectedEvents.map((event) => ({
              ...event,
              data: JSON.stringify(event.data)
            }))
          });

          nextState = eventsReducer(prevState, {
            type: actionTypes.EVENTS_GET_FAILURE,
            payload: expectedError
          });
        });

        it('sets the error but persists the data', function() {
          expect(nextState).to.deep.equal({
            error: expectedError,
            items: prevState.items,
            lastUpdatedAt: 0
          });
        });
      }
    );
  });

  describe('SET_SELECTED_FACILITY_SLUG', function() {
    let nextState;
    beforeEach(function() {
      eventsReducer(INITIAL_STATE, {
        type: actionTypes.EVENTS_GET_SUCCESS,
        payload: fixture
          .buildList('event', faker.random.number({ min: 1, max: 10 }))
          .map((event) => ({ ...event, data: JSON.stringify(event.data) }))
      });

      nextState = eventsReducer(INITIAL_STATE, {
        type: 'SET_SELECTED_FACILITY_SLUG'
      });
    });

    it('resets to the initial state', function() {
      expect(nextState).to.deep.equal(INITIAL_STATE);
    });
  });
});
