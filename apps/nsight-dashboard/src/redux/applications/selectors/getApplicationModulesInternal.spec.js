import { expect } from 'chai';
import faker from 'faker';

import { fixtures } from '@ndustrial/nsight-test-utils';

import getApplicationModulesInternal from './getApplicationModulesInternal';

describe('nsight-dashboard/redux/applications/selectors/getApplicationModulesInternal', function() {
  let internalModules;
  let externalModules;
  let modules;

  beforeEach(function() {
    internalModules = fixtures.buildList(
      'applicationModule',
      faker.random.number({ min: 1, max: 5 }),
      {
        externalLink: ''
      }
    );
    externalModules = fixtures.buildList(
      'applicationModule',
      faker.random.number({ min: 1, max: 5 })
    );
    modules = [...internalModules, ...externalModules];
  });

  it('returns a filtered list of application modules with a falsey externalLink attribute', function() {
    const actual = getApplicationModulesInternal.resultFunc(modules);
    const expected = internalModules;
    expect(actual).to.deep.equal(expected);
  });
});
