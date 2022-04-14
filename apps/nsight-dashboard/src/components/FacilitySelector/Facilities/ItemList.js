import React, { Fragment } from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Grouping from './Grouping';

const propTypes = {
  groupings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ),
  openGroupingIds: PropTypes.array
};

const FacilitiesMessage = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  font-size: ${rem('10px')};
  font-weight: 700;
  line-height: 1.2;
  padding: 10px;
`;

function ItemList({ groupings = [], openGroupingIds }) {
  if (!groupings.length) {
    return <FacilitiesMessage>No facilities available</FacilitiesMessage>;
  }

  return (
    <Fragment>
      {groupings.map((grouping) => {
        return grouping.facilityCount > 0 ? (
          <Grouping
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
