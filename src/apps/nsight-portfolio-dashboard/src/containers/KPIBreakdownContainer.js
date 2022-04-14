import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import FullScreenMinusNav from '@ndustrial/nsight-common/components/layout/FullScreenMinusNav';
import { useQueryParams } from '@ndustrial/nsight-common/hooks';
import { useAddQueryParam } from '@ndustrial/nsight-common/hooks/useAddQueryParam';

import '@ndustrial/nd-table-react/lib/index.css';

import KpiBreakdownGroupRadioButton from '../components/PortfolioDetail/KPIBreakdown/KPIBreakdownGroupRadioButton';
import KPIBreakdownTable from '../components/PortfolioDetail/KPIBreakdown/KPIBreakdownTable';
import { getFacilitiesWithHierarchyAndKpiValues } from '../redux/kpi/selectors';

const propTypes = {
  kpiConfig: PropTypes.shape({
    monthly: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    detail: PropTypes.shape({
      breakdown: PropTypes.array
    }),
    compareBy: PropTypes.string,
    unit: PropTypes.string
  })
};

// const StyledFormControlLabel = styled(FormControlLabel)`
//   margin-bottom: 10px;
// `;

function KPIBreakdownContainer({ kpiConfig }) {
  const addQueryParam = useAddQueryParam();
  const {
    // kpiBreakdownExcludeMissing,
    kpiBreakdownIsGrouped
  } = useQueryParams();

  const [isGrouped, setIsGrouped] = useState(kpiBreakdownIsGrouped === 'true');
  // const [
  //   excludeFacilitiesMissingData,
  //   setExcludeFacilitiesMissingData
  // ] = useState(kpiBreakdownExcludeMissing === 'true');

  const primaryDates = useSelector(
    (state) => state.portfolioPrimaryDetail.primaryDates
  );
  const comparisonDates = useSelector(
    (state) => state.portfolioComparisonDetail.comparisonDates
  );

  const facilities = useSelector(getFacilitiesWithHierarchyAndKpiValues);

  const isLoading = useMemo(() => {
    if (facilities.length < 1) {
      return true;
    }

    return facilities.some((facility) => {
      const { calculatedPrimaryData, calculatedComparisonData } = facility;
      return !calculatedPrimaryData || !calculatedComparisonData;
    });
  }, [facilities]);

  function setGroupedAndUpdateHistory(value) {
    setIsGrouped(value);
    addQueryParam({ kpiBreakdownIsGrouped: value });
  }

  // If viewing the flat facility view, dedupe facilities, as multiple groups
  // are allowed to contain the same facility.
  const tableData = useMemo(() => {
    if (isGrouped) {
      // if (excludeFacilitiesMissingData) {
      //   return facilities.filter((facility) => !facility.hasMissingData);
      // } else {
      return facilities;
      // }
    }

    const facilityMap = {};
    // if (excludeFacilitiesMissingData) {
    //   facilities
    //     .filter((facility) => !facility.hasMissingData)
    //     .forEach((facility) => {
    //       facilityMap[facility.id] = facility;
    //     });
    // } else {
    facilities.forEach((facility) => {
      facilityMap[facility.id] = facility;
    });
    // }
    return isLoading ? undefined : Object.values(facilityMap);
  }, [facilities, isGrouped, isLoading]);
  // }, [facilities, isGrouped, isLoading, excludeFacilitiesMissingData]);

  return (
    <FullScreenMinusNav.Content noMargin noOverflow reduceHeightValue={30}>
      <KpiBreakdownGroupRadioButton
        isGrouped={isGrouped}
        setIsGrouped={setGroupedAndUpdateHistory}
      />
      {/* <StyledFormControlLabel
        id="exclude-facilities-missing-data"
        checked={excludeFacilitiesMissingData}
        control={(props) => <Checkbox {...props} />}
        label="Exclude facilities with missing data"
        onChange={(event) => {
          addQueryParam({ kpiBreakdownExcludeMissing: event.target.checked });
          setExcludeFacilitiesMissingData(event.target.checked);
        }}
        value="checkedA"
      /> */}
      <KPIBreakdownTable
        comparisonDates={comparisonDates}
        tableData={tableData}
        primaryDates={primaryDates}
        kpiConfig={kpiConfig}
        isLoading={isLoading}
        isGrouped={isGrouped}
      />
    </FullScreenMinusNav.Content>
  );
}

KPIBreakdownContainer.propTypes = propTypes;

export default KPIBreakdownContainer;
