import { expect } from 'chai';
import faker from 'faker';
import _ from 'lodash';
import moment from 'moment';
import sinon from 'sinon';

import commonChartUtils from '@ndustrial/nsight-common/charts/commonChartUtils';
import { fixtures } from '@ndustrial/nsight-test-utils';

import { kpiEnums } from '../../kpi-config/constants';
import getKpiCardFactory from './getKpiCardFactory';

describe('nsight-common/selectors/kpi/getKpiCardFactory', function() {
  let changeDirection;
  let percentChange;
  let kpiConfig;

  beforeEach(function() {
    percentChange = faker.random.number();
    changeDirection = faker.random.arrayElement(['positive', 'negative']);
    kpiConfig = fixtures.build('kpiConfig', {
      compareBy: kpiEnums.COMPARE_BY_TYPES.DATE
    });

    sinon.stub(commonChartUtils, 'getPercentChange').returns(percentChange);
    sinon.stub(commonChartUtils, 'getChangeDirection').returns(changeDirection);
  });

  afterEach(function() {
    sinon.restore();
  });

  it('return an empty object by default', function() {
    const actual = getKpiCardFactory(kpiConfig).resultFunc();
    const expected = {};
    expect(actual).to.deep.equal(expected);
  });

  it('returns an empty object if the kpi name is not found', function() {
    const actual = getKpiCardFactory(kpiConfig).resultFunc({});
    const expected = {};
    expect(actual).to.deep.equal(expected);
  });

  it('returns the correct value for the kpi name', function() {
    const foo = {
      curr: {
        effectiveEndDate: faker.date.recent(),
        isEstimated: faker.random.boolean(),
        value: faker.random.number()
      },
      prev: {
        effectiveEndDate: faker.date.past(),
        isEstimated: faker.random.boolean(),
        value: faker.random.number()
      },
      comparisonRange: {
        primaryRangeEnd: moment(faker.date.recent()),
        secondaryRangeEnd: moment(faker.date.past())
      }
    };
    const bar = {
      curr: {
        effectiveEndDate: faker.date.recent(),
        isEstimated: faker.random.boolean(),
        value: faker.random.number()
      },
      prev: {
        effectiveEndDate: faker.date.past(),
        isEstimated: faker.random.boolean(),
        value: faker.random.number()
      },
      comparisonRange: {
        primaryRangeEnd: moment(faker.date.recent()),
        secondaryRangeEnd: moment(faker.date.past())
      }
    };

    const actual = getKpiCardFactory(kpiConfig).resultFunc({
      [kpiConfig.monthly.key]: foo,
      bar
    });
    const expected = {
      changeDirection,
      changeDate: {
        current: foo.comparisonRange.primaryRangeEnd.format("MMM 'YY"),
        previous: foo.comparisonRange.secondaryRangeEnd.format("MMM 'YY"),
        format: "MMM 'YY"
      },
      isEstimated: foo.curr.isEstimated || foo.prev.isEstimated,
      percentChange,
      value: _.round(foo.curr.value, 2),
      comparisonValue: foo.prev.value
    };
    expect(actual).to.deep.equal(expected);
  });
});
