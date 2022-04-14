import { TEMPERATURE_EXTREME_TYPES } from './weatherConstants';

const DEMAND_MENU_OPTIONS = {
  comparison: 'Demand Comparison',
  heatmap: 'Demand Heatmap',
  facility_daily_electricity_usage: 'Daily kWh'
};

const OVERVIEW_METRICS = [
  {
    id: 'cbd65aaf-ea1d-4133-8bef-e6024d01f4f0',
    label: 'Daily kWh',
    tooltip:
      'Daily kWh over the last rolling 30 days compared to the daily kWh for that same time period last year.',
    unit: 'kWh',
    dailyKey: 'facility_daily_electricity_usage',
    monthlyKey: 'facility_monthly_electricity_usage'
  }
];

export { DEMAND_MENU_OPTIONS, OVERVIEW_METRICS, TEMPERATURE_EXTREME_TYPES };
