import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';
import sinon from 'sinon';

import { fixtures } from '@ndustrial/nsight-test-utils';

import { SchedulesContainer as Schedules } from './Schedules';

describe('nsight-rate-tariffs/containers/Schedules', function() {
  let baseProps;

  beforeEach(function() {
    baseProps = {
      actions: {
        schedules: {
          loadSchedulesByFacilityId: sinon.stub()
        }
      }
    };
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('componentDidMount', function() {
    context('when there is a selected facility', function() {
      let selectedFacility;

      beforeEach(function() {
        selectedFacility = fixtures.build('facility');

        const schedules = shallow(
          <Schedules {...baseProps} selectedFacility={selectedFacility} />,
          {
            disableLifecycleMethods: true
          }
        );

        schedules.instance().componentDidMount();
      });

      it("loads the facility's schedules", function() {
        expect(
          baseProps.actions.schedules.loadSchedulesByFacilityId
        ).to.be.calledWith(selectedFacility.id);
      });
    });

    context('when there is no selected facility', function() {
      beforeEach(function() {
        const schedules = shallow(<Schedules {...baseProps} />, {
          disableLifecycleMethods: true
        });

        schedules.instance().componentDidMount();
      });

      it('does not attempt to load schedules', function() {
        expect(
          baseProps.actions.schedules.loadSchedulesByFacilityId
        ).to.not.be.called();
      });
    });
  });

  describe('componentDidUpdate', function() {
    context('when the selected facility changes to a new facility', function() {
      let prevProps;
      let props;

      beforeEach(function() {
        props = {
          ...baseProps,
          selectedFacility: fixtures.build('facility')
        };
        prevProps = {
          ...baseProps,
          selectedFacility: fixtures.build('facility')
        };

        const schedules = shallow(<Schedules {...props} />, {
          disableLifecycleMethods: true
        });

        schedules.instance().componentDidUpdate(prevProps);
      });

      it("loads the facility's schedules", function() {
        expect(
          props.actions.schedules.loadSchedulesByFacilityId
        ).to.be.calledWith(props.selectedFacility.id);
      });
    });

    context('when a non-facility prop changes', function() {
      let prevProps;
      let props;

      beforeEach(function() {
        prevProps = {
          ...baseProps,
          selectedFacility: fixtures.build('facility')
        };
        props = {
          ...prevProps,
          [faker.hacker.adjective()]: faker.hacker.phrase()
        };

        const schedules = shallow(<Schedules {...props} />, {
          disableLifecycleMethods: true
        });

        schedules.instance().componentDidUpdate(prevProps);
      });

      it("does not reload a facility's schedules", function() {
        expect(
          props.actions.schedules.loadSchedulesByFacilityId
        ).to.not.be.called();
      });
    });
  });
});
