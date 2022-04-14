import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  PrimaryButton,
  SecondaryButton,
  WarningButton
} from '@ndustrial/nd-button-react';
import { CircleSlash, Disk } from '@ndustrial/nd-icons-svg';
import { QueryLink } from '@ndustrial/nsight-common/components';

import { colors } from '../../common/constants.js';

const propTypes = {
  className: PropTypes.string,
  formMode: PropTypes.string.isRequired,
  isSaveDisabled: PropTypes.bool,
  reminderChanged: PropTypes.bool,
  reset: PropTypes.func.isRequired,
  resetForm: PropTypes.func,
  selectedContract: PropTypes.shape({
    id: PropTypes.number
  }),
  submitting: PropTypes.bool
};

const SVG_STYLES = `
  height: 16px;
  width: 16px;
  stroke: ${colors.white};
`;

const CircleSlashIcon = styled(CircleSlash)`
  ${SVG_STYLES}
  stroke: ${colors.blueDark}
`;

const DiskIcon = styled(Disk)`
  ${SVG_STYLES}
`;

const FormActionContainer = styled.div`
  ${PrimaryButton}, ${SecondaryButton}, ${WarningButton} {
    margin-right: 10px;

    ${CircleSlashIcon}, ${DiskIcon}  {
      margin-right: 7px;
    }
  }
`;

function FormActions(props) {
  const {
    formMode,
    reset,
    isSaveDisabled,
    resetForm,
    selectedContract,
    submitting
  } = props;

  const cancelPath =
    formMode === 'create'
      ? `/utility-contract-upload`
      : `/utility-contract-upload/contract/${selectedContract.id}`;

  return (
    <FormActionContainer>
      <SecondaryButton
        as={QueryLink}
        onClick={() => resetForm(reset)}
        to={cancelPath}
      >
        <CircleSlashIcon />
        Cancel
      </SecondaryButton>
      <PrimaryButton type="submit" disabled={submitting || isSaveDisabled}>
        <DiskIcon />
        {!submitting ? 'Save Contract' : 'Saving...'}
      </PrimaryButton>
    </FormActionContainer>
  );
}

FormActions.propTypes = propTypes;

export default FormActions;
