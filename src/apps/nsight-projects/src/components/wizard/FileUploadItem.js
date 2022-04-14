import React, { useEffect, useRef } from 'react';
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { SecondaryButton } from '@ndustrial/nd-button-react';
import {
  Download as DownloadIcon,
  Trash as TrashIcon
} from '@ndustrial/nd-icons-svg';
import { Loader } from '@ndustrial/nd-loader-react';
import IconButton from '@ndustrial/nsight-common/components/IconButton';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import FILE_UPLOAD_STATUSES from '../../constants/FileUploadStatus';
import { removeFile, updateFile } from '../../redux/projects/actions';

const propTypes = {
  className: PropTypes.string,
  file: PropTypes.object,
  isEvenItem: PropTypes.bool,
  dataDispatch: PropTypes.func,
  selectedOrganization: PropTypes.object
};

const FileItem = styled.div`
  background-color: ${(props) => props.$backgroundColor};
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  display: flex;
  width: 100%;
`;

const FileItemText = styled.span`
  flex: 1;
`;

const FileItemActions = styled.div`
  margin: auto 0;
  flex: 0 0 80px;
  align-self: flex-end;
  height: 100%;
  display: flex;
`;

const IconSharedStyle = css`
  height: 20px;
  width: 20px;
  margin: auto 0;
  margin-left: 10px;
  margin-right: 10px;
`;

const StyledDownloadIcon = styled(DownloadIcon)`
  ${IconSharedStyle}
`;

const StyledTrashIcon = styled(TrashIcon)`
  ${IconSharedStyle}
`;

const StyledLoader = styled(Loader)`
  width: 100px;
`;

const StyledFailedButton = styled(SecondaryButton)`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 15px;
`;

const StyledUploadActionButton = styled(IconButton)`
  cursor: pointer;
  svg {
    stroke: ${({ theme }) => theme.colors.primary};
  }

  &:hover,
  &:focus {
    svg {
      stroke: #062d47;
    }
  }
`;

const StyledDeleteActionButton = styled(IconButton)`
  svg {
    stroke: #cd425b;
  }

  &:hover,
  &:focus {
    svg {
      stroke: #511520;
    }
  }
`;

const FileUploadItem = ({ file, isEvenItem, selectedOrganization }) => {
  const dispatch = useDispatch();
  const isUploading = useRef(false);

  useEffect(() => {
    if (
      file.status &&
      file.status === FILE_UPLOAD_STATUSES.NEEDS_TO_UPLOAD &&
      isUploading.current !== true
    ) {
      uploadFile(file);
    }
  }, [file.status]); // eslint-disable-line react-hooks/exhaustive-deps

  function uploadFile(file) {
    isUploading.current = true;

    contxtSdk.files
      .createAndUpload({
        data: file,
        metadata: {
          contentType: file.type,
          description: file.name,
          filename: file.name,
          organizationId: selectedOrganization.id
        }
      })
      .then((result) => {
        dispatch(updateFile(file, FILE_UPLOAD_STATUSES.COMPLETE, result.id));
      })
      .catch(() => {
        dispatch(updateFile(file, FILE_UPLOAD_STATUSES.FAILED));
      });
  }

  function retryUploadFile() {
    dispatch(updateFile(file, FILE_UPLOAD_STATUSES.NEEDS_TO_UPLOAD));
    uploadFile(file);
  }

  return (
    <FileItem $backgroundColor={isEvenItem ? '#fafafa' : 'transparent'}>
      <FileItemText>{`${file.name}`}</FileItemText>

      {file.status === FILE_UPLOAD_STATUSES.NEEDS_TO_UPLOAD && <StyledLoader />}
      {file.status === FILE_UPLOAD_STATUSES.COMPLETE && (
        <FileItemActions>
          <StyledUploadActionButton
            onClick={() => {
              contxtSdk.files
                .download(file.id)
                .then((file) => {
                  window.location.href = file.downloadInfo.attachmentUrl;
                })
                .catch((err) => {
                  NotificationManager.error(err.message, 'Download Error');
                });
            }}
          >
            <StyledDownloadIcon />
          </StyledUploadActionButton>
          <StyledDeleteActionButton
            onClick={() => {
              contxtSdk.files
                .delete(file.id)
                .then(() => {
                  dispatch(removeFile(file));
                })
                .catch((err) => {
                  NotificationManager.error(err.message, 'Deletion Error');
                });
            }}
          >
            <StyledTrashIcon />
          </StyledDeleteActionButton>
        </FileItemActions>
      )}
      {file.status === FILE_UPLOAD_STATUSES.FAILED && (
        <StyledFailedButton onClick={retryUploadFile}>
          Failed - Retry
        </StyledFailedButton>
      )}
    </FileItem>
  );
};

FileUploadItem.propTypes = propTypes;

export default FileUploadItem;
