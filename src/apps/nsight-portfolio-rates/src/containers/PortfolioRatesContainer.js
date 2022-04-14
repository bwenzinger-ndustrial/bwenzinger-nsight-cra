import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  getFacilities,
  getSelectedOrganization
} from '@ndustrial/nsight-common/selectors';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import PortfolioRates from '../components';

function PortfolioRatesContainer(props) {
  const facilities = useSelector(getFacilities);
  const selectedOrganization = useSelector(getSelectedOrganization);

  // Initial state should be undefined for table loading mask
  const [portfolioRatesData, setPortfolioRatesData] = useState();

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
        contxtSdk.ems
          .getPortfolioRates(selectedOrganization.id, facilitiesList)
          .then((portfolioRatesData) => {
            portfolioRatesData = portfolioRatesData.map((obj) => ({
              ...obj,
              orgSlug: selectedOrganization.slug,
              facilityName: facilityNameSlugMap[obj.facility_id].name,
              facilitySlug: facilityNameSlugMap[obj.facility_id].slug
            }));

            setPortfolioRatesData(portfolioRatesData);
          });
      }
    };
    fetchData();
  }, [facilities, selectedOrganization]);

  return (
    <>
      <PortfolioRates portfolioRatesData={portfolioRatesData} {...props} />
    </>
  );
}

export default PortfolioRatesContainer;
