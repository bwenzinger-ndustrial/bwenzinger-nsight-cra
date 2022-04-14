import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MenuItem from '../MenuItem';
import AccordionArrow from './AccordionArrow';
import FacilityList from './FacilityList';

const propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  facilities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  facilityCount: PropTypes.number.isRequired,
  openGroupingIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number,
  name: PropTypes.string.isRequired
};

const Item = styled(MenuItem)`
  ${AccordionArrow} {
    margin-right: 10px;
  }
`;

function GroupingItem(props) {
  const {
    children,
    facilityCount,
    facilities,
    openGroupingIds,
    id,
    level = 0,
    name
  } = props;
  const isOpen = openGroupingIds.indexOf(id) !== -1;
  const nextLevel = level + 1;

  return facilityCount > 0 ? (
    <Fragment>
      <Item level={level} name={name} value={{ id, type: 'grouping' }}>
        <AccordionArrow isOpen={isOpen} level={level} />
        {name} ({facilityCount})
      </Item>

      {isOpen && (
        <Fragment>
          {children.map((childGrouping) => {
            return (
              <GroupingItem
                {...childGrouping}
                openGroupingIds={openGroupingIds}
                key={childGrouping.id}
                level={nextLevel}
              />
            );
          })}

          {facilities.length > 0 && (
            <FacilityList facilities={facilities} level={nextLevel} />
          )}
        </Fragment>
      )}
    </Fragment>
  ) : null;
}

GroupingItem.propTypes = propTypes;

export { GroupingItem };
export default GroupingItem;
