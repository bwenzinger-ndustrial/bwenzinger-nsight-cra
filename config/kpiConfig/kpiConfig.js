/**
 * NOTE: This is unfortunately repeated in packages/nsight-common/kpi-config/constants because
 *  of the difficulties in mixing esm and commonjs syntax
 * @see packages/nsight-common/kpi-config/constants.js
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

module.exports = {
  actual_vs_planned: {
    default_facility: {
      id: 'actual_vs_planned/default_facility',
      index: 5,
      slug: KPI_KEYS.BUDGET,
      config: {
        cardDisplayLabel: 'Actual Spend',
        label: 'Actual Spend vs Budget $',
        unitPosition: 'postfix',
        unit: 'USD',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_monthly_budget_over_spend',
          formula:
            'sum(facility_monthly_electricity_spend) / sum(facility_monthly_budget) * 100'
        },
        monthly: {
          key: 'facility_monthly_budget_over_spend',
          formula:
            'sum(facility_monthly_electricity_spend) / sum(facility_monthly_budget) * 100'
        },
        icon: 'Dollar',
        tooltip: 'Total spend compared to total budgeted dollars.',
        interval: 86400000,
        compareBy: 'metric',
        changeLanguage: {
          positive: 'Under Budget',
          negative: 'Over Budget'
        },
        primaryMetric: 'facility_monthly_electricity_spend',
        comparisonMetric: 'facility_monthly_budget',
        minimumDateInterval: 'monthly',
        significantDigits: 2,
        detail: {
          chartType: 'column',
          breakdown: [
            {
              name: 'Actual',
              icon: 'Building',
              isNegativeIndicator: false,
              key: 'facility_monthly_electricity_spend',
              unit: 'USD',
              isBaseMetric: false,
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Budget',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_budget',
              unit: 'USD',
              isBaseMetric: true,
              significantDigits: 2,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    default_org: {
      id: 'actual_vs_planned/default_org',
      index: 5,
      slug: KPI_KEYS.BUDGET,
      config: {
        cardDisplayLabel: 'Actual Spend',
        label: 'Actual Spend vs Budget $',
        unitPosition: 'postfix',
        unit: 'USD',
        chartType: 'areaspline',
        isNegativeIndicator: true,
        daily: {
          key: 'organization_monthly_budget_over_spend',
          formula:
            'sum(facility_monthly_electricity_spend) / sum(facility_monthly_budget) * 100'
        },
        monthly: {
          key: 'organization_monthly_budget_over_spend',
          formula:
            'sum(facility_monthly_electricity_spend) / sum(facility_monthly_budget) * 100'
        },
        icon: 'Dollar',
        tooltip: 'Total spend compared to total budgeted dollars.',
        interval: 86400000,
        compareBy: 'metric',
        changeLanguage: {
          positive: 'Under Budget',
          negative: 'Over Budget'
        },
        primaryMetric: 'organization_monthly_electricity_spend',
        comparisonMetric: 'organization_monthly_budget',
        significantDigits: 2,
        detail: {
          chartType: 'column',
          breakdown: [
            {
              name: 'Actual',
              icon: 'Building',
              isNegativeIndicator: false,
              key: 'organization_monthly_electricity_spend',
              unit: 'USD',
              isBaseMetric: false,
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Budget',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'organization_monthly_budget',
              unit: 'USD',
              isBaseMetric: true,
              significantDigits: 2,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    }
  },
  co2: {
    default_facility: {
      id: 'co2/default_facility',
      index: 8,
      slug: KPI_KEYS.CO2,
      config: {
        label: 'Carbon Footprint',
        unit: 'Tons CO2', // TODO: convert to plain text and parse with unit map in constants
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_daily_co2_tons',
          formula:
            '((sum(facility_daily_electricity_usage) * max(facility_daily_co2_factor)) / 2000)'
        },
        monthly: {
          key: 'facility_monthly_co2_tons',
          formula:
            '((sum(facility_daily_electricity_usage) * sum(facility_daily_co2_factor)) / 2000)'
        },
        icon: 'WeatherCloud',
        tooltip:
          'Scope 2 CO2 Emissions, metric calculated using a facility-specific emissions factor and kWh consumed.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 0,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_daily_electricity_usage',
              unit: 'kWh',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'CO2 Factor',
              icon: 'TrendActivity',
              isNegativeIndicator: true,
              key: 'facility_daily_co2_factor',
              unit: '',
              significantDigits: 2,
              aggregateFunction: 'max'
            }
          ]
        }
      }
    },
    sfnt_facility: {
      id: 'co2/sfnt_facility',
      index: 8,
      slug: KPI_KEYS.CO2,
      config: {
        label: 'Carbon Footprint',
        unit: 'Lbs CO2', // TODO: convert to plain text and parse with unit map in constants
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_daily_co2_lbs',
          formula:
            '(sum(facility_daily_electricity_usage) * max(facility_daily_co2_factor))'
        },
        monthly: {
          key: 'facility_monthly_co2_lbs',
          formula:
            '(sum(facility_daily_electricity_usage) * sum(facility_daily_co2_factor))'
        },
        icon: 'WeatherCloud',
        tooltip:
          'Scope 2 CO2 Emissions, metric calculated using a facility-specific emissions factor and kWh consumed.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 0,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_daily_electricity_usage',
              unit: 'kWh',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'CO2 Factor',
              icon: 'TrendActivity',
              isNegativeIndicator: true,
              key: 'facility_daily_co2_factor',
              unit: '',
              significantDigits: 2,
              aggregateFunction: 'max'
            }
          ]
        }
      }
    },
    lineage_facility: {
      id: 'co2/lineage_facility',
      index: 8,
      slug: KPI_KEYS.CO2,
      config: {
        label: 'Scope 2 CO2 Emissions',
        unit: 'Tons CO2', // TODO: convert to plain text and parse with unit map in constants
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_daily_co2_tons',
          formula:
            '((sum(facility_daily_electricity_usage) * max(facility_daily_co2_factor)) / 2000)'
        },
        monthly: {
          key: 'facility_monthly_co2_tons',
          formula:
            '((sum(facility_daily_electricity_usage) * sum(facility_daily_co2_factor)) / 2000)'
        },
        icon: 'WeatherCloud',
        tooltip:
          'Scope 2 CO2 Emissions, metric calculated using a facility-specific emissions factor and kWh consumed.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 0,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_daily_electricity_usage',
              unit: 'kWh',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'CO2 Factor',
              icon: 'TrendActivity',
              isNegativeIndicator: true,
              key: 'facility_daily_co2_factor',
              unit: '',
              significantDigits: 2,
              aggregateFunction: 'max'
            }
          ]
        }
      }
    },
    default_org: {
      id: 'co2/default_org',
      index: 8,
      slug: KPI_KEYS.CO2,
      config: {
        label: 'Carbon Footprint',
        unit: 'Tons CO2',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'organization_monthly_co2_tons',
          formula: 'sum(facility_monthly_co2_tons)'
        },
        monthly: {
          key: 'organization_monthly_co2_tons',
          formula: 'sum(facility_monthly_co2_tons)'
        },
        icon: 'WeatherCloud',
        tooltip:
          'Scope 2 CO2 Emissions, metric calculated using a facility-specific emissions factor and kWh consumed.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 0,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total CO2',
              icon: 'WeatherCloud',
              isNegativeIndicator: true,
              key: 'facility_monthly_co2_tons',
              unit: 'Tons CO2',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    sfnt_org: {
      id: 'co2/sfnt_org',
      index: 8,
      slug: KPI_KEYS.CO2,
      config: {
        label: 'Carbon Footprint',
        unit: 'Lbs CO2',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'organization_monthly_co2_lbs',
          formula: 'sum(facility_monthly_co2_lbs)'
        },
        monthly: {
          key: 'organization_monthly_co2_lbs',
          formula: 'sum(facility_monthly_co2_lbs)'
        },
        icon: 'WeatherCloud',
        tooltip:
          'Scope 2 CO2 Emissions, metric calculated using a facility-specific emissions factor and kWh consumed.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 0,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total CO2',
              icon: 'WeatherCloud',
              isNegativeIndicator: true,
              key: 'facility_monthly_co2_lbs',
              unit: 'Lbs CO2',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    lineage_org: {
      id: 'co2/lineage_org',
      index: 8,
      slug: KPI_KEYS.CO2,
      config: {
        label: 'Scope 2 CO2 Emissions',
        unit: 'Tons CO2',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'organization_monthly_co2_tons',
          formula: 'sum(facility_monthly_co2_tons)'
        },
        monthly: {
          key: 'organization_monthly_co2_tons',
          formula: 'sum(facility_monthly_co2_tons)'
        },
        icon: 'WeatherCloud',
        tooltip:
          'Scope 2 CO2 Emissions, metric calculated using a facility-specific emissions factor and kWh consumed.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 0,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total CO2',
              icon: 'WeatherCloud',
              isNegativeIndicator: true,
              key: 'facility_monthly_co2_tons',
              unit: 'Tons CO2',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    }
  },
  co2_prod_normal: {
    default_facility: {
      id: 'co2_prod_normal/default_facility',
      index: 9,
      slug: KPI_KEYS.CO2_PROD_NORMALIZED,
      config: {
        label: 'Carbon Footprint (Production Normalized)',
        unit: 'Tons CO2/UOM',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_daily_co2_per_unit',
          formula:
            'sum(facility_daily_co2_tons) / sum(facility_daily_production_units)'
        },
        monthly: {
          key: 'facility_monthly_co2_per_unit',
          formula:
            'sum(facility_monthly_co2_tons) / sum(facility_monthly_production_units)'
        },
        icon: 'WeatherCloud',
        tooltip:
          'Scope 2 CO2 Emissions (Normalized by production units), metric calculated using a facility-specific emissions factor and kWh consumed divided by production units.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total CO2',
              icon: 'WeatherCloud',
              isNegativeIndicator: true,
              key: 'facility_daily_co2_tons',
              unit: 'Tons CO2',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Production Units',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_daily_production_units',
              unit: 'UOM',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    sfnt_facility: {
      id: 'co2_prod_normal/sfnt_facility',
      index: 9,
      slug: KPI_KEYS.CO2_PROD_NORMALIZED,
      config: {
        label: 'Carbon Footprint (Production Normalized)',
        unit: 'Grams CO₂/unit',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_daily_co2_per_unit',
          formula:
            'sum(facility_daily_co2_lbs) * 453.592 / sum(facility_daily_production_units)'
        },
        monthly: {
          key: 'facility_monthly_co2_per_unit',
          formula:
            'sum(facility_monthly_co2_lbs) * 453.592 / sum(facility_monthly_production_units)'
        },
        icon: 'WeatherCloud',
        tooltip:
          'Scope 2 CO2 Emissions (Normalized by production units), metric calculated using a facility-specific emissions factor and kWh consumed divided by production units.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total CO2',
              icon: 'WeatherCloud',
              isNegativeIndicator: true,
              key: 'facility_daily_co2_lbs',
              unit: 'Lbs CO2',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Production Units',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_daily_production_units',
              unit: 'unit',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    lineage_facility: {
      id: 'co2_prod_normal/lineage_facility',
      index: 9,
      slug: KPI_KEYS.CO2_PROD_NORMALIZED,
      config: {
        label: 'Scope 2 CO2 Emissions (Production Normalized)',
        unit: 'Tons CO2/kLbs',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_daily_co2_per_unit',
          formula:
            'sum(facility_daily_co2_tons) / (sum(facility_daily_inbound_volume) + sum(facility_daily_outbound_volume)) / 1000'
        },
        monthly: {
          key: 'facility_monthly_co2_per_unit',
          formula:
            'sum(facility_monthly_co2_tons) / (sum(facility_monthly_inbound_volume) + sum(facility_monthly_outbound_volume)) / 1000'
        },
        icon: 'WeatherCloud',
        tooltip:
          'Scope 2 CO2 Emissions (Normalized by production units), metric calculated using a facility-specific emissions factor and kWh consumed divided by production units.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total CO2',
              icon: 'WeatherCloud',
              isNegativeIndicator: true,
              key: 'facility_daily_co2_tons',
              unit: 'Tons CO2',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Inbound lbs',
              icon: 'WeightInbound',
              isNegativeIndicator: true,
              key: 'facility_daily_inbound_volume',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Outbound lbs',
              icon: 'WeightOutbound',
              isNegativeIndicator: true,
              key: 'facility_daily_outbound_volume',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    default_org: {
      id: 'co2_prod_normal/default_org',
      index: 9,
      slug: KPI_KEYS.CO2_PROD_NORMALIZED,
      config: {
        label: 'Carbon Footprint (Production Normalized)',
        unit: 'Tons CO2/UOM',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        // TODO: Summary hack again
        daily: {
          key: 'organization_monthly_co2_per_unit',
          formula:
            'sum(facility_monthly_co2_tons) / sum(facility_monthly_production_units)'
        },
        monthly: {
          key: 'organization_monthly_co2_per_unit',
          formula:
            'sum(facility_monthly_co2_tons) / sum(facility_monthly_production_units)'
        },
        icon: 'WeatherCloud',
        tooltip:
          'Scope 2 CO2 Emissions (Normalized by production units), metric calculated using a facility-specific emissions factor and kWh consumed divided by production units.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total CO2',
              icon: 'WeatherCloud',
              isNegativeIndicator: true,
              key: 'facility_monthly_co2_tons',
              unit: 'Tons CO2',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Production Units',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_production_units',
              unit: 'UOM',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    sfnt_org: {
      id: 'co2_prod_normal/sfnt_org',
      index: 9,
      slug: KPI_KEYS.CO2_PROD_NORMALIZED,
      config: {
        label: 'Carbon Footprint (Production Normalized)',
        unit: 'Grams CO₂/unit',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        // TODO: Summary hack again
        daily: {
          key: 'organization_monthly_co2_per_unit',
          formula:
            'sum(facility_monthly_co2_lbs) * 453.592 / sum(facility_monthly_production_units)'
        },
        monthly: {
          key: 'organization_monthly_co2_per_unit',
          formula:
            'sum(facility_monthly_co2_lbs) * 453.592 / sum(facility_monthly_production_units)'
        },
        icon: 'WeatherCloud',
        tooltip:
          'Scope 2 CO2 Emissions (Normalized by production units), metric calculated using a facility-specific emissions factor and kWh consumed divided by production units.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total CO2',
              icon: 'WeatherCloud',
              isNegativeIndicator: true,
              key: 'facility_monthly_co2_lbs',
              unit: 'Lbs CO2',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Production Units',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_production_units',
              unit: 'unit',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    lineage_org: {
      id: 'co2_prod_normal/lineage_org',
      index: 9,
      slug: KPI_KEYS.CO2_PROD_NORMALIZED,
      config: {
        label: 'Scope 2 CO2 Emissions (Production Normalized)',
        unit: 'Tons CO2/kLbs',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'organization_daily_co2_per_unit',
          formula:
            'sum(facility_daily_co2_tons) / (sum(facility_inbound_inbound_volume) + sum(facility_inbound_outbound_volume)) / 1000'
        },
        monthly: {
          key: 'organization_monthly_co2_per_unit',
          formula:
            'sum(facility_monthly_co2_tons) / (sum(facility_monthly_inbound_volume) + sum(facility_monthly_outbound_volume)) / 1000'
        },
        icon: 'WeatherCloud',
        tooltip:
          'Scope 2 CO2 Emissions (Normalized by production units), metric calculated using a facility-specific emissions factor and kWh consumed divided by production units.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total CO2',
              icon: 'WeatherCloud',
              isNegativeIndicator: true,
              key: 'facility_monthly_co2_tons',
              unit: 'Tons CO2',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Inbound lbs',
              icon: 'WeightInbound',
              isNegativeIndicator: true,
              key: 'facility_monthly_inbound_volume',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Outbound lbs',
              icon: 'WeightOutbound',
              isNegativeIndicator: true,
              key: 'facility_monthly_outbound_volume',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    }
  },
  electricity_prod_normal: {
    lineage_facility: {
      id: 'electricity_prod_normal/lineage_facility',
      index: 1,
      slug: KPI_KEYS.ELECTRICITY_PROD_NORMALIZED,
      config: {
        label: 'Throughput Efficiency',
        unit: 'kWh/kLbs',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_daily_kwh_per_lbs',
          formula:
            'sum(facility_daily_electricity_usage) / ((sum(facility_daily_inbound_volume) + sum(facility_daily_outbound_volume)) / 1000)'
        },
        monthly: {
          key: 'facility_monthly_kwh_per_lbs',
          formula:
            'sum(facility_monthly_electricity_usage) / ((sum(facility_monthly_inbound_volume) + sum(facility_monthly_outbound_volume)) / 1000)'
        },
        icon: 'WeightEnergy',
        tooltip:
          'Total facility energy consumption (in kWh) per 1000 pounds of combined inbound and outbound product volume.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        minimumDateInterval: 'day',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_daily_electricity_usage',
              unit: 'kWh',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Inbound lbs',
              icon: 'WeightInbound',
              isNegativeIndicator: true,
              key: 'facility_daily_inbound_volume',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Outbound lbs',
              icon: 'WeightOutbound',
              isNegativeIndicator: true,
              key: 'facility_daily_outbound_volume',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    lineage_org: {
      id: 'electricity_prod_normal/lineage_org',
      index: 1,
      slug: KPI_KEYS.ELECTRICITY_PROD_NORMALIZED,
      config: {
        label: 'Throughput Efficiency',
        unitPosition: 'postfix',
        unit: 'kWh/kLbs',
        isNegativeIndicator: true,
        daily: {
          key: 'organization_daily_kwh_per_lbs',
          formula:
            'sum(facility_daily_electricity_usage) / ((sum(facility_daily_inbound_volume) + sum(facility_daily_outbound_volume)) / 1000)'
        },
        monthly: {
          key: 'organization_monthly_kwh_per_lbs',
          formula:
            'sum(facility_monthly_electricity_usage) / (sum((sum(facility_monthly_inbound_volume) + sum(facility_monthly_outbound_volume))) / 1000)'
        },
        icon: 'Electricity',
        tooltip:
          'Total portfolio energy consumption (in kWh) per 1000 pounds of combined inbound and outbound product volume.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_electricity_usage',
              unit: 'kWh',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Inbound lbs',
              icon: 'WeightInbound',
              isNegativeIndicator: true,
              key: 'facility_monthly_inbound_volume',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Outbound lbs',
              icon: 'WeightOutbound',
              isNegativeIndicator: true,
              key: 'facility_monthly_outbound_volume',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    default_facility: {
      id: 'electricity_prod_normal/default_facility',
      index: 1,
      slug: KPI_KEYS.ELECTRICITY_PROD_NORMALIZED,
      config: {
        label: 'Throughput Efficiency',
        unitPosition: 'postfix',
        unit: 'kWh/UOM',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_daily_kwh_per_unit',
          formula:
            'sum(facility_daily_electricity_usage) / sum(facility_daily_production_units)'
        },
        monthly: {
          key: 'facility_monthly_kwh_per_unit',
          formula:
            'sum(facility_monthly_electricity_usage) / sum(facility_monthly_production_units)'
        },
        icon: 'Electricity',
        tooltip:
          'Total facility energy consumption (in kWh) per production unit',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_daily_electricity_usage',
              unit: 'kWh',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Production Units',
              icon: 'WeightInbound',
              isNegativeIndicator: true,
              key: 'facility_daily_production_units',
              unit: 'UOM',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    default_org: {
      id: 'electricity_prod_normal/default_org',
      index: 1,
      slug: KPI_KEYS.ELECTRICITY_PROD_NORMALIZED,
      config: {
        label: 'Throughput Efficiency',
        unitPosition: 'postfix',
        unit: 'kWh/UOM',
        isNegativeIndicator: true,
        daily: {
          key: 'organization_daily_kwh_per_unit',
          formula:
            'sum(facility_daily_electricity_usage) / sum(facility_daily_production_units)'
        },
        monthly: {
          key: 'organization_monthly_kwh_per_unit',
          formula:
            'sum(facility_monthly_electricity_usage) / sum(facility_monthly_production_units)'
        },
        icon: 'Electricity',
        tooltip:
          'Total portfolio energy consumption (in kWh) per production unit',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_electricity_usage',
              unit: 'kWh',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Production Units',
              icon: 'WeightInbound',
              isNegativeIndicator: true,
              key: 'facility_monthly_production_units',
              unit: 'UOM',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    }
  },
  energy_prod_normal: {
    sfnt_facility: {
      id: 'energy_prod_normal/sfnt_facility',
      index: 1,
      slug: KPI_KEYS.ENERGY_PROD_NORMALIZED,
      config: {
        label: 'Throughput Efficiency',
        unitPosition: 'postfix',
        unit: 'GJ/MCE',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_daily_energy_per_unit',
          formula:
            'sum(facility_daily_energy_usage) / sum(facility_daily_production_units)'
        },
        monthly: {
          key: 'facility_monthly_energy_per_unit',
          formula:
            'sum(facility_monthly_energy_usage) / sum(facility_monthly_production_units)'
        },
        icon: 'Electricity',
        tooltip:
          'Total facility energy consumption (in GJ) per production unit (in MCE)',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_daily_energy_usage',
              unit: 'GJ',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Production Units',
              icon: 'WeightInbound',
              isNegativeIndicator: true,
              key: 'facility_daily_production_units',
              unit: 'MCE',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    default_facility: {
      id: 'energy_prod_normal/default_facility',
      index: 1,
      slug: KPI_KEYS.ENERGY_PROD_NORMALIZED,
      config: {
        label: 'Throughput Efficiency',
        unitPosition: 'postfix',
        unit: 'kJ/UOM',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_daily_energy_per_unit',
          formula:
            'sum(facility_daily_energy_usage) / sum(facility_daily_production_units)'
        },
        monthly: {
          key: 'facility_monthly_energy_per_unit',
          formula:
            'sum(facility_monthly_energy_usage) / sum(facility_monthly_production_units)'
        },
        icon: 'Electricity',
        tooltip:
          'Total facility energy consumption (in kJ) per production unit',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_daily_energy_usage',
              unit: 'kJ',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Production Units',
              icon: 'WeightInbound',
              isNegativeIndicator: true,
              key: 'facility_daily_production_units',
              unit: 'UOM',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    sfnt_org: {
      id: 'energy_prod_normal/sfnt_org',
      index: 1,
      slug: KPI_KEYS.ENERGY_PROD_NORMALIZED,
      config: {
        label: 'Throughput Efficiency',
        unitPosition: 'postfix',
        unit: 'GJ/MCE',
        isNegativeIndicator: true,
        daily: {
          key: 'organization_daily_energy_per_unit',
          formula:
            'sum(facility_daily_energy_usage) / sum(facility_daily_production_units)'
        },
        monthly: {
          key: 'organization_monthly_energy_per_unit',
          formula:
            'sum(facility_monthly_energy_usage) / sum(facility_monthly_production_units)'
        },
        icon: 'Electricity',
        tooltip:
          'Total portfolio energy consumption (in GJ) per production unit (in MCE)',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_energy_usage',
              unit: 'GJ',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Production Units',
              icon: 'WeightInbound',
              isNegativeIndicator: true,
              key: 'facility_monthly_production_units',
              unit: 'MCE',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    default_org: {
      id: 'energy_prod_normal/default_org',
      index: 1,
      slug: KPI_KEYS.ENERGY_PROD_NORMALIZED,
      config: {
        label: 'Throughput Efficiency',
        unitPosition: 'postfix',
        unit: 'kJ/UOM',
        isNegativeIndicator: true,
        daily: {
          key: 'organization_daily_energy_per_unit',
          formula:
            'sum(facility_daily_energy_usage) / sum(facility_daily_production_units)'
        },
        monthly: {
          key: 'organization_monthly_energy_per_unit',
          formula:
            'sum(facility_monthly_energy_usage) / sum(facility_monthly_production_units)'
        },
        icon: 'Electricity',
        tooltip:
          'Total portfolio energy consumption (in kJ) per production unit',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_energy_usage',
              unit: 'kJ',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Production Units',
              icon: 'WeightInbound',
              isNegativeIndicator: true,
              key: 'facility_monthly_production_units',
              unit: 'UOM',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    }
  },
  electricity_revenue_normal: {
    default_facility: {
      id: 'electricity_revenue_normal/default_facility',
      index: 3,
      slug: KPI_KEYS.ELECTRICITY_REVENUE_NORMALIZED,
      config: {
        label: 'Revenue Efficiency',
        unit: 'kWh/$',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_daily_kwh_per_revenue',
          formula:
            'sum(facility_daily_electricity_usage) / sum(facility_daily_revenue)'
        },
        monthly: {
          key: 'facility_monthly_kwh_per_revenue',
          formula:
            'sum(facility_monthly_electricity_usage) / sum(facility_monthly_revenue)'
        },
        icon: 'MoneyEnergy',
        tooltip:
          'Total facility energy consumption (in kWh) per dollar (USD) of revenue reported for the month.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        minimumDateInterval: 'day',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_daily_electricity_usage',
              unit: 'kWh',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Revenue',
              icon: 'Dollar',
              isNegativeIndicator: true,
              key: 'facility_daily_revenue',
              unit: 'USD',
              significantDigits: 2,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    default_org: {
      id: 'electricity_revenue_normal/default_org',
      index: 3,
      slug: KPI_KEYS.ELECTRICITY_REVENUE_NORMALIZED,
      config: {
        label: 'Revenue Efficiency',
        unitPosition: 'postfix',
        unit: 'kWh/$',
        isNegativeIndicator: true,
        daily: {
          key: 'organization_daily_kwh_per_revenue',
          formula:
            'sum(facility_daily_electricity_usage) / sum(facility_daily_revenue)'
        },
        monthly: {
          key: 'organization_monthly_kwh_per_revenue',
          formula:
            'sum(facility_monthly_electricity_usage) / sum(facility_monthly_revenue)'
        },
        icon: 'MoneyEnergy',
        tooltip:
          'Total portfolio energy consumption (in kWh) per dollar (USD) of revenue reported for the month.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_electricity_usage',
              unit: 'kWh',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Revenue',
              icon: 'Dollar',
              isNegativeIndicator: true,
              key: 'facility_monthly_revenue',
              unit: 'USD',
              significantDigits: 2,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    }
  },
  electricity_space_normal: {
    default_facility_cubic_feet: {
      id: 'electricity_space_normal/default_facility_cubic_feet',
      index: 0,
      slug: KPI_KEYS.ELECTRICITY_SPACE_NORMALIZED,
      config: {
        label: 'Space Efficiency',
        unit: 'kWh/ft3',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_daily_kwh_per_cuft',
          formula:
            'sum(facility_daily_electricity_usage) / max(facility_daily_cubic_footage)'
        },
        monthly: {
          key: 'facility_monthly_kwh_per_cuft',
          formula:
            'sum(facility_daily_electricity_usage) / max(facility_daily_cubic_footage)',
          breakdown: {
            facility_daily_cubic_footage: 'max(facility_daily_cubic_footage)'
          }
        },
        icon: 'Gauge',
        tooltip:
          'Total facility energy consumption (kWh) per cubic foot of facility volume.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        minimumDateInterval: 'day',
        significantDigits: 5,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_daily_electricity_usage',
              unit: 'kWh',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Cubic Feet',
              icon: 'Building',
              isNegativeIndicator: false,
              key: 'facility_daily_cubic_footage',
              unit: 'cuft',
              significantDigits: 0,
              aggregateFunction: 'max'
            }
          ]
        }
      }
    },
    default_org_cubic_feet: {
      id: 'electricity_space_normal/default_org_cubic_feet',
      index: 0,
      slug: KPI_KEYS.ELECTRICITY_SPACE_NORMALIZED,
      config: {
        label: 'Space Efficiency',
        unitPosition: 'postfix',
        unit: 'kWh/ft3',
        isNegativeIndicator: true,
        daily: {
          key: 'organization_daily_kwh_per_cuft',
          formula:
            'sum(facility_daily_electricity_usage) / max(facility_daily_cubic_footage)'
        },
        monthly: {
          key: 'organization_monthly_kwh_per_cuft',
          formula:
            'sum(facility_monthly_electricity_usage) / max(facility_monthly_cubic_footage)',
          breakdown: {
            facility_monthly_cubic_footage:
              'max(facility_monthly_cubic_footage)'
          }
        },
        icon: 'Gauge',
        tooltip:
          'Total portfolio energy consumption (kWh) per cubic foot of facility volume.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 5,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_electricity_usage',
              unit: 'kWh',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Cubic Feet',
              icon: 'Building',
              isNegativeIndicator: false,
              key: 'facility_monthly_cubic_footage',
              unit: 'cuft',
              significantDigits: 0,
              aggregateFunction: 'max'
            }
          ]
        }
      }
    }
  },
  energy_cost_prod_normal: {
    lineage_facility: {
      id: 'energy_cost_prod_normal/lineage_facility',
      index: 2,
      slug: KPI_KEYS.ENERGY_COST_PROD_NORMALIZED,
      config: {
        label: 'Throughput Energy Cost',
        unit: '$/kLbs',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'facility_daily_energy_spend_per_lbs',
          formula:
            'sum(facility_daily_electricity_spend) / ((sum(facility_daily_inbound_volume) + sum(facility_daily_outbound_volume)) / 1000)'
        },
        monthly: {
          key: 'facility_monthly_energy_spend_per_lbs',
          // TODO: can these be monthly?
          formula:
            'sum(facility_daily_electricity_spend) / ((sum(facility_daily_inbound_volume) + sum(facility_daily_outbound_volume)) / 1000)'
        },
        icon: 'WeightMoney',
        tooltip:
          'Total facility energy spend (in USD) per 1000 pounds of combined inbound and outbound product volume.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        minimumDateInterval: 'day',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Spend',
              icon: 'Dollar',
              isNegativeIndicator: false,
              key: 'facility_daily_electricity_spend',
              unit: 'USD',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Inbound lbs',
              icon: 'WeightInbound',
              isNegativeIndicator: true,
              key: 'facility_daily_inbound_volume',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Outbound lbs',
              icon: 'WeightOutbound',
              isNegativeIndicator: true,
              key: 'facility_daily_outbound_volume',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    lineage_org: {
      id: 'energy_cost_prod_normal/lineage_org',
      slug: KPI_KEYS.ENERGY_COST_PROD_NORMALIZED,
      config: {
        label: 'Throughput Energy Cost',
        unit: '$/kLbs',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        daily: {
          key: 'organization_daily_energy_spend_per_lbs',
          formula:
            'sum(facility_daily_electricity_spend) / (sum((sum(facility_daily_inbound_volume) + sum(facility_daily_outbound_volume))) / 1000)'
        },
        monthly: {
          key: 'organization_monthly_energy_spend_per_lbs',
          formula:
            'sum(facility_monthly_electricity_spend) / (sum((sum(facility_monthly_inbound_volume) + sum(facility_monthly_outbound_volume))) / 1000)'
        },
        icon: 'WeightMoney',
        tooltip:
          'Total portfolio energy spend (in USD) per 1000 pounds of combined inbound and outbound product volume.',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Spend',
              icon: 'Dollar',
              isNegativeIndicator: false,
              key: 'facility_monthly_electricity_spend',
              unit: 'USD',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Inbound lbs',
              icon: 'WeightInbound',
              isNegativeIndicator: true,
              key: 'facility_monthly_inbound_volume',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Outbound lbs',
              icon: 'WeightOutbound',
              isNegativeIndicator: true,
              key: 'facility_monthly_outbound_volume',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    }
  },
  // TODO: eui may not make sense in the breakdown table unless we explain what's happening (per Asher),
  //  and possibly use avg rather than sum

  // TODO: we are mixing square foot calculations and cubic foot calculations for these.  Probably not a good idea
  eui: {
    sfnt_facility_square_feet: {
      id: 'eui/sfnt_facility_square_feet',
      index: 0,
      slug: KPI_KEYS.EUI,
      config: {
        label: 'Square Foot EUI',
        unitPosition: 'postfix',
        unit: 'kJ/ft2',
        isNegativeIndicator: true,
        daily: {
          // TODO: this looks like a hack to make summary work?
          key: 'facility_monthly_square_foot_eui',
          formula:
            'facility_monthly_rolling_year_energy_usage / facility_monthly_rolling_year_square_footage',
          breakdown: {
            facility_monthly_rolling_year_square_footage:
              'max(facility_monthly_rolling_year_square_footage)'
          }
        },
        monthly: {
          key: 'facility_monthly_square_foot_eui',
          formula:
            'facility_monthly_rolling_year_energy_usage / facility_monthly_rolling_year_square_footage',
          breakdown: {
            facility_monthly_rolling_year_square_footage:
              'max(facility_monthly_rolling_year_square_footage)'
          }
        },
        icon: 'Gauge',
        tooltip: 'Facility EUI.',
        interval: 86400000,
        compareBy: 'date',
        minimumDateInterval: 'monthly',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 0,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Square Feet',
              icon: 'Building',
              isNegativeIndicator: false,
              key: 'facility_monthly_rolling_year_square_footage',
              unit: 'sqft',
              significantDigits: 0,
              aggregateFunction: 'max'
            },
            {
              name: '12-Month Rolling kJ',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_rolling_year_energy_usage',
              unit: 'kJ',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    default_facility_square_feet: {
      id: 'eui/default_facility_square_feet',
      index: 0,
      slug: KPI_KEYS.EUI,
      config: {
        label: 'Square Foot EUI',
        unitPosition: 'postfix',
        unit: 'kBtu/ft2',
        isNegativeIndicator: true,
        daily: {
          // TODO: this looks like a hack to make summary work?
          key: 'facility_monthly_square_foot_eui',
          formula:
            'facility_monthly_rolling_year_energy_usage / facility_monthly_rolling_year_square_footage',
          breakdown: {
            facility_monthly_rolling_year_square_footage:
              'max(facility_monthly_rolling_year_square_footage)'
          }
        },
        monthly: {
          key: 'facility_monthly_square_foot_eui',
          formula:
            'facility_monthly_rolling_year_energy_usage / facility_monthly_rolling_year_square_footage',
          breakdown: {
            facility_monthly_rolling_year_square_footage:
              'max(facility_monthly_rolling_year_square_footage)'
          }
        },
        icon: 'Gauge',
        tooltip: 'Facility EUI.',
        interval: 86400000,
        compareBy: 'date',
        minimumDateInterval: 'monthly',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 0,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Square Feet',
              icon: 'Building',
              isNegativeIndicator: false,
              key: 'facility_monthly_rolling_year_square_footage',
              unit: 'sqft',
              significantDigits: 0,
              aggregateFunction: 'max'
            },
            {
              name: '12-Month Rolling KBTU',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_rolling_year_energy_usage',
              unit: 'kBtu',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    default_facility_cubic_feet: {
      id: 'eui/default_facility_cubic_feet',
      index: 0,
      slug: KPI_KEYS.EUI,
      config: {
        label: 'Cubic Foot EUI',
        unitPosition: 'postfix',
        unit: 'kBtu/ft3',
        isNegativeIndicator: true,
        daily: {
          // TODO: this looks like a hack to make summary work?
          key: 'facility_monthly_cubic_foot_eui',
          formula:
            'rolling_year_energy_usage / facility_monthly_rolling_year_cubic_footage',
          breakdown: {
            facility_monthly_rolling_year_square_footage:
              'max(facility_monthly_rolling_year_cubic_footage)'
          }
        },
        monthly: {
          key: 'facility_monthly_cubic_foot_eui',
          formula:
            'rolling_year_energy_usage / facility_monthly_rolling_year_cubic_footage',
          breakdown: {
            facility_monthly_rolling_year_square_footage:
              'max(facility_monthly_rolling_year_cubic_footage)'
          }
        },
        icon: 'Gauge',
        tooltip: 'Facility EUI.',
        interval: 86400000,
        compareBy: 'date',
        minimumDateInterval: 'monthly',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 0,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Cubic Feet',
              icon: 'Building',
              isNegativeIndicator: false,
              key: 'facility_monthly_rolling_year_cubic_footage',
              unit: 'cuft',
              significantDigits: 0,
              aggregateFunction: 'max'
            },
            {
              name: '12-Month Rolling KBTU',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_rolling_year_energy_usage',
              unit: 'kBtu',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    },
    sfnt_org_square_feet: {
      id: 'eui/sfnt_org_square_feet',
      index: 0,
      slug: KPI_KEYS.EUI,
      config: {
        label: 'Square Foot EUI',
        unitPosition: 'postfix',
        unit: 'kJ/ft2',
        isNegativeIndicator: true,
        daily: {
          // TODO: this looks like a hack to make summary work?
          key: 'organization_daily_square_foot_eui',
          formula:
            'sum(facility_monthly_rolling_year_energy_usage) / max(facility_monthly_rolling_year_square_footage)',
          breakdown: {
            facility_monthly_rolling_year_square_footage:
              'max(facility_monthly_rolling_year_square_footage)'
          }
        },
        monthly: {
          key: 'organization_monthly_square_foot_eui',
          formula:
            'sum(facility_monthly_rolling_year_energy_usage) / max(facility_monthly_rolling_year_square_footage)',
          breakdown: {
            facility_monthly_rolling_year_square_footage:
              'max(facility_monthly_rolling_year_square_footage)'
          }
        },
        icon: 'Gauge',
        tooltip: 'Organization EUI.',
        interval: 86400000,
        compareBy: 'date',
        minimumDateInterval: 'monthly',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 0,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Square Feet',
              icon: 'Building',
              isNegativeIndicator: false,
              key: 'facility_monthly_rolling_year_square_footage',
              unit: 'sqft',
              significantDigits: 0,
              aggregateFunction: 'max'
            },
            {
              name: '12-Month Rolling kJ',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_rolling_year_energy_usage',
              unit: 'kJ',
              significantDigits: 0,
              aggregateFunction: 'avg'
            }
          ]
        }
      }
    },
    default_org_square_feet: {
      id: 'eui/default_org_square_feet',
      index: 0,
      slug: KPI_KEYS.EUI,
      config: {
        label: 'Square Foot EUI',
        unitPosition: 'postfix',
        unit: 'kBtu/ft2',
        isNegativeIndicator: true,

        daily: {
          // TODO: this looks like a hack to make summary work?
          key: 'organization_daily_square_foot_eui',
          formula:
            'sum(facility_monthly_rolling_year_energy_usage) / max(facility_monthly_rolling_year_square_footage)',
          breakdown: {
            facility_monthly_rolling_year_square_footage:
              'max(facility_monthly_rolling_year_square_footage)'
          }
        },
        monthly: {
          key: 'organization_monthly_square_foot_eui',
          formula:
            'sum(facility_monthly_rolling_year_energy_usage) / max(facility_monthly_rolling_year_square_footage)',
          breakdown: {
            facility_monthly_rolling_year_square_footage:
              'max(facility_monthly_rolling_year_square_footage)'
          }
        },
        icon: 'Gauge',
        tooltip: 'Organization EUI.',
        interval: 86400000,
        compareBy: 'date',
        minimumDateInterval: 'monthly',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 0,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Square Feet',
              icon: 'Building',
              isNegativeIndicator: false,
              key: 'facility_monthly_rolling_year_square_footage',
              unit: 'sqft',
              significantDigits: 0,
              aggregateFunction: 'max'
            },
            {
              name: '12-Month Rolling KBTU',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_rolling_year_energy_usage',
              unit: 'kBtu',
              significantDigits: 0,
              aggregateFunction: 'sum'
            }
          ]
        }
      }
    }
  },
  load_factor: {
    default_facility: {
      id: 'load_factor/default_facility',
      index: 1,
      slug: KPI_KEYS.LOAD_FACTOR,
      config: {
        label: 'Load Factor',
        unitPosition: 'postfix',
        unit: '%',
        isNegativeIndicator: false,
        daily: {
          key: 'facility_daily_load_factor',
          formula:
            '(facility_daily_electricity_usage / (facility_daily_demand * 24)) * 100'
        },
        monthly: {
          key: 'facility_monthly_load_factor',
          formula:
            '(sum(facility_daily_electricity_usage) / (max(facility_daily_demand) * daysInMonthToDate(end_date) * 24)) * 100'
        },
        icon: 'Electricity',
        tooltip: 'Ratio of usage (kWh) to peak demand',
        interval: 86400000,
        compareBy: 'date',
        changeLanguage: {
          positive: 'More Efficient',
          negative: 'Less Efficient'
        },
        chartType: 'areaspline',
        significantDigits: 2,
        minimumDateInterval: 'day',
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Total Energy Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_daily_electricity_usage',
              unit: 'kWh',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Daily Demand',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_daily_demand',
              unit: 'kW',
              significantDigits: 2,
              aggregateFunction: 'max'
            }
          ]
        }
      }
    }
  },
  // NOTE: this is a unique config and uses custom logic in display implementation to work correctly
  //  for charts
  kwh_budget: {
    default_facility: {
      id: 'kwh_budget/default_facility',
      index: 9,
      slug: KPI_KEYS.KWH_BUDGET,
      config: {
        label: 'Daily kWh Budget',
        unit: 'kWh',
        unitPosition: 'postfix',
        isNegativeIndicator: true,
        primaryMetric: 'facility_monthly_electricity_usage',
        comparisonMetric: 'facility_daily_rolling_month_cuml_kwh_budget',
        additionalMetrics: [
          {
            metric: 'facility_daily_remaining_kwh_budget',
            isPlotline: false,
            chartType: 'column'
          },
          {
            metric: 'facility_daily_rolling_month_avg_electricity_usage',
            isPlotline: true,
            chartType: 'line'
          }
        ],
        daily: {
          key: 'facility_daily_kwh_budget',
          formula:
            'sum(facility_daily_electricity_usage)/(facility_daily_rolling_month_cuml_kwh_budget / daysInMonthToDate(end_date)) * 100'
        },
        monthly: {
          key: 'facility_monthly_kwh_budget',
          formula: 'sum(facility_monthly_kwh_budget)'
        },
        icon: 'MoneyEnergy',
        tooltip:
          "The actual cumulative kWh usage for the last month compared to that month's set monthly kWh budget. Actual kWh comes from hardware on the main meters in the facility. The set monthly budget is provided by the customer.",
        interval: 86400000,
        compareBy: 'metric',
        changeLanguage: {
          positive: 'Under Budget',
          negative: 'Over Budget'
        },
        chartType: 'column',
        significantDigits: 2,
        detail: {
          chartType: 'areaspline',
          breakdown: [
            {
              name: 'Daily kWh Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              // TODO, needs to be daily, requires custom logic to change, but used by Summary.  See note below
              key: 'facility_daily_electricity_usage',
              unit: 'kWh',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'kWh Budget',
              icon: 'MoneyEnergy',
              isNegativeIndicator: false,
              key: 'facility_daily_kwh_budget',
              unit: '$',
              significantDigits: 2,
              aggregateFunction: 'sum'
            },
            {
              name: 'Total Production Units',
              icon: 'Weight',
              isNegativeIndicator: true,
              key: 'facility_daily_production_units',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum'
            },
            {
              // NOTE: this is used in DetailKpiSummarySeriesItem to determine a summary item label
              //  the "hide" prop was added so that we know not to display in the breakdown
              name: 'Cumulative Daily Budget',
              icon: 'WeightOutbound',
              isNegativeIndicator: true,
              key: 'facility_daily_rolling_month_cuml_kwh_budget',
              unit: 'lbs',
              significantDigits: 0,
              aggregateFunction: 'sum',
              hide: true
            },
            {
              name: 'Daily kWh Usage',
              icon: 'Electricity',
              isNegativeIndicator: false,
              key: 'facility_monthly_electricity_usage',
              unit: 'kWh',
              significantDigits: 2,
              aggregateFunction: 'sum',
              hide: true
            }
          ]
        }
      }
    }
  }
};
