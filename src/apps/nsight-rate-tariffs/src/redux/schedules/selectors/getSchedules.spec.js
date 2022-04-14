import { expect } from 'chai';
import faker from 'faker';

import { fixtures } from '@ndustrial/nsight-test-utils';

import getSchedules from './getSchedules';

describe('nsight-rate-tariffs/redux/selectors/getSchedules', function() {
  let expectedScheduleIds;
  let expectedSchedules;
  let expectedContracts;
  let schedules;
  let contracts;

  beforeEach(function() {
    expectedContracts = fixtures.buildList(
      'contract',
      faker.random.number({ min: 1, max: 10 })
    );
    expectedSchedules = [
      ...expectedContracts.map((contract) =>
        fixtures.build(
          'rateSchedule',
          { utilityContractId: contract.id },
          { contract }
        )
      ),
      ...fixtures.buildList(
        'rateSchedule',
        faker.random.number({ min: 1, max: 5 }),
        {
          utilityContractId: null
        }
      )
    ];
    expectedScheduleIds = expectedSchedules.map(({ id }) => id);
    contracts = expectedContracts.reduce((memo, contract) => {
      memo[contract.id] = contract;
      return memo;
    }, {});
    schedules = expectedSchedules.reduce((memo, schedule) => {
      memo[schedule.id] = schedule;
      return memo;
    }, {});
  });
  it('returns an ordered list of schedules', function() {
    const rateSchedules = getSchedules.resultFunc(
      schedules,
      expectedScheduleIds,
      contracts
    );
    expectedScheduleIds.forEach((id, index) => {
      const rateSchedule = rateSchedules[index];
      expect(rateSchedule).to.include(schedules[id]);
    });
  });
  it('includes the utility contract if it exists', function() {
    const rateSchedules = getSchedules.resultFunc(
      schedules,
      expectedScheduleIds,
      contracts
    );
    expectedContracts.forEach((contract) => {
      const schedule = rateSchedules.find(
        ({ utilityContractId }) => utilityContractId === contract.id
      );
      expect(schedule).to.not.be.null();
      expect(schedule.contract).to.include(contract);
    });
  });
});
