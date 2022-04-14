import React from 'react';
import { NotificationManager } from 'react-notifications';
import { useSelector } from 'react-redux';

import FacilityEditor from '@ndustrial/facility-editor';
import {
  getSelectedFacility,
  getSelectedOrganization
} from '@ndustrial/nsight-common/selectors';

const FacilityEditorContainer = () => {
  const selectedFacility = useSelector(getSelectedFacility);
  const selectedOrganization = useSelector(getSelectedOrganization);

  function onSubmit(error, warning) {
    if (error) {
      NotificationManager.error(error, 'Failure');
    } else if (warning) {
      NotificationManager.warning(warning, 'Warning');
    } else {
      NotificationManager.success('Successfully Saved!', 'Success');
    }
  }

  return (
    <FacilityEditor
      organization={selectedOrganization}
      facilityId={selectedFacility?.id}
      onSubmit={onSubmit}
      fieldWhitelist={['address', 'facilityContacts']}
    />
  );
};

export default FacilityEditorContainer;
