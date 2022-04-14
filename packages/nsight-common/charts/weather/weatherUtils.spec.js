import { expect } from 'chai';
import faker from 'faker';

import { TEMPERATURE_EXTREME_TYPES } from './weatherConstants';
import weatherUtils from './weatherUtils';

describe('nsight-facility-overview/helpers/weatherUtils', function() {
  describe('setInitialWeatherView', function() {
    context('when passed a month number', function() {
      it('returns default view as Low if in the winter months', function() {
        const month = faker.random.arrayElement([10, 11, 12, 1, 2, 3]);

        const expectedView = TEMPERATURE_EXTREME_TYPES.LOW;
        expect(weatherUtils.getInitialWeatherView(month)).to.deep.equal(
          expectedView
        );
      });

      it('returns default view as High if in the summer months', function() {
        const month = faker.random.arrayElement([4, 5, 6, 7, 8, 9]);

        const expectedView = TEMPERATURE_EXTREME_TYPES.HIGH;
        expect(weatherUtils.getInitialWeatherView(month)).to.deep.equal(
          expectedView
        );
      });
    });
  });
});
