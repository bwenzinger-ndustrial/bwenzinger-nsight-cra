import React from 'react';
import moment from 'moment';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PrimaryButton, WarningButton } from '@ndustrial/nd-button-react';
import { Download, Trash } from '@ndustrial/nd-icons-svg';
import FilePreview from '@ndustrial/nsight-common/components/FilePreview';

import { colors } from '../../common/constants.js';

const propTypes = {
  className: PropTypes.string,
  deleteContractFile: PropTypes.func,
  formMode: PropTypes.string,
  selectedContract: PropTypes.shape({
    createdByUser: PropTypes.shape({
      email: PropTypes.string,
      fullName: PropTypes.string
    }),
    fileId: PropTypes.string,
    file: PropTypes.shape({
      attachmentUrl: PropTypes.string,
      expiresAt: PropTypes.string,
      inlineUrl: PropTypes.string
    }),
    updatedAt: PropTypes.string
  })
};

const ContentDivider = styled.div`
  height: 1rem;
  width: 1px;
`;

const DownloadButton = styled(PrimaryButton)`
  margin-left: 10px;

  ${ContentDivider} {
    background-color: rgba(255, 255, 255, 0.2);
    height: ${rem(16, 14)};
    margin: 0 8px;
  }
`;

const FormActionsRow = styled.div`
  display: flex;
  flex-direction: row;

  button {
    margin-left: 10px;
  }
`;

const FormUpdatedInfo = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 0.625rem;
  color: ${colors.grayVeryDark};
`;

const FormUpdatedInfoUploaded = styled.div`
  margin-left: 5px;
`;

const UpdatedInfoLabel = styled.span`
  font-weight: 700;
  font-style: italic;
  margin-right: 10px;
`;

const UpdatedInfoLink = styled.a`
  margin-left: 5px;
  color: ${colors.blueDark};
  font-weight: 700;
  text-decoration: none;
`;

const Container = styled.div`
  ${FormActionsRow} {
    margin-bottom: 10px;
  }
`;

function PreviewFile(props) {
  const { className, deleteContractFile, formMode, selectedContract } = props;

  const isButtonDisabled = formMode === 'view';

  return (
    <Container>
      <FormActionsRow>
        <FormUpdatedInfo>
          <FormUpdatedInfoUploaded>
            <UpdatedInfoLabel>Uploaded at:</UpdatedInfoLabel>{' '}
            {moment(selectedContract.updatedAt).format('LLL')}
          </FormUpdatedInfoUploaded>
          {selectedContract.createdByUser.email && (
            <FormUpdatedInfoUploaded>
              by
              <UpdatedInfoLink
                href={`mailto:${selectedContract.createdByUser.email}`}
                target="_blank"
              >
                {selectedContract.createdByUser.fullName}
              </UpdatedInfoLink>
            </FormUpdatedInfoUploaded>
          )}
        </FormUpdatedInfo>
        {!isButtonDisabled && (
          <WarningButton
            onClick={() => {
              deleteContractFile(selectedContract.fileId);
            }}
            icon={<Trash />}
            type="button"
          >
            Delete File
          </WarningButton>
        )}
        <DownloadButton
          href={selectedContract.file.attachmentUrl}
          target="_blank"
          as="a"
        >
          <Download />
          <ContentDivider />
          Download File
        </DownloadButton>
      </FormActionsRow>
      <FilePreview
        fileUrl={selectedContract.file.inlineUrl}
        className={className}
      />
    </Container>
  );
}

PreviewFile.propTypes = propTypes;

export default PreviewFile;
