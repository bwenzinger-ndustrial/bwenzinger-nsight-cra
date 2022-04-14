import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { SecondaryButton } from '@ndustrial/nd-button-react';
import {
  getSelectedFacility,
  getSelectedOrganization
} from '@ndustrial/nsight-common/selectors';

import ProjectModal from '../components/projects/ProjectModal';
import ProjectsTable from '../components/projects/ProjectsTable';
import DateUnits from '../constants/DateUnits';
import {
  getOrgUsers,
  getProjectsByOrgId,
  setActiveProject
} from '../redux/projects/actions';

const StyledSecondaryButton = styled(SecondaryButton)`
  height: 40px;
  width: 200px;
  margin-top: 0;
  margin-bottom: 10px;
  background-color: #fff;
`;

const Wrapper = styled.div`
  background-color: #e3e3e3;
  padding: 10px;
  flex-grow: 1;
  flex-shrink: 0;
`;

const ProjectsContainer = () => {
  const selectedFacility = useSelector(getSelectedFacility);
  const selectedOrganization = useSelector(getSelectedOrganization);
  const activeProject = useSelector((state) => state.projects.activeProject);
  const [isNewProject, setIsNewProject] = useState(false);

  const [projectModalIsOpen, setProjectModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  const fetchProjects = useCallback(() => {
    if (selectedOrganization) {
      dispatch(getProjectsByOrgId(selectedOrganization.slug));
    }
  }, [dispatch, selectedOrganization]);

  // Will only fire if selectedOrganization changes, causing fetchProjects to change
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const fetchOrgUsers = useCallback(() => {
    if (selectedOrganization) {
      dispatch(getOrgUsers(selectedOrganization.id));
    }
  }, [dispatch, selectedOrganization]);

  // Will only fire if selectedOrganization changes
  useEffect(() => {
    fetchOrgUsers();
  }, [fetchOrgUsers]);

  useEffect(() => {
    if (activeProject) setProjectModalIsOpen(true);
    else setProjectModalIsOpen(false);
  }, [activeProject]);

  return (
    <Wrapper>
      <StyledSecondaryButton
        onClick={() => {
          setIsNewProject(true);
          dispatch(
            setActiveProject({
              monetarySavingsUnit: DateUnits.YEAR,
              energySavingsUnit: 'kwh',
              energySavingsTimeUnit: DateUnits.YEAR,
              facility_id: selectedFacility ? selectedFacility.id : null,
              files: []
            })
          );
        }}
      >
        New Project
      </StyledSecondaryButton>
      <ProjectModal
        selectedFacility={selectedFacility}
        selectedOrganization={selectedOrganization}
        setIsOpen={setProjectModalIsOpen}
        isOpen={projectModalIsOpen}
        isNewProject={isNewProject}
      />
      <ProjectsTable
        selectedFacility={selectedFacility}
        onRowClicked={() => setIsNewProject(false)}
      />
    </Wrapper>
  );
};

export default ProjectsContainer;
