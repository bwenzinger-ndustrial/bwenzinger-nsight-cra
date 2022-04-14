const kpiConfigs = require('./kpiConfig');

module.exports = {
  facility_page: {
    sfnt: {
      _identifier: 'santa-fe facility',
      rows: [
        {
          columns: [
            kpiConfigs.eui.default_facility_square_feet,
            kpiConfigs.electricity_prod_normal.default_facility,
            kpiConfigs.co2.default_facility,
            kpiConfigs.co2_prod_normal.default_facility
          ]
        }
      ]
    },
    lineage: {
      _identifier: 'lineage-org',
      rows: [
        {
          columns: [
            kpiConfigs.electricity_space_normal.default_facility_cubic_feet,
            kpiConfigs.electricity_prod_normal.lineage_facility,
            kpiConfigs.energy_cost_prod_normal.lineage_facility,
            kpiConfigs.electricity_revenue_normal.default_facility,
            kpiConfigs.actual_vs_planned.default_facility,
            kpiConfigs.co2.lineage_facility,
            kpiConfigs.kwh_budget.default_facility
          ]
        }
      ]
    },
    trenton: {
      _identifier: 'trenton-org',
      rows: [
        {
          columns: [
            kpiConfigs.electricity_space_normal.default_facility_cubic_feet,
            kpiConfigs.electricity_prod_normal.default_facility,
            kpiConfigs.energy_cost_prod_normal.lineage_facility,
            kpiConfigs.electricity_revenue_normal.default_facility,
            kpiConfigs.actual_vs_planned.default_facility,
            kpiConfigs.co2.default_facility
          ]
        }
      ]
    },
    ndustrial: {
      _identifier: 'ndustial-org',
      rows: [
        {
          columns: [
            kpiConfigs.eui.default_facility_square_feet,
            kpiConfigs.eui.default_facility_cubic_feet,
            kpiConfigs.electricity_prod_normal.lineage_facility,
            kpiConfigs.energy_cost_prod_normal.lineage_facility,
            kpiConfigs.electricity_revenue_normal.default_facility,
            kpiConfigs.actual_vs_planned.default_facility
          ]
        }
      ]
    },
    default: {
      rows: [
        {
          columns: [
            kpiConfigs.electricity_space_normal.default_facility_cubic_feet,
            kpiConfigs.electricity_prod_normal.lineage_facility,
            kpiConfigs.energy_cost_prod_normal.lineage_facility,
            kpiConfigs.electricity_revenue_normal.default_facility,
            kpiConfigs.actual_vs_planned.default_facility
          ]
        }
      ]
    }
  },
  portfolio_page: {
    lineage: {
      _identifier: 'lineage-org',
      rows: [
        {
          columns: [
            kpiConfigs.electricity_space_normal.default_org_cubic_feet,
            kpiConfigs.electricity_prod_normal.lineage_org,
            kpiConfigs.energy_cost_prod_normal.lineage_org,
            kpiConfigs.electricity_revenue_normal.default_org,
            kpiConfigs.actual_vs_planned.default_org,
            kpiConfigs.co2.lineage_org
          ]
        }
      ]
    },
    sfnt: {
      _identifier: 'santa-fe-org',
      rows: [
        {
          columns: [
            kpiConfigs.eui.default_org_square_feet,
            kpiConfigs.electricity_prod_normal.default_org,
            kpiConfigs.co2.default_org,
            kpiConfigs.co2_prod_normal.default_org
          ]
        }
      ]
    },
    default: {
      rows: [
        {
          columns: [
            kpiConfigs.electricity_space_normal.default_org_cubic_feet,
            kpiConfigs.electricity_prod_normal.default_org,
            kpiConfigs.energy_cost_prod_normal.lineage_org,
            kpiConfigs.electricity_revenue_normal.default_org,
            kpiConfigs.actual_vs_planned.default_org
          ]
        }
      ]
    }
  }
};
