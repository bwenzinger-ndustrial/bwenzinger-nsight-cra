import { expect } from 'chai';
import queryString from 'qs';
import sinon from 'sinon';

import getSearchString from './getSearchString';

describe('nsight-dashboard/helpers/getSearchString', function() {
  let defaultSearch;
  let parseSpy;
  let stringifySpy;

  const defaultParams = {
    facility: 'mock_facility',
    organization: 'mock_organization',
    kpi: 'mock_kpi'
  };

  beforeEach(function() {
    defaultSearch = queryString.stringify(defaultParams);
    parseSpy = sinon.spy(queryString, 'parse');
    stringifySpy = sinon.spy(queryString, 'stringify');
  });
  
  afterEach(function() {
    sinon.restore();
  });

  context('called with only a search string', function() {
    it('calls qs.parse with the correct args', function() {
      getSearchString({ searchString: defaultSearch });
      expect(parseSpy).to.have.been.calledOnceWithExactly(defaultSearch, {
        ignoreQueryPrefix: true
      });
    });

    it('calls qs.stringify with the correct args', function() {
      getSearchString({ searchString: defaultSearch });
      expect(stringifySpy).to.have.been.calledOnceWithExactly(defaultParams);
    });

    it('returns the original search string by default', function() {
      const actual = getSearchString({ searchString: defaultSearch });
      const expected =
        'facility=mock_facility&organization=mock_organization&kpi=mock_kpi';
      expect(actual).to.equal(expected);
    });
  });

  context('called with addParams', function() {
    it('returns a search string with params added', function() {
      const addedParams = { foo: 'bar' };
      const actual = getSearchString({
        searchString: defaultSearch,
        addParams: addedParams
      });
      const expected =
        'facility=mock_facility&organization=mock_organization&kpi=mock_kpi&foo=bar';
      expect(actual).to.equal(expected);
    });

    it('returns a search string with params replaced', function() {
      const addedParams = { facility: 'new_mock_facility' };
      const actual = getSearchString({
        searchString: defaultSearch,
        addParams: addedParams
      });
      const expected =
        'facility=new_mock_facility&organization=mock_organization&kpi=mock_kpi';
      expect(actual).to.equal(expected);
    });

    it('returns a search string with null and false param values', function() {
      const addedParams = { facility: false, organization: null };
      const actual = getSearchString({
        searchString: defaultSearch,
        addParams: addedParams
      });
      const expected = 'facility=false&organization=&kpi=mock_kpi';
      expect(actual).to.equal(expected);
    });
  });

  context('called with removeParams', function() {
    it('returns a search string with params removed', function() {
      const removedParams = ['kpi'];
      const actual = getSearchString({
        searchString: defaultSearch,
        removeParams: removedParams
      });
      const expected = 'facility=mock_facility&organization=mock_organization';
      expect(actual).to.equal(expected);
    });

    it('ignores spurious params', function() {
      const removedParams = ['foo'];
      const actual = getSearchString({
        searchString: defaultSearch,
        removeParams: removedParams
      });
      const expected =
        'facility=mock_facility&organization=mock_organization&kpi=mock_kpi';
      expect(actual).to.equal(expected);
    });
  });

  context('called with addParams and removeParams', function() {
    it('remove params before adding new ones', function() {
      const removedParams = ['facility'];
      const addedParams = { facility: 'new_mock_facility' };
      const actual = getSearchString({
        searchString: defaultSearch,
        addParams: addedParams,
        removeParams: removedParams
      });
      const expected =
        'organization=mock_organization&kpi=mock_kpi&facility=new_mock_facility';
      expect(actual).to.equal(expected);
    });
  });
});
