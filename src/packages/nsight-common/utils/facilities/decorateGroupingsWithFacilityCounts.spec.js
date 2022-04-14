import { expect } from 'chai';
import faker from 'faker';
import { chunk, uniqBy } from 'lodash';

import { fixtures } from '@ndustrial/nsight-test-utils';

import {
  decorateGroupingsWithFacilityCounts,
  getFacilityCount
} from './decorateGroupingsWithFacilityCounts';

describe('nsight-common/utils/facilities/decorateGroupingsWithFacilityCounts', function() {
  describe('decorateGroupingsWithFacilityCounts', function() {
    it('adds a nested facility count to the groupings', function() {
      const facilityList = uniqBy(
        fixtures.buildList(
          'facility',
          faker.random.number({ min: 10, max: 20 })
        )
      );
      const facilityChunks = chunk(
        facilityList,
        Math.ceil(facilityList.length / 3)
      );

      const filteredFacilityGroupings = decorateGroupingsWithFacilityCounts([
        {
          children: [
            {
              children: [
                {
                  children: [],
                  facilities: facilityChunks[2]
                }
              ],
              facilities: facilityChunks[1]
            }
          ],
          facilities: facilityChunks[0]
        }
      ]);

      expect(filteredFacilityGroupings[0].facilityCount).to.equal(
        facilityList.length
      );
    });
  });

  describe('getFacilityCount', function() {
    it('gets a count of all facilities in the tree', function() {
      const facilityList = fixtures.buildList(
        'facility',
        faker.random.number({ min: 5, max: 20 })
      );
      const facilityChunks = chunk(
        facilityList,
        Math.ceil(facilityList.length / 3)
      );

      const facilityCount = getFacilityCount({
        children: [
          {
            children: [
              {
                children: [],
                facilities: facilityChunks[2]
              }
            ],
            facilities: facilityChunks[1]
          }
        ],
        facilities: facilityChunks[0]
      });

      expect(facilityCount).to.equal(facilityList.length);
    });
  });
});
