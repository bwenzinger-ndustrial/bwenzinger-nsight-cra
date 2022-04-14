import { expect } from 'chai';

import { fixtures } from '@ndustrial/nsight-test-utils';

import getApplicationModules from './getApplicationModules';

describe('nsight-dashboard/redux/applications/selectors/getApplicationModules', function() {
  let grouping0;
  let grouping1;
  let groupings;
  let modules;

  beforeEach(function() {
    modules = fixtures.buildList('applicationModule', 4);
    grouping0 = fixtures.build('applicationGrouping', {
      applicationModules: [modules[0], modules[1]]
    });
    grouping1 = fixtures.build('applicationGrouping', {
      applicationModules: [modules[2], modules[3]]
    });
    groupings = [grouping0, grouping1];
  });

  it('returns a flattened list of application modules from a list of application groupings', function() {
    const actual = getApplicationModules.resultFunc(groupings);
    const expected = modules;
    expect(actual).to.deep.equal(expected);
  });
});
