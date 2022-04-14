import React, { Fragment } from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { facilityUtils } from '@ndustrial/nsight-common/utils';

import GroupingItem from './GroupingItem';

const propTypes = {
  groupings: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.array.isRequired,
      facilities: PropTypes.array.isRequired,
      id: PropTypes.string.isRequired
    })
  ),
  openGroupingIds: PropTypes.array
};

const FacilitiesMessage = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  font-size: ${rem('12px')};
  font-weight: 700;
  line-height: 1.2;
  padding: 10px;
`;

function ItemList({ groupings = [], openGroupingIds }) {
  const decoratedGroupings = facilityUtils.decorateGroupingsWithFacilityCounts(
    groupings
  );

  if (!decoratedGroupings.length) {
    return <FacilitiesMessage>No facilities available</FacilitiesMessage>;
  }

  return (
    <Fragment>
      {decoratedGroupings.map((grouping) => {
        return grouping.facilityCount > 0 ? (
          <GroupingItem
            {...grouping}
            openGroupingIds={openGroupingIds}
            key={grouping.id}
          />
        ) : null;
      })}
    </Fragment>
  );
}

ItemList.propTypes = propTypes;

export default ItemList;
