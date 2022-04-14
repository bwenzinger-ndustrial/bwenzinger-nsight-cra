import { expect } from 'chai';
import faker from 'faker';
import _ from 'lodash';

import { fixtures } from '@ndustrial/nsight-test-utils';

import {
  defaultApplicationConfig,
  getDefaultApplicationRoute,
  getRoute,
  ROUTE_DEFAULT,
  routeConfig
} from './routeService';

describe('nsight-dashboard/services/routeService', function() {
  describe('getRoute', function() {
    it('returns the default route if there is no matching slug', function() {
      const actual = getRoute('foo');
      const expected = ROUTE_DEFAULT;
      expect(actual).to.deep.equal(expected);
    });

    it('returns a matching route config object', function() {
      Object.keys(routeConfig).forEach((slug) => {
        const actual = getRoute(slug);
        const expected = routeConfig[slug];
        expect(actual).to.deep.equal(expected);
      });
    });
  });

  describe('getDefaultApplicationRoute', function() {
    context('when there is a default application config', function() {
      let applicationRoute;
      let expectedRoute;
      let organizationSlug;

      beforeEach(function() {
        organizationSlug = faker.random.arrayElement(
          Object.keys(defaultApplicationConfig)
        );

        const applicationGroupings = [
          ...fixtures.buildList(
            'applicationGrouping',
            faker.random.number({ min: 1, max: 4 })
          ),
          fixtures.build('applicationGrouping', {
            applicationModules: [
              fixtures.build('applicationModule', {
                slug: defaultApplicationConfig[organizationSlug]
              })
            ]
          })
        ];

        expectedRoute =
          routeConfig[defaultApplicationConfig[organizationSlug]].path;

        applicationRoute = getDefaultApplicationRoute(
          applicationGroupings,
          organizationSlug
        );
      });

      it('returns the route for the default application', function() {
        expect(applicationRoute).to.equal(expectedRoute);
      });
    });

    context('when the groupings include portfolio dashboard', function() {
      let applicationRoute;
      let expectedRoute;
      let organizationSlug;

      beforeEach(function() {
        organizationSlug = fixtures.build('organization').slug;

        const applicationGroupings = [
          ...fixtures.buildList(
            'applicationGrouping',
            faker.random.number({ min: 1, max: 4 })
          ),
          fixtures.build('applicationGrouping', {
            applicationModules: [
              fixtures.build('applicationModule', {
                slug: '@ndustrial/nsight-portfolio-dashboard'
              })
            ]
          })
        ];

        expectedRoute =
          routeConfig['@ndustrial/nsight-portfolio-dashboard'].path;

        applicationRoute = getDefaultApplicationRoute(
          applicationGroupings,
          organizationSlug
        );
      });

      it('returns the route for portfolio dashboard', function() {
        expect(applicationRoute).to.equal(expectedRoute);
      });
    });

    context('when the groupings include portfolio dashboard', function() {
      let applicationRoute;
      let expectedRoute;
      let organizationSlug;

      beforeEach(function() {
        organizationSlug = fixtures.build('organization').slug;

        const applicationGroupings = _.times(10, () => {
          return fixtures.build('applicationGrouping', {
            applicationModules: fixtures
              .buildList(
                'applicationModule',
                faker.random.number({ min: 1, max: 5 })
              )
              .filter(
                ({ slug }) => slug !== '@ndustrial/nsight-portfolio-dashboard'
              )
          });
        });

        expectedRoute =
          /* eslint-disable-next-line standard/computed-property-even-spacing */
          routeConfig[
            _.chain(applicationGroupings)
              .map(({ applicationModules }) => applicationModules)
              .flatten()
              .map(({ slug }) => slug)
              .value()[0]
          ].path;

        applicationRoute = getDefaultApplicationRoute(
          applicationGroupings,
          organizationSlug
        );
      });

      it('returns the route for the first application module of the first application grouping', function() {
        expect(applicationRoute).to.equal(expectedRoute);
      });
    });
  });
});
