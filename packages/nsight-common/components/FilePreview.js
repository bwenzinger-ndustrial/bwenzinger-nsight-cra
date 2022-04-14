import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string,
  fileUrl: PropTypes.string
};

const FilePreviewContainer = styled.div`
  height: 100%;
`;

const FilePreviewContent = styled.iframe`
  height: 100%;
  width: 100%;
  min-height: 700px;
`;

function FilePreview(props) {
  const { className, fileUrl } = props;

  return (
    <FilePreviewContainer className={className}>
      <FilePreviewContent src={fileUrl} />
    </FilePreviewContainer>
  );
}

FilePreview.propTypes = propTypes;

export default FilePreview;
