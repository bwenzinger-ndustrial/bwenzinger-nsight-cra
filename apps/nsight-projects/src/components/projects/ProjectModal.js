import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import ReactModal from '@ndustrial/nsight-common/components/Modal/ReactModal';
import SteppedFlow from '@ndustrial/nsight-common/components/SteppedFlow/SteppedFlow';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import projectConfig from '../../config/project';
import { addProject, updateProject } from '../../redux/projects/actions';

const propTypes = {
  className: PropTypes.string,
  selectedFacility: PropTypes.object,
  selectedOrganization: PropTypes.object,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  isNewProject: PropTypes.bool
};

const Form = styled.form`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const StyledSteppedFlow = styled(SteppedFlow)`
  flex: 1;
`;

const ProjectModal = ({
  className,
  selectedOrganization,
  isOpen,
  setIsOpen,
  isNewProject
}) => {
  const dispatch = useDispatch();
  const methods = useForm();
  const activeProject = useSelector((state) => state.projects.activeProject);

  function deleteUploadedFiles() {
    if (activeProject.newFiles && activeProject.newFiles.length) {
      Promise.all(
        activeProject.newFiles.map((file) => contxtSdk.files.delete(file.id))
      );
      // .then([results] => console.log(results))
      // .catch(err => console.log(err)); // TODO we should maybe just re-try here until it works?
    }
  }

  useEffect(() => {
    if (isOpen && activeProject.isDirty) {
      // prevent window close
      window.onbeforeunload = (e) => {
        // Cancel the event
        e.preventDefault();
        // return something to trigger a dialog
        return '';
      };

      // when the window is actually closed, clean up the files which aren't needed anymore
      window.onunload = (e) => {
        deleteUploadedFiles();
      };
    } else {
      window.onbeforeunload = null;
      window.onunload = null;
    }
  }, [isOpen, activeProject]); // eslint-disable-line react-hooks/exhaustive-deps

  function onRequestClose() {
    // deep object comparison between the activeProject prop and current _project
    if (activeProject.isDirty) {
      const result = window.confirm(
        'You have unsaved changes. \n \n Are you sure you want to leave this page?'
      );
      if (result) {
        setIsOpen(false);
        deleteUploadedFiles();
      }
    } else {
      setIsOpen(false);
    }
  }

  const onSubmit = (isDraft) => {
    const formattedData = {
      ...activeProject,
      files: [...activeProject.files, ...activeProject.newFiles],
      isDraft: isDraft
    };

    delete formattedData.newFiles;
    delete formattedData.isDirty;

    let saveAction = contxtSdk.nsightProjects.updateProject;
    let saveDispatch = updateProject;

    if (!formattedData.slug) {
      formattedData.slug = uuidv4();
      saveAction = contxtSdk.nsightProjects.createProject;
      saveDispatch = addProject;
    }

    // TODO, remove once facility selection is implemented
    if (!formattedData.facility_id) {
      formattedData.facility_id = 27;
    }

    saveAction(selectedOrganization.id, formattedData)
      .then((result) => {
        dispatch(saveDispatch(result));
        setIsOpen(false);
        NotificationManager.success(
          'Project has been saved successfully',
          'Success'
        );
      })
      .catch(() => {
        NotificationManager.error('Project failed to save', 'Failure');
      });
  };

  /**
   * We don't need the form provider.  I've placed it here in case we want to treat
   * the whole project definition modal as one form
   */
  return (
    <ReactModal
      className={className}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title={isNewProject ? 'New Project' : 'Edit Project'}
    >
      {activeProject && (
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit((data) => null)}>
            <StyledSteppedFlow
              steps={projectConfig.steps}
              isNewFlow={!activeProject.slug}
              onSubmit={() => onSubmit(true)}
              selectedOrganization={selectedOrganization}
            />
          </Form>
        </FormProvider>
      )}
    </ReactModal>
  );
};

ProjectModal.propTypes = propTypes;

export default ProjectModal;
