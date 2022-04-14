import React, { useMemo, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { SecondaryButton } from '@ndustrial/nd-button-react';
import { DocumentAdd as DocumentAddIcon } from '@ndustrial/nd-icons-svg';
import { InputLabel } from '@ndustrial/nd-inputs-react';

import FILE_UPLOAD_STATUSES from '../../constants/FileUploadStatus';
import { addFiles } from '../../redux/projects/actions';
import { baseInputStyles } from './constants/WizardTextStyles';
import FileUploadItem from './FileUploadItem';

const propTypes = {
  setComplete: PropTypes.func,
  selectedOrganization: PropTypes.object,
  idx: PropTypes.number
};

const acceptedFileTypes =
  'image/*, text/plain, .pdf, .csv, .xls, .xlsx, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .zip';

const FileWrapper = styled.div`
  border-width: 1px;
  border-style: ${(props) =>
    props.isDragAccept || props.isDragActive || props.isDragReject
      ? 'dashed'
      : 'solid'};
  border-color: ${(props) => getColor(props)};
  border-radius: ${(props) =>
    props.isDragAccept || props.isDragActive || props.isDragReject
      ? '5px'
      : ''};
  flex: 1;
  margin-top: 10px;
  overflow: auto;
`;

const Wrapper = styled.div`
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  justify-self: center;
  margin: 15px auto 0;
  max-width: clamp(300px, 75%, 500px);
  ${baseInputStyles}
`;

const UploadFileButton = styled(SecondaryButton)`
  margin-top: 10px;
`;

const ActionsFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const ProjectFileUpload = ({ setComplete, selectedOrganization, idx }) => {
  const activeProject = useSelector((state) => state.projects.activeProject);
  const dispatch = useDispatch();
  const inputButtonRef = useRef(null);

  const files = useMemo(() => {
    let allFiles = [];
    if (activeProject.files) {
      allFiles = [
        ...allFiles,
        ...activeProject.files.map((f) => ({
          ...f,
          status: FILE_UPLOAD_STATUSES.COMPLETE
        }))
      ];
    }
    if (activeProject.newFiles) {
      allFiles = [...allFiles, ...activeProject.newFiles];
    }

    return allFiles;
  }, [activeProject.files, activeProject.newFiles]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: acceptedFileTypes,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length === 0) {
        acceptedFiles.forEach((file) => {
          file.status = FILE_UPLOAD_STATUSES.NEEDS_TO_UPLOAD;
          file.tempId = uuidv4();
        });

        dispatch(addFiles(acceptedFiles));
      } else {
        NotificationManager.error(
          'One or more file types not allowed',
          'File Upload Error'
        );
      }
    }
  });

  const onAddFileClick = () => {
    inputButtonRef.current.click();
  };

  return (
    <Wrapper>
      <InputLabel>Project Files</InputLabel>
      <FileWrapper
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        {files.map((file, index) => (
          <FileUploadItem
            key={file.id || file.tempId}
            file={file}
            isEvenItem={index % 2 === 0}
            selectedOrganization={selectedOrganization}
          />
        ))}
      </FileWrapper>
      <ActionsFooter>
        {/* this input button is hidden */}
        <input type="file" {...getInputProps()} ref={inputButtonRef} />
        <UploadFileButton
          type="button"
          icon={<DocumentAddIcon />}
          onClick={onAddFileClick}
        >
          Add File
        </UploadFileButton>
      </ActionsFooter>
    </Wrapper>
  );
};

ProjectFileUpload.propTypes = propTypes;

export default ProjectFileUpload;
