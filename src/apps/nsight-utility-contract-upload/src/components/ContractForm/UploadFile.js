import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PrimaryButton, WarningButton } from '@ndustrial/nd-button-react';
import { Trash } from '@ndustrial/nd-icons-svg';

import { colors } from '../../common/constants.js';

const propTypes = {
  formMode: PropTypes.string,
  handleFileDrop: PropTypes.func.isRequired,
  handleQueuedFileClear: PropTypes.func.isRequired,
  queuedFile: PropTypes.object
};

const FilePreview = styled.aside`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${(queuedFile) => (queuedFile ? '2' : '-1')};
`;

const FilePreviewFrame = styled.iframe`
  display: block;
  height: 100%;
  width: 100%;
`;

const FileDropzone = styled.div`
  position: relative;
  margin-top: 10px;
  z-index: 0;
`;

const UploadFileActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Pdf = styled.div`
  width: 100%;
  height: 100%;
`;

const PdfUpload = styled.div`
  border: 1px dashed ${colors.blueDark};
  background-color: ${colors.grayVeryLight};
  text-align: center;
  padding-top: 250px;
  min-height: 600px;
`;

const PdfUploadText = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0;
  text-transform: uppercase;
  color: ${colors.grayDark};
`;

const FileUpload = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 50px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  background: ${colors.white};
  cursor: inherit;
  display: block;
`;

const TrashIcon = styled(Trash)`
  stroke: ${colors.white};
  height: 12px;
  width: 12px;
  margin-right: 7px;
`;

const UploadFileButton = styled(PrimaryButton)`
  display: block;
  margin: 10px auto;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: normal;
  padding: 10px 35px;
`;

function UploadFile(props) {
  const { formMode, handleFileDrop, handleQueuedFileClear, queuedFile } = props;
  const isButtonDisabled = !queuedFile;

  return (
    <Fragment>
      <UploadFileActions>
        <WarningButton
          onClick={handleQueuedFileClear}
          disabled={isButtonDisabled}
          type="button"
        >
          <TrashIcon />
          Clear File
        </WarningButton>
      </UploadFileActions>
      <FileDropzone>
        <Dropzone
          accept=".pdf, .png, .jpg, .jpeg"
          disabled={formMode === 'view'}
          multiple={false}
          onDrop={handleFileDrop}
        >
          {({ getRootProps, getInputProps }) => (
            <FileDropzone {...getRootProps()} disabled={formMode === 'view'}>
              <Pdf>
                <PdfUpload>
                  <PdfUploadText>
                    Drag and drop a file here or choose one from your computer
                    to upload
                    <UploadFileButton
                      type="button"
                      disabled={formMode === 'view'}
                    >
                      Choose a File
                    </UploadFileButton>
                    Supported file types: PDF, PNG, JPEG, JPG.
                  </PdfUploadText>
                  <FileUpload name="file-upload" {...getInputProps()} />
                </PdfUpload>
              </Pdf>
            </FileDropzone>
          )}
        </Dropzone>
        {queuedFile && (
          <FilePreview>
            <FilePreviewFrame key={queuedFile.name} src={queuedFile.preview} />
          </FilePreview>
        )}
      </FileDropzone>
    </Fragment>
  );
}

UploadFile.propTypes = propTypes;

export default UploadFile;
