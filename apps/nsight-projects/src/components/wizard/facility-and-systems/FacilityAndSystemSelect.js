import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { InputLabel } from '@ndustrial/nd-inputs-react';
import {
  getFacilities,
  getSelectedFacility
} from '@ndustrial/nsight-common/selectors';

import { updateActiveProject } from '../../../redux/projects/actions';
import FacilitySelection from './Facility/FacilitySelection';
// import Systems from './SystemSelection';

const propTypes = {
  setComplete: PropTypes.func,
  idx: PropTypes.number
};

const selectedFacilityMarginTop = 10;

const Container = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  justify-content: center;
`;

const StyledFacilitySelection = styled(FacilitySelection)`
  max-width: 350px;
  margin-right: 1.5rem;
`;

// const StyledSystems = styled(Systems)`
//   max-width: 350px;
// `;

const SelectedFacilitiesWrapper = styled.div`
  flex: 1;
  max-width: 350px;
`;

const SelectedFacilities = styled.div`
  overflow-y: auto;
  border: 1px solid #f1f1f1;
  background-color: #fbfbfb;
  padding: 10px;
  margin-top: ${selectedFacilityMarginTop}px;
`;

const FacilityAndSystemSelect = ({ setComplete, idx }) => {
  const activeProject = useSelector((state) => state.projects.activeProject);
  const dispatch = useDispatch();
  const selectedFacility = useSelector(getSelectedFacility);
  const facilities = useSelector(getFacilities);

  const onSelectFacility = (facility) =>
    dispatch(updateActiveProject({ facility_id: facility.id }));

  // const onUpdateSystems = (facilitySystems) => onUpdate({ facilitySystems });

  let id = activeProject.facility_id;

  if (!id && selectedFacility) {
    id = selectedFacility.id;
  }

  let facilityName = selectedFacility?.name;

  if (activeProject.facility_id) {
    facilityName = facilities.find((x) => x.id === activeProject.facility_id)
      ?.name;
  }

  return (
    <Container>
      <StyledFacilitySelection
        selectedFacilityId={id}
        onSelectFacility={onSelectFacility}
      />
      <SelectedFacilitiesWrapper>
        <InputLabel>Selected Facility</InputLabel>
        <SelectedFacilities>{facilityName}</SelectedFacilities>
      </SelectedFacilitiesWrapper>
      {/* <StyledSystems
        onUpdate={onUpdateSystems}
        systemValues={activeProject.facilitySystems}
      /> */}
    </Container>
  );
};

FacilityAndSystemSelect.propTypes = propTypes;

export default FacilityAndSystemSelect;
