import React, { Fragment, useEffect } from 'react';
import { NotificationContainer } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { KPIDashboardHeader } from '@ndustrial/nsight-common/containers';
import { getSelectedFacility } from '@ndustrial/nsight-common/selectors';

import { getFacilityMetadata } from '../redux/facilityMetadata/actions';
import Routes from '../routes';

const FacilityOverviewRoot = () => {
  const dispatch = useDispatch();
  const selectedFacility = useSelector(getSelectedFacility);
  const facilityId = get(selectedFacility, 'id');
  useEffect(() => {
    if (facilityId) {
      dispatch(getFacilityMetadata(facilityId));
    }
  }, [dispatch, facilityId]);

  return (
    <Fragment>
      <NotificationContainer />
      <KPIDashboardHeader sectionTitle="Facility" />
      <Routes />
    </Fragment>
  );
};

export default FacilityOverviewRoot;
