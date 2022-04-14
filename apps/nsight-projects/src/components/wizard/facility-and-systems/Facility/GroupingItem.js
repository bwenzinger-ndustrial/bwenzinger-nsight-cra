import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ChevronDown } from '@ndustrial/nd-icons-svg';

import FacilityItem from './FacilityItem';
import { ListItem } from './styled/ListItem';

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
  level: PropTypes.number,
  name: PropTypes.string.isRequired,
  hasSelectedFacility: PropTypes.bool.isRequired,
  selectedFacilityId: PropTypes.number,
  onSelectFacility: PropTypes.func.isRequired
};

const ITEM_PADDING = 1;
const ARROW_WIDTH = 1;
const ARROW_MARGIN = 0.5;

const GroupItems = styled.div`
  position: relative;
`;

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const AccordionArrow = styled.span`
  display: inline-block;
  transition: transform 0.1s linear;
  transform: rotateZ(${({ isOpen }) => (isOpen ? 0 : -90)}deg);
`;

const GroupLabelItem = styled(ListItem)`
  padding-left: ${({ level }) => level * ITEM_PADDING + 0.5}rem;

  ${AccordionArrow} {
    width: ${ARROW_WIDTH}rem;
    margin-right: ${ARROW_MARGIN}rem;
  }
`;

const StyledFacilityItem = styled(FacilityItem)`
  padding-left: ${({ level }) =>
    level * ITEM_PADDING +
    (ITEM_PADDING / 2 + ARROW_WIDTH + ARROW_MARGIN + 0.5)}rem;
`;

function GroupingItem(props) {
  const {
    children,
    facilityCount,
    hasSelectedFacility,
    selectedFacilityId,
    onSelectFacility,
    facilities,
    level = 0,
    name
  } = props;
  const nextLevel = level + 1;

  const [isOpen, setIsOpen] = useState(hasSelectedFacility);

  return facilityCount > 0 ? (
    <Container>
      <GroupLabelItem
        level={level}
        htmlName={name}
        onClick={() => setIsOpen(!isOpen)}
      >
        <AccordionArrow isOpen={isOpen} level={level}>
          <ChevronDown />
        </AccordionArrow>
        {name} ({facilityCount})
      </GroupLabelItem>

      {isOpen && (
        <GroupItems>
          {children.map((childGrouping) => {
            return (
              <GroupingItem
                {...childGrouping}
                key={childGrouping.id}
                level={nextLevel}
                onSelectFacility={onSelectFacility}
                selectedFacilityId={selectedFacilityId}
              />
            );
          })}

          {facilities.length > 0 &&
            facilities.map((facility) => (
              <StyledFacilityItem
                level={level}
                key={facility.id}
                {...facility}
                onSelectFacility={() => onSelectFacility(facility)}
                isSelected={selectedFacilityId === facility.id}
              >
                {facility.name}
              </StyledFacilityItem>
            ))}
        </GroupItems>
      )}
    </Container>
  ) : null;
}

GroupingItem.propTypes = propTypes;

export { GroupingItem };
export default GroupingItem;
