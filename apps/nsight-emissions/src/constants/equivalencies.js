import carbonCredits from '../assets/carbonCredits.svg';
import co2Reduction from '../assets/cloud.svg';
import factory from '../assets/factory.svg';
import forest from '../assets/forest.svg';
import shareholder from '../assets/shareholder.svg';
import truck from '../assets/truck.svg';

const CO2_METRIC_KEY = {
  facility: 'facilityMonthlyCo2Tons',
  organization: 'organizationMonthlyCo2Tons'
};

const METRIC_LABELS = {
  facility:
    'facility_monthly_co2_tons,facility_monthly_electricity_usage,facility_monthly_production_units,facility_monthly_electricity_spend',
  organization:
    'organization_monthly_co2_tons,organization_monthly_production_units,organization_monthly_electricity_usage,organization_monthly_electricity_spend'
};

const EQUIVALENCIES = {
  tooltip:
    'The number of equivalent units reduced or saved by reducing CO&#8322;.',
  values: [
    {
      divisor: 0.82,
      title: 'Acres of Forest Saved',
      icon: forest
    },
    {
      divisor: 0.000905,
      title: 'Pounds of Coal Burned',
      icon: factory
    },
    {
      divisor: 0.01018,
      title: 'Gallons of Diesel',
      icon: truck
    }
  ]
};

// Shareholder value depends on the 'Potential carbon creit" value
// so summaryConfigKey shows which value it relies on

// TODO: Provision shareholder value factor for each customer.
// For now, using a standard factor
// For carbon credits, pull $ factor from some API. For now, using 50
const SUMMARY_CONFIG = [
  {
    key: 'carbon_reduction',
    title: 'CO&#8322; Reduction',
    icon: co2Reduction,
    showPercent: true,
    factor: 1,
    summaryConfigKey: null,
    unit: 'Tons of CO&#8322;',
    unitPosition: 'postfix',
    tooltip:
      'The amount of carbon that was a reduced this year over last year&apos;s based on kWh consumption.'
  },
  {
    key: 'carbon_credits',
    title: 'Potential Carbon Credits',
    icon: carbonCredits,
    showPercent: false,
    factor: 50,
    summaryConfigKey: null,
    unit: '$',
    unitPosition: 'prefix',
    tooltip:
      'The carbon credits that may be available to you as a result of CO&#8322; reduced.'
  },
  {
    key: 'shareholder_value',
    title: 'Added Shareholder Value',
    icon: shareholder,
    showPercent: false,
    factor: 17,
    summaryConfigKey: 'carbon_credits',
    unit: '$',
    unitPosition: 'prefix',
    tooltip:
      'The additional cash made available to shareholders based on a market-specific EBITDA multiplier as a result of reduced kWh consumption.'
  }
];

// AVOIDANCE_CONFIG properties
// key: unique key
// avoidanceConfigKey: if present, this calculation relies on another avoidance calculation
// numerator: which metric(s) to use in the numerator of the calculation
// denominator: which metric(s) to use in the denominator of the calculation
// assetAttribute: calculation uses an existing asset attribute in the calculation
// assetAttributeFactor: calculation uses an additional asset attribute factor
// prefixUnit: unit shown before the calculated value (ie. $)
// unit: unit/title shown at the end of the calculated value (ie. kwh, Spend, etc),
// reverseFinalCalculation: flag to change order of calculation
// usesAvgAssetAttribute: When using the 'assetAttribute' key above, some calculations rely on summed asset attribute values, while
//    others need an avg. Setting this to true uses an average
// needsToAggregate: Some avoidance metrics need to perform calculations on each year and year - 1
//    before summing for the final value

const AVOIDANCE_CONFIG = [
  {
    key: 'kwh_avoidance',
    avoidanceConfigKey: null,
    numerator: {
      facility: ['facilityMonthlyElectricityUsage'],
      organization: ['organizationMonthlyElectricityUsage']
    },
    denominator: {
      facility: ['facilityMonthlyProductionUnits'],
      organization: ['organizationMonthlyProductionUnits']
    },
    assetAttribute: null,
    assetAttributeFactor: null,
    prefixUnit: null,
    unit: 'kwh',
    reverseFinalCalculation: false,
    usesAvgAssetAttribute: false,
    needsToAggregate: false
  },
  {
    key: 'co2_avoidance',
    avoidanceConfigKey: 'kwh_avoidance',
    numerator: null,
    denominator: {
      facility: ['facilityMonthlyProductionUnits'],
      organization: ['organizationMonthlyProductionUnits']
    },
    assetAttribute: null,
    assetAttributeFactor: 'co2Factor',
    prefixUnit: null,
    unit: 'Tons of CO&#8322;',
    reverseFinalCalculation: false,
    usesAvgAssetAttribute: true,
    needsToAggregate: false
  },
  {
    key: 'feet_avoidance',
    avoidanceConfigKey: null,
    numerator: null,
    denominator: {
      facility: ['facilityMonthlyElectricityUsage'],
      organization: ['organizationMonthlyElectricityUsage']
    },
    assetAttribute: 'cubicFeet',
    assetAttributeFactor: null,
    unit: 'ft&sup3;',
    prefixUnit: null,
    reverseFinalCalculation: true,
    usesAvgAssetAttribute: false,
    needsToAggregate: false
  },
  {
    key: 'spend_avoidance',
    numerator: {
      facility: ['facilityMonthlyElectricitySpend'],
      organization: ['organizationMonthlyElectricitySpend']
    },
    denominator: {
      facility: ['facilityMonthlyElectricityUsage'],
      organization: ['organizationMonthlyElectricityUsage']
    },
    avoidanceConfigKey: null,
    assetAttribute: null,
    assetAttributeFactor: null,
    unit: 'Spend',
    prefixUnit: '$',
    reverseFinalCalculation: false,
    usesAvgAssetAttribute: false,
    needsToAggregate: true
  }
];

export {
  AVOIDANCE_CONFIG,
  CO2_METRIC_KEY,
  EQUIVALENCIES,
  METRIC_LABELS,
  SUMMARY_CONFIG
};
