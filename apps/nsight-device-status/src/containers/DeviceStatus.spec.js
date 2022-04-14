import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { fixtures } from '@ndustrial/nsight-test-utils';

import { DeviceStatusContainer as DeviceStatus } from './DeviceStatus';

describe('nsight-device-status/containers/DeviceStatus', function() {
  let baseProps;

  beforeEach(function() {
    baseProps = {
      actions: {
        events: {
          getUserSubscriptionInfo: sinon.stub(),
          subscribeUserToEvent: sinon.stub(),
          unsubscribeUserFromEvent: sinon.stub()
        },
        feeds: {
          loadFeedStatusForFacility: sinon.stub()
        },
        feedTypes: {
          getFeedTypes: sinon.stub()
        }
      }
    };
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('componentDidMount', function() {
    context(
      'when there is a selected facility and current user id',
      function() {
        let selectedFacility;
        let currentUserId;

        beforeEach(function() {
          selectedFacility = fixtures.build('facility');
          currentUserId = fixtures.build('user').id;

          const status = shallow(
            <DeviceStatus
              {...baseProps}
              currentUserId={currentUserId}
              selectedFacility={selectedFacility}
            />,
            {
              disableLifecycleMethods: true
            }
          );

          status.instance().componentDidMount();
        });

        it('loads the feed types', function() {
          expect(baseProps.actions.feedTypes.getFeedTypes).to.be.calledOnce();
        });

        it('loads the current user subscription info', function() {
          expect(
            baseProps.actions.events.getUserSubscriptionInfo
          ).to.be.calledWith(currentUserId);
        });
      }
    );

    context('when there is no selected facility', function() {
      beforeEach(function() {
        const status = shallow(<DeviceStatus {...baseProps} />, {
          disableLifecycleMethods: true
        });

        status.instance().componentDidMount();
      });

      it('does not attempt to load schedules', function() {
        expect(
          baseProps.actions.feeds.loadFeedStatusForFacility
        ).to.not.be.called();
      });
    });

    context('when there is no current user', function() {
      let selectedFacility;

      beforeEach(function() {
        selectedFacility = fixtures.build('facility');
        const status = shallow(
          <DeviceStatus {...baseProps} selectedFacility={selectedFacility} />,
          {
            disableLifecycleMethods: true
          }
        );

        status.instance().componentDidMount();
      });

      it('does not attempt to load user subscriptions', function() {
        expect(
          baseProps.actions.events.getUserSubscriptionInfo
        ).to.not.be.called();
      });
    });
  });
});
