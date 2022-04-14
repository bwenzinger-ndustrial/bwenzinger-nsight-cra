import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  getFacilities,
  getFacilityGroupings
} from '@ndustrial/nsight-common/selectors';

import { baseInputStyles } from '../../constants/WizardTextStyles';
import FacilityGroupings from './FacilityGroupings';
import FacilityListWithArrowNavigation from './FacilityListWithArrowNavigation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${baseInputStyles}
`;

const SearchContainer = styled.div`
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
  justify-content: space-between;
  width: 100%;
`;

const ScrollableItems = styled.div`
  flex: 1;
  overflow-y: auto;
  border: 1px solid #f1f1f1;
  background-color: #fbfbfb;
`;

const propTypes = {
  selectedFacilityId: PropTypes.number,
  className: PropTypes.string
};

// Passing down onSelectFacility callback with rest props
const FacilitySelection = ({ selectedFacilityId, className, ...rest }) => {
  const facilities = useSelector(getFacilities);
  const facilityGroupings = useSelector(getFacilityGroupings);
  const [isFiltered, setIsFiltered] = useState(false);

  const onChange = useCallback((value) => {
    value ? setIsFiltered(true) : setIsFiltered(false);
  }, []);

  return (
    <Container className={className}>
      <SearchContainer>
        <FacilityListWithArrowNavigation
          facilities={facilities}
          selectedFacilityId={selectedFacilityId}
          onChange={onChange}
          {...rest}
        />
      </SearchContainer>

      {/* Otherwise, display the grouping/facility tree */}
      {!isFiltered && (
        <ScrollableItems>
          <FacilityGroupings
            selectedFacilityId={selectedFacilityId}
            facilityGroupings={facilityGroupings}
            {...rest}
          />
        </ScrollableItems>
      )}
    </Container>
  );
};

FacilitySelection.propTypes = propTypes;
export default FacilitySelection;
