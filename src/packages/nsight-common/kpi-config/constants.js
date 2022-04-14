import {
  Building,
  ChartDot,
  Dollar,
  Electricity,
  Gauge,
  MoneyEnergy,
  Ruler,
  TrendActivity,
  WeatherCloud,
  WeatherLightning,
  Weight,
  WeightEnergy,
  WeightInbound,
  WeightMoney,
  WeightOutbound
} from '@ndustrial/nd-icons-svg';

const kpiEnums = {
  COMPARE_BY_TYPES: {
    METRIC: 'metric',
    DATE: 'date'
  },
  UNIT_POSITION: {
    PREFIX: 'prefix',
    POSTFIX: 'postfix'
  },
  DATE_INTERVALS: {
    MONTHLY: 'monthly',
    DAILY: 'daily'
  },
  CHART_DISPLAY_WINDOWS: {
    YEAR: 'year',
    MONTH: 'month'
  }
};

const METRIC_UNIT_TO_DISPLAY_UNIT = {
  'Lbs CO2': 'Lbs CO&#8322;',
  'Tons CO2': 'Tons CO&#8322;',
  'Tons CO2/kLbs': 'Tons CO&#8322;/kLbs',
  'kJ/ft3': 'kJ/ft&sup3',
  'kJ/ft2': 'kJ/ft&sup2',
  'kWh/ft2': 'kWh/ft&sup2',
  'kWh/ft3': 'kWh/ft&sup3',
  'kBtu/ft2': 'kBTU/ft&sup2',
  'kBtu/ft3': 'kBTU/ft&sup3',
  kBtu: 'kBtu',
  sqft: 'ft&sup2',
  cuft: 'ft@sup3',
  kWh: 'kWh',
  kW: 'kW'
};

// used when units have html entities (KPI card, summary, etc)
const KPI_UNIT_DISPLAY_HASH = {
  facility_daily_co2_tons: 'Tons CO&#8322;',
  facility_monthly_co2_tons: 'Tons CO&#8322;',
  organization_monthly_co2_tons: 'Tons CO&#8322;',
  facility_monthly_cubic_foot_eui: ' kJ/ft&sup3',
  facility_monthly_square_foot_eui: ' kJ/ft&sup2',
  facility_monthly_rolling_year_square_footage: ' ft&sup2',
  facility_monthly_rolling_year_cubic_footage: ' ft&sup3'
};

// used in breakdown table and graphs for when metric uses html entities
const KPI_LABEL_DISPLAY_HASH = {
  facility_daily_co2_factor: 'CO&#8322; Factor',
  facility_monthly_co2_factor: 'CO&#8322; Factor',
  organization_monthly_co2_factor: 'CO&#8322; Factor'
};

const KPI_ICON_HASH = {
  Building,
  ChartDot,
  Dollar,
  Electricity,
  Gauge,
  MoneyEnergy,
  Ruler,
  TrendActivity,
  Weight,
  WeightEnergy,
  WeightInbound,
  WeightMoney,
  WeightOutbound,
  WeatherLightning,
  WeatherCloud
};

/** NOTE: This is unfortunately repeated in config/kpiConfig/kpiConfig.js because
 *   of the difficulties in mixing esm and commonjs syntax
 * @see config/kpiConfig/kpiConfig.js
 * @type {{KWH_BUDGET: string, ENERGY_COST_PROD_NORMALIZED: string, ELECTRICITY_REVENUE_NORMALIZED: string, CO2: string, EUI: string, BUDGET: string, CO2_PROD_NORMALIZED: string, ELECTRICITY_PROD_NORMALIZED: string, ENERGY_PROD_NORMALIZED: string, LOAD_FACTOR: string, ELECTRICITY_SPACE_NORMALIZED: string}}
 */
const KPI_KEYS = {
  CO2: 'co2',
  CO2_PROD_NORMALIZED: 'co2-prod-normalized',
  ELECTRICITY_PROD_NORMALIZED: 'electricity-prod-normalized',
  ENERGY_PROD_NORMALIZED: 'energy-prod-normalized',
  ELECTRICITY_REVENUE_NORMALIZED: 'electricity-revenue-normalized',
  ELECTRICITY_SPACE_NORMALIZED: 'electricity-space-normalized',
  ENERGY_COST_PROD_NORMALIZED: 'energy-cost-prod-normalized',
  EUI: 'eui',
  LOAD_FACTOR: 'load-factor',
  KWH_BUDGET: 'kwh-budget',
  BUDGET: 'budget'
};

export {
  KPI_ICON_HASH,
  KPI_KEYS,
  KPI_LABEL_DISPLAY_HASH,
  KPI_UNIT_DISPLAY_HASH,
  kpiEnums,
  METRIC_UNIT_TO_DISPLAY_UNIT
};
