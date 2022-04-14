import { expect } from 'chai';
import faker from 'faker';
import _ from 'lodash';
import sinon from 'sinon';

import getAllPaginatedResults from './getAllPaginatedResults';

describe('helpers/getAllPaginatedResults', function() {
  const PAGE_LIMIT = 1000;
  let requestFn;
  let expectedRecords;
  let promise;
  let totalPages;

  beforeEach(function() {
    expectedRecords = _.times(
      faker.random.number({ min: PAGE_LIMIT, max: PAGE_LIMIT * 10 }),
      () => ({ id: faker.random.uuid() })
    );
    totalPages = Math.ceil(expectedRecords.length / PAGE_LIMIT);

    requestFn = sinon.stub();
    _.times(totalPages, (i) => {
      requestFn.onCall(i).resolves({
        _metadata: {
          offset: i * PAGE_LIMIT,
          totalRecords: expectedRecords.length
        },
        records: expectedRecords.slice(
          i * PAGE_LIMIT,
          i * PAGE_LIMIT + PAGE_LIMIT
        )
      });
    });

    promise = getAllPaginatedResults(requestFn, { limit: PAGE_LIMIT });
  });

  afterEach(function() {
    sinon.restore();
  });

  it('invokes the requestFn to get the initial page of results', function() {
    expect(requestFn).to.be.calledWith({ limit: PAGE_LIMIT });
  });

  it('gets the remaining pages of results', function() {
    return promise.then(() => {
      _.times(totalPages, (pageIndex) => {
        // Exclude the first page, which is tested in the previous test case
        if (pageIndex !== 0) {
          expect(requestFn).to.be.calledWith({
            limit: PAGE_LIMIT,
            offset: PAGE_LIMIT * pageIndex
          });
        }
      });
    });
  });

  it('resolves with an array of all the records', function() {
    return expect(promise).to.be.fulfilled.and.to.eventually.deep.equal(
      expectedRecords
    );
  });
});
