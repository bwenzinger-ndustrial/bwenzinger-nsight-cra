import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';
import _ from 'lodash';
import sinon from 'sinon';

import { fixtures } from '@ndustrial/nsight-test-utils';

import { SCHEDULE_TABS } from '../constants';
import { ScheduleDetailContainer as ScheduleDetail } from './ScheduleDetail';

const TAB_KEYS = SCHEDULE_TABS.map(({ key }) => key);

describe('nsight-rate-tariffs/containers/ScheduleDetail', function() {
  let baseProps;

  beforeEach(function() {
    const selectedContract = fixtures.build('contract');
    const selectedFacility = fixtures.build('facility');
    const selectedRateType = faker.random.arrayElement(TAB_KEYS);
    const selectedSchedule = fixtures.build('rateSchedule', {
      utilityContractId: selectedContract.id,
      contract: selectedContract,
      ...TAB_KEYS.reduce((memo, rateType) => {
        memo[rateType] = {
          periods: _.times(faker.random.number({ min: 1, max: 5 }), (index) => {
            return {
              _id: index,
              rates: fixtures.buildList(
                'rateTierRate',
                faker.random.number({ min: 1, max: 10 }),
                null,
                { type: rateType }
              )
            };
          }),
          seasons: fixtures
            .buildList(
              'rateSeason',
              faker.random.number({ min: 2, max: 3 }),
              {
                seasonPeriods: []
              },
              { type: rateType }
            )
            .map((season) => _.omit(season, [`${rateType}SeasonPeriods`]))
        };

        return memo;
      }, {})
    });

    baseProps = {
      selectedFacility,
      selectedSchedule,
      actions: {
        contracts: {
          getContractFile: sinon.stub(),
          loadContractById: sinon.stub().resolves()
        },
        schedules: {
          loadScheduleById: sinon.stub().resolves()
        }
      },
      hasLoadedContract: faker.random.boolean(),
      hasLoadedSchedule: faker.random.boolean(),
      hasLoadingContractFileError: faker.random.boolean(),
      history: {
        location: {
          hash: '',
          search: `?organization=${
            fixtures.build('organization').slug
          }&facility=${selectedFacility.slug}`
        },
        push: sinon.stub()
      },
      match: {
        params: {
          rateType: selectedRateType,
          scheduleId: `${faker.random.number()}`,
          seasonPeriod: faker.random.arrayElement(
            selectedSchedule[selectedRateType].seasons.map(({ slug }) => slug)
          )
        }
      },
      contract: {
        ...selectedContract
      }
    };
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('componentDidMount', function() {
    context('when there is a selected facility', function() {
      beforeEach(function() {
        sinon.stub(ScheduleDetail.prototype, 'loadScheduleAndContract');

        const scheduleDetail = shallow(<ScheduleDetail {...baseProps} />, {
          disableLifecycleMethods: true
        });

        scheduleDetail.instance().componentDidMount();
      });

      it('loads the schedule and contract', function() {
        expect(
          ScheduleDetail.prototype.loadScheduleAndContract
        ).to.be.calledOnce();
      });
    });

    context('when there is no selected facility', function() {
      beforeEach(function() {
        sinon.stub(ScheduleDetail.prototype, 'loadScheduleAndContract');

        const scheduleDetail = shallow(
          <ScheduleDetail {...baseProps} selectedFacility={null} />,
          {
            disableLifecycleMethods: true
          }
        );

        scheduleDetail.instance().componentDidMount();
      });

      it('does not attempt to load schedule', function() {
        expect(
          ScheduleDetail.prototype.loadScheduleAndContract
        ).to.not.be.called();
      });
    });
  });

  describe('componentDidUpdate', function() {
    context(
      'when the facility changes and there is a selected schedule',
      function() {
        let newProps;
        let newFacility;

        beforeEach(function() {
          newFacility = fixtures.build('facility');
          newProps = {
            ...baseProps,
            history: {
              ...baseProps.history,
              location: {
                ...baseProps.history.location,
                search: `?organization=${
                  fixtures.build('organization').slug
                }&facility=${newFacility.slug}`
              }
            },
            selectedFacility: newFacility
          };

          sinon.stub(ScheduleDetail.prototype, 'loadScheduleAndContract');

          const scheduleDetail = shallow(<ScheduleDetail {...newProps} />, {
            disableLifecycleMethods: true
          });

          scheduleDetail.instance().componentDidUpdate(baseProps);
        });

        it('navigates to the schedule index page', function() {
          expect(newProps.history.push).to.be.calledWith({
            ...newProps.history.location,
            pathname: `/rate-tariffs`
          });
        });

        it('loads the schedule and contract', function() {
          expect(
            ScheduleDetail.prototype.loadScheduleAndContract
          ).to.be.calledOnce();
        });
      }
    );

    context('when the schedule ID changes', function() {
      let newProps;

      beforeEach(function() {
        newProps = {
          ...baseProps,
          match: {
            ...baseProps.match,
            params: {
              ...baseProps.match.params,
              scheduleId: `${faker.random.number({
                min: parseInt(baseProps.match.params.scheduleId, 10) + 1
              })}`
            }
          }
        };

        sinon.stub(ScheduleDetail.prototype, 'loadScheduleAndContract');

        const scheduleDetail = shallow(<ScheduleDetail {...newProps} />, {
          disableLifecycleMethods: true
        });

        scheduleDetail.instance().componentDidUpdate(baseProps);
      });

      it('loads the schedule and contract', function() {
        expect(
          ScheduleDetail.prototype.loadScheduleAndContract
        ).to.be.calledOnce();
      });
    });

    context('when the rate type changes', function() {
      let props;

      beforeEach(function() {
        props = {
          ...baseProps,
          match: {
            ...baseProps.match,
            params: {
              ...baseProps.match.params,
              rateType: faker.random.arrayElement(
                SCHEDULE_TABS.filter(
                  ({ key }) => key !== baseProps.match.params.rateType
                )
              ).key
            }
          }
        };

        sinon.stub(ScheduleDetail.prototype, 'navigateToExistingSeason');

        const scheduleDetail = shallow(<ScheduleDetail {...props} />, {
          disableLifecycleMethods: true
        });

        scheduleDetail.instance().componentDidUpdate(baseProps);
      });

      it('navigates to an existing season if needed', function() {
        expect(
          ScheduleDetail.prototype.navigateToExistingSeason
        ).to.be.calledWith(props);
      });
    });

    context('when a non-watched prop changes', function() {
      let prevProps;
      let props;

      beforeEach(function() {
        prevProps = {
          ...baseProps,
          contract: {
            fileId: null
          }
        };
        props = {
          ...prevProps,
          [faker.hacker.adjective()]: faker.hacker.phrase()
        };

        sinon.stub(ScheduleDetail.prototype, 'loadScheduleAndContract');
        sinon.stub(ScheduleDetail.prototype, 'navigateToExistingSeason');

        const scheduleDetail = shallow(<ScheduleDetail {...props} />, {
          disableLifecycleMethods: true
        });

        scheduleDetail.instance().componentDidUpdate(prevProps);
      });

      it('does not navigate to index page', function() {
        expect(props.history.push).to.not.be.called();
      });

      it("does not get the contract's file", function() {
        expect(
          ScheduleDetail.prototype.loadScheduleAndContract
        ).to.not.be.called();
      });

      it('does not change the URL to a season that exists for a particular rate type', function() {
        expect(
          ScheduleDetail.prototype.navigateToExistingSeason
        ).to.not.be.called();
      });
    });
  });

  describe('loadScheduleAndContract', function() {
    context(
      'when the schedule has an associated utility contract and file',
      function() {
        let promise;

        beforeEach(function() {
          const scheduleDetail = shallow(<ScheduleDetail {...baseProps} />, {
            disableLifecycleMethods: true
          });

          promise = scheduleDetail.instance().loadScheduleAndContract();
        });

        it('loads the schedule', function() {
          return promise.then(() => {
            expect(
              baseProps.actions.schedules.loadScheduleById
            ).to.be.calledWith(baseProps.match.params.scheduleId);
          });
        });

        it('loads the contract', function() {
          return promise.then(() => {
            expect(
              baseProps.actions.contracts.loadContractById
            ).to.be.calledWith(
              baseProps.selectedFacility.id,
              baseProps.selectedSchedule.utilityContractId
            );
          });
        });

        it('loads the contract file', function() {
          return promise.then(() => {
            expect(
              baseProps.actions.contracts.getContractFile
            ).to.be.calledWith(
              baseProps.contract.fileId,
              baseProps.selectedSchedule.utilityContractId
            );
          });
        });
      }
    );

    context('when there is no selected facility', function() {
      let promise;

      beforeEach(function() {
        const scheduleDetail = shallow(
          <ScheduleDetail {...baseProps} selectedFacility={undefined} />,
          { disableLifecycleMethods: true }
        );

        promise = scheduleDetail.instance().loadScheduleAndContract();
      });

      it('does not try to load a contract', function() {
        return promise.then(() => {
          expect(
            baseProps.actions.contracts.loadContractById
          ).to.be.not.called();
        });
      });

      it('does not try to load a contract file', function() {
        return promise.then(() => {
          expect(
            baseProps.actions.contracts.getContractFile
          ).to.be.not.called();
        });
      });
    });

    context(
      'when the schedule does not have an associated utility contract',
      function() {
        let promise;

        beforeEach(function() {
          const selectedSchedule = {
            ...baseProps.selectedSchedule,
            contract: undefined,
            utilityContractId: undefined
          };

          const scheduleDetail = shallow(
            <ScheduleDetail
              {...baseProps}
              selectedSchedule={selectedSchedule}
            />,
            { disableLifecycleMethods: true }
          );

          promise = scheduleDetail.instance().loadScheduleAndContract();
        });

        it('does not try to load a contract', function() {
          return promise.then(() => {
            expect(
              baseProps.actions.contracts.loadContractById
            ).to.be.not.called();
          });
        });

        it('does not try to load a contract file', function() {
          return promise.then(() => {
            expect(
              baseProps.actions.contracts.getContractFile
            ).to.be.not.called();
          });
        });
      }
    );

    context(
      'when the associated utility contract does not have an associated file',
      function() {
        let promise;

        beforeEach(function() {
          const contract = {
            ...baseProps.contract,
            fileId: undefined
          };

          const scheduleDetail = shallow(
            <ScheduleDetail {...baseProps} contract={contract} />,
            { disableLifecycleMethods: true }
          );

          promise = scheduleDetail.instance().loadScheduleAndContract();
        });

        it('does not try to load a contract file', function() {
          return promise.then(() => {
            expect(
              baseProps.actions.contracts.getContractFile
            ).to.be.not.called();
          });
        });
      }
    );
  });

  describe('navigateToExistingSeason', function() {
    context(
      'when the season period slug does not exist in the selected rate schedule',
      function() {
        beforeEach(function() {
          const scheduleDetail = shallow(<ScheduleDetail {...baseProps} />, {
            disableLifecycleMethods: true
          });

          scheduleDetail.instance().navigateToExistingSeason({
            history: baseProps.history,
            match: {
              ...baseProps.match,
              params: {
                ...baseProps.match.params,
                seasonPeriod: faker.lorem.word()
              }
            },
            selectedSchedule: baseProps.selectedSchedule
          });
        });

        it("navigates to the season's annual rate", function() {
          expect(baseProps.history.push).to.be.calledWith({
            ...baseProps.history.location,
            pathname: `/rate-tariffs/schedule/${baseProps.selectedSchedule.id}/annual-rate/${baseProps.match.params.rateType}`
          });
        });
      }
    );

    context(
      'when the season period slug exists in the selected rate schedule',
      function() {
        beforeEach(function() {
          const scheduleDetail = shallow(<ScheduleDetail {...baseProps} />, {
            disableLifecycleMethods: true
          });

          scheduleDetail.instance().navigateToExistingSeason({
            history: baseProps.history,
            match: baseProps.match,
            selectedSchedule: baseProps.selectedSchedule
          });
        });

        it('does not change the URL', function() {
          expect(baseProps.history.push).to.not.be.called();
        });
      }
    );
  });
});
