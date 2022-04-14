import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ErrorBanner, FilePreview } from '@ndustrial/nsight-common/components';

import UnstyledExpiredContractFlash from './ExpiredContractFlash';
import MissingContractFileGraphic from './MissingContractFileGraphic';
import UnstyledNoContractFileFlash from './NoContractFileFlash';

const propTypes = {
  className: PropTypes.string,
  contract: PropTypes.shape({
    endDate: PropTypes.string,
    fileUrl: PropTypes.string
  }).isRequired,
  hasLoadingContractFileError: PropTypes.bool.isRequired
};

const ExpiredContractFlash = styled(UnstyledExpiredContractFlash)``;
const NoContractFileFlash = styled(UnstyledNoContractFileFlash)``;

const FileContainer = styled.div`
  height: 100%;

  ${ExpiredContractFlash} {
    margin-bottom: 15px;
  }

  ${NoContractFileFlash} {
    margin-bottom: 15px;
  }
`;

function UtilityContractContainer(props) {
  const { className, contract, hasLoadingContractFileError } = props;

  if (hasLoadingContractFileError) {
    return <ErrorBanner />;
  }

  const isExpired = new Date(contract.endDate) < new Date();

  return (
    <FileContainer className={className}>
      {isExpired && <ExpiredContractFlash />}
      {contract.fileUrl ? (
        <FilePreview fileUrl={contract.fileUrl} />
      ) : (
        <Fragment>
          <NoContractFileFlash />
          <MissingContractFileGraphic />
        </Fragment>
      )}
    </FileContainer>
  );
}

UtilityContractContainer.propTypes = propTypes;

export default UtilityContractContainer;
