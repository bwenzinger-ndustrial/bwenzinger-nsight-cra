import { expect } from 'chai';
import faker from 'faker';
import { times } from 'lodash';

import { sortByWithNull } from './sort';

describe('nsight-portfolio-dashboard/helpers/sort', function() {
  describe('sortByWithNull', function() {
    let key;
    let unsorted;

    beforeEach(function() {
      key = faker.hacker.adjective();
      unsorted = times(50, () => ({ [key]: faker.random.number() }));
    });

    it('sorts numbers in ascending order by default', function() {
      const sorted = sortByWithNull(unsorted, key);
      expect(sorted).to.be.ascendingBy(key);
    });

    it('sorts numbers in ascending order', function() {
      const sorted = sortByWithNull(unsorted, key, 'asc');
      expect(sorted).to.be.ascendingBy(key);
    });

    it('sorts numbers in descending order', function() {
      const sorted = sortByWithNull(unsorted, key, 'desc');
      expect(sorted).to.be.descendingBy(key);
    });

    it('places null items at the end of the array', function() {
      const unsortedNulls = [{ [key]: null }, { [key]: null }, { [key]: null }];
      const sorted = sortByWithNull(
        faker.helpers.shuffle([...unsorted, ...unsortedNulls]),
        key
      );

      const sortedWithoutNulls = sorted.slice(
        0,
        sorted.length - unsortedNulls.length
      );
      const nulls = sorted.slice(unsortedNulls.length * -1);

      expect(sortedWithoutNulls).to.be.ascendingBy(key);

      nulls.forEach((val) => expect(val[key]).to.be.null());
    });
  });
});
