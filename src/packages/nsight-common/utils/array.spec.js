import { expect } from 'chai';
import faker from 'faker';
import _ from 'lodash';

import { sortByName, sortByValue } from './array';

describe('nsight-common/helpers/array', function() {
  describe('sortByName', function() {
    let sortedArray;

    beforeEach(function() {
      const initialArray = _.times(
        faker.random.number({ min: 20, max: 50 }),
        () => {
          return {
            name: faker.random
              .arrayElement([
                faker.hacker.adjective(),
                faker.hacker.noun(),
                faker.hacker.phrase(),
                faker.lorem.word(),
                faker.lorem.words()
              ])
              .toLowerCase()
          };
        }
      );

      sortedArray = initialArray.sort(sortByName);
    });

    it('sorts an array of objects by their name property', function() {
      expect(sortedArray).to.be.ascendingBy('name');
    });
  });

  describe('sortByValue', function() {
    let sortedArray;

    beforeEach(function() {
      const initialArray = _.times(
        faker.random.number({ min: 20, max: 50 }),
        () => {
          return {
            value: faker.random.number({ min: 0, max: 500 })
          };
        }
      );

      sortedArray = initialArray.sort(sortByValue);
    });

    it('sorts an array of objects by their value property', function() {
      expect(sortedArray).to.be.ascendingBy('value');
    });
  });
});
