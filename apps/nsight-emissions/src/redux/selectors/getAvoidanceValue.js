import { createSelector } from 'reselect';

import {
  getFacilities,
  getSelectedFacility
} from '@ndustrial/nsight-common/selectors';

import { AVOIDANCE_CONFIG } from '../../constants/equivalencies';
import { avoidanceCalculations as calculations } from '../../helpers';
import getSelectedAssetType from './getSelectedAssetType';

const getComparisonEmissions = (state) => state.comparisonEmissions.data;
const getPrimaryEmissions = (state) => state.primaryEmissions.data;

const getAvoidanceValue = createSelector(
  getComparisonEmissions,
  getPrimaryEmissions,
  getSelectedAssetType,
  getSelectedFacility,
  getFacilities,
  (
    comparisonEmissions,
    primaryEmissions,
    selectedAssetType,
    selectedFacility,
    facilities
  ) => {
    const avoidanceValues = [];

    const getValue = (config) => {
      if (!primaryEmissions || !comparisonEmissions) {
        return 0;
      }
      let comparisonNumeratorValue = 0;

      let formulaPart1 = null;
      let comparisonKpi = null;
      let totalAssetAttributeValue = 0;
      let assetAttributeFactor = 0;
      let finalValue = 0;

      const denominator = config.denominator[selectedAssetType];

      let primaryDenominatorValue = calculations.getFormulaValues(
        denominator,
        primaryEmissions
      );

      let comparisonDenominatorValue = calculations.getFormulaValues(
        denominator,
        comparisonEmissions
      );

      const summedComparisonEmissions = calculations.getSummedAllYearsValue(
        comparisonEmissions
      );

      const summedPrimaryEmissions = calculations.getSummedAllYearsValue(
        primaryEmissions
      );

      // uses asset attribute for calculation, but needs NO additional factor
      if (
        config.assetAttribute &&
        !config.numerator &&
        !config.assetAttributeFactor
      ) {
        primaryDenominatorValue = calculations.getFormulaValues(
          denominator,
          summedPrimaryEmissions
        );

        comparisonDenominatorValue = calculations.getFormulaValues(
          denominator,
          summedComparisonEmissions
        );

        if (selectedFacility) {
          totalAssetAttributeValue =
            selectedFacility.attributes[config.assetAttribute];
        } else {
          totalAssetAttributeValue = calculations.getOrgTotalAssetAttributeValue(
            facilities,
            config
          );
        }

        finalValue = calculations.getValueUsingAssetAttribute(
          totalAssetAttributeValue,
          comparisonDenominatorValue,
          primaryDenominatorValue
        );

        return finalValue;
      }

      // uses additional asset attribute factor (ie. CO2 factor)
      else if (config.assetAttributeFactor && config.avoidanceConfigKey) {
        const assetAttributeConfigByKey = AVOIDANCE_CONFIG.find(
          (x) => x.key === config.avoidanceConfigKey
        );

        const numerator =
          assetAttributeConfigByKey.numerator[selectedAssetType];

        if (selectedFacility) {
          assetAttributeFactor =
            selectedFacility.attributes[config.assetAttributeFactor];
        } else {
          /// get summed factor of all facilities
          const summedFactorByOrg = calculations.getTotalAssetAttributeFactor(
            facilities,
            config
          );

          // get average factor of org
          assetAttributeFactor = calculations.getOrgAvgAssetAttributeValue(
            facilities,
            config,
            summedFactorByOrg
          );
        }

        comparisonNumeratorValue = calculations.getFormulaValues(
          numerator,
          summedComparisonEmissions
        );

        comparisonKpi = comparisonNumeratorValue / comparisonDenominatorValue;
        formulaPart1 = primaryDenominatorValue * comparisonKpi;
        finalValue =
          (comparisonNumeratorValue - formulaPart1) * assetAttributeFactor;

        return finalValue;
      }

      // only uses metric numerator and denominator
      else {
        // Doesn't need to aggregate
        comparisonNumeratorValue = calculations.getFormulaValues(
          config.numerator[selectedAssetType],
          summedComparisonEmissions
        );

        comparisonKpi = comparisonNumeratorValue / comparisonDenominatorValue;
        formulaPart1 = primaryDenominatorValue * comparisonKpi;

        if (config.reverseFinalCalculation) {
          finalValue = formulaPart1 - comparisonNumeratorValue;
        } else {
          finalValue = comparisonNumeratorValue - formulaPart1;
        }

        return finalValue;
      }
    };

    AVOIDANCE_CONFIG.forEach((config) => {
      avoidanceValues.push({
        value: getValue(config),
        config: config
      });
    });

    return avoidanceValues;
  }
);

export default getAvoidanceValue;
