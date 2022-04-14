'use strict';

function getAllPaginatedResults(requestFn, options = {}) {
  const PAGE_LIMIT = options.limit || 1000;

  return requestFn({ limit: PAGE_LIMIT })
    .then((res) => {
      const recordsRequests = [Promise.resolve(res)];

      for (
        let offset = PAGE_LIMIT;
        offset <= res._metadata.totalRecords;
        offset = offset + PAGE_LIMIT
      ) {
        recordsRequests.push(requestFn({ offset, limit: PAGE_LIMIT }));
      }

      return Promise.all(recordsRequests);
    })
    .then((pages) =>
      pages.reduce((memo, page) => memo.concat(page.records), [])
    );
}

export default getAllPaginatedResults;
