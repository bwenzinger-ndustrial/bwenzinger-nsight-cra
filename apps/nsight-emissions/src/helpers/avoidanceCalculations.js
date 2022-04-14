import { isEmpty } from 'lodash';

// To calculate numerator and denominator values
function getFormulaValues(formulaParts, series) {
  let value = 1;

  formulaParts.forEach((item) => {
    if (series[item]?.value) {
      value += series[item]?.value;
    } else if (series[item].length) {
      series[item].forEach((val) => {
        value += val.value;
      });
    }
  });

  return value;
}

function getFormulaValuesByYear(formulaParts, series) {
  let value = 0;
  // change to keys
  formulaParts.forEach((item) => {
    value += series.value > 0 ? series.value : 1;
  });

  return value;
}

function getOrgTotalAssetAttributeValue(facilities, config) {
  let totalAssetAttributeValue = 0;

  facilities.forEach((facility) => {
    if (
      !isEmpty(facility.attributes) &&
      facility.attributes[config.assetAttribute]
    ) {
      totalAssetAttributeValue += parseInt(
        facility.attributes[config.assetAttribute]
      );
    }
  });

  return totalAssetAttributeValue;
}

function getTotalAssetAttributeFactor(facilities, config) {
  let totalAssetAttributeFactor = 0;

  facilities.forEach((facility) => {
    if (
      !isEmpty(facility.attributes) &&
      facility.attributes[config.assetAttributeFactor]
    ) {
      if (config.assetAttributeFactor) {
        totalAssetAttributeFactor += parseFloat(
          facility.attributes[config.assetAttributeFactor]
        );
      }
    }
  });

  return totalAssetAttributeFactor;
}

// Find average asset attribute for an org
function getOrgAvgAssetAttributeValue(
  facilities,
  config,
  totalAssetAttributeFactor
) {
  let facilityCount = 0;
  const totalAssetAttributeValue = getOrgTotalAssetAttributeValue(
    facilities,
    config
  );

  facilities.forEach((facility) => {
    if (
      !isEmpty(facility.attributes) &&
      facility.attributes[config.assetAttributeFactor]
    ) {
      facilityCount++;
    }
  });

  const returnValue = config.assetAttributeFactor
    ? totalAssetAttributeFactor / facilityCount
    : totalAssetAttributeValue / facilityCount;

  return returnValue;
}

function getValueUsingAssetAttribute(
  totalAssetAttributeValue,
  comparisonDenominatorValue,
  primaryDenominatorValue
) {
  const comparisonKpi = totalAssetAttributeValue / comparisonDenominatorValue;
  const formulaPart1 = comparisonKpi * primaryDenominatorValue;

  return formulaPart1 - totalAssetAttributeValue;
}

function getSummedAllYearsValue(series) {
  const summedSeries = {};
  /*  object keys metric id -> 
  array of years -> 
  year key -> object.value   */
  // metrics
  let summedValue = 0;

  // Metric Key
  Object.keys(series).forEach((metricKey) => {
    summedValue = 0;
    // Each year in metric
    series[metricKey].forEach((year, idx) => {
      summedValue += year.value;
    });

    summedSeries[metricKey] = { value: summedValue };
  });

  return summedSeries;
}

function getSummedSingleYearValue(series) {
  let summedValue = 0;
  const summedSeries = {};

  Object.keys(series).forEach((metricKey) => {
    summedValue = 0;
    // Each year in metric
    series[metricKey].forEach((year, idx) => {
      summedValue += year.value;
    });

    summedSeries[metricKey] = { value: summedValue };
  });
}

export default {
  getFormulaValues,
  getFormulaValuesByYear,
  getTotalAssetAttributeFactor,
  getSummedAllYearsValue,
  getSummedSingleYearValue,
  getOrgTotalAssetAttributeValue,
  getOrgAvgAssetAttributeValue,
  getValueUsingAssetAttribute
};
