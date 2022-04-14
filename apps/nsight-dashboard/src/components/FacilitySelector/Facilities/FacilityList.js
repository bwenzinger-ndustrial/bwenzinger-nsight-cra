import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FacilityItem from './FacilityItem';

const propTypes = {
  facilities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      level: PropTypes.number,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  ).isRequired,
  highlightedIndex: PropTypes.number
};

const FacilitiesMessage = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #fff;
  font-size: ${rem('12px')};
  font-weight: 700;
  line-height: 1.2;
  padding: 10px;
`;

function FacilityList({ facilities, level, highlightedIndex }) {
  if (!facilities.length) {
    return <FacilitiesMessage>No matching facilities</FacilitiesMessage>;
  }

  return facilities.map((facility, index) => (
    <FacilityItem
      isHighlighted={index === highlightedIndex}
      id={facility.id}
      key={facility.slug}
      level={level}
      name={facility.name}
      slug={facility.slug}
    />
  ));
}

FacilityList.propTypes = propTypes;

export default FacilityList;
