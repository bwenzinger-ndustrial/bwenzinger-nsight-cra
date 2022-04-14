import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Search } from '@ndustrial/nd-icons-svg';
import { InputTextField } from '@ndustrial/nd-inputs-react';
import useListKeyboardListeners from '@ndustrial/nsight-common/hooks/useListKeyboardListeners';

import FacilityItem from './FacilityItem';

const propTypes = {
  facilities: PropTypes.array.isRequired,
  onSelectFacility: PropTypes.func.isRequired,
  selectedFacilityId: PropTypes.number,
  onChange: PropTypes.func
};

const Container = styled.div`
  overflow-y: auto;
`;

const StyledSearchBox = styled(InputTextField)`
  border-color: #f1f1f1;

  input {
    font-size: 0.9rem;
  }
`;

const SearchIcon = styled(Search)`
  cursor: pointer;
  stroke: ${({ theme }) => theme.colors.primary};
  height: 14px;
  width: 14px;
`;

const ScrollableItems = styled.div`
  flex: 1;
  overflow-y: auto;
  border: 1px solid #f1f1f1;
  background-color: #fbfbfb;
`;

const FacilityListWithArrowNavigation = ({
  facilities,
  onSelectFacility,
  selectedFacilityId,
  onChange
}) => {
  const [filteredValue, setFilteredValue] = useState('');
  const [mouseIsOverList, setMouseIsOverList] = useState(false);

  const searchRef = useRef();

  const filteredFacilities = useMemo(() => {
    return facilities.filter(
      (facility) =>
        facility.name.toLowerCase().indexOf(filteredValue.toLowerCase()) !== -1
    );
  }, [facilities, filteredValue]);

  useEffect(() => {
    setFilteredValue('');
    searchRef.current.value = '';
    onChange('');
  }, [selectedFacilityId, onChange]);

  const selectedIndex = useListKeyboardListeners(
    searchRef,
    filteredFacilities,
    (facility) => {
      searchRef.current.value = '';
      onSelectFacility(facility);
      setMouseIsOverList(false);
    }
  );

  return (
    <Container>
      <StyledSearchBox
        placeholder={'Search Facilities'}
        onChange={(e) => {
          setFilteredValue(e.target.value);
          onChange(e.target.value.trim().length);
        }}
        type={'text'}
        endIcon={<SearchIcon />}
        ref={searchRef}
      />
      {filteredValue && (
        <ScrollableItems
          onMouseEnter={() => setMouseIsOverList(true)}
          onMouseLeave={() => setMouseIsOverList(false)}
        >
          {filteredFacilities.map((filteredFacility, idx) => (
            <FacilityItem
              isFocused={mouseIsOverList ? false : selectedIndex === idx}
              key={filteredFacility.id}
              shouldShowSelected={false}
              {...filteredFacility}
              onSelectFacility={() => {
                onSelectFacility(filteredFacility);
                setMouseIsOverList(false);
              }}
              isSelected={selectedFacilityId === filteredFacility.id}
            >
              {filteredFacility.name}
            </FacilityItem>
          ))}
        </ScrollableItems>
      )}
    </Container>
  );
};

FacilityListWithArrowNavigation.propTypes = propTypes;

export default FacilityListWithArrowNavigation;
