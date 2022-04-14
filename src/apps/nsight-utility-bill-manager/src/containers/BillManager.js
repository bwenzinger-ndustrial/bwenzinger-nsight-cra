import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  getFacilities,
  getSelectedOrganization
} from '@ndustrial/nsight-common/selectors';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import BillManager from '../components/BillManager';

function BillManagerContainer(props) {
  const facilities = useSelector(getFacilities);
  const selectedOrganization = useSelector(getSelectedOrganization);

  // Initial state should be undefined for table loading mask
  const [utilityBillsdata, setUtilityBillsData] = useState();

  useEffect(() => {
    const fetchData = () => {
      const facilitiesList = facilities.reduce((acc, next) => {
        acc.push(next.id);
        return acc;
      }, []);

      const facilityNameSlugMap = facilities.reduce((acc, facility) => {
        acc[facility.id] = { name: facility.name, slug: facility.slug };
        return acc;
      }, {});

      if (facilitiesList.length > 0) {
        contxtSdk.sis
          .getUtilityBillSummaries(facilitiesList)
          .then((utilityBillsData) => {
            utilityBillsData = utilityBillsData.map((obj) => ({
              ...obj,
              orgSlug: selectedOrganization.slug,
              facilityName: facilityNameSlugMap[obj.facility_id].name,
              facilitySlug: facilityNameSlugMap[obj.facility_id].slug
            }));

            setUtilityBillsData(utilityBillsData);
          });
      }
    };
    fetchData();
  }, [facilities, selectedOrganization.slug]);

  return (
    <>
      <BillManager utilityBillsdata={utilityBillsdata} {...props} />
    </>
  );
}

export default BillManagerContainer;
