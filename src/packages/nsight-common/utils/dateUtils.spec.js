import { expect } from 'chai';
import faker from 'faker';
import moment from 'moment';

import { validatePastDate } from './dateUtils';

describe('nsight-facility-overview/helpers/dateUtils', function() {
  describe('validatePastDate', function() {
    context('when passed a valid past date', function() {
      it('returns the date string passed as a moment object', function() {
        const pastDate = faker.date.past();
        const expectedDate = moment(pastDate);

        expect(validatePastDate(pastDate)).to.deep.equal(expectedDate);
      });
    });

    context('when passed a future date', function() {
      it('returns todays date as a moment object', function() {
        const futureDate = faker.date.future();
        const expectedDate = moment().format('MM/DD/YYYY');

        expect(validatePastDate(futureDate).format('MM/DD/YYYY')).to.equal(
          expectedDate
        );
      });
    });

    context('when not passed a date string', function() {
      it('returns null', function() {
        const notADate = faker.random.word();

        expect(validatePastDate(notADate)).to.be.null();
      });
    });
  });
});
