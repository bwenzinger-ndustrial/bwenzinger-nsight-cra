const kpiConfigs = require('./kpiConfig');

module.exports = {
  facility_page: {
    allentown_181: {
      _identifier: 'allentown-facility',
      rows: [
        {
          columns: [
            kpiConfigs.electricity_space_normal.default_facility_cubic_feet,
            kpiConfigs.actual_vs_planned.default_facility,
            kpiConfigs.co2.lineage_facility
          ]
        }
      ]
    },
    jackson_170: {
      _identifier: 'jackson-facility',
      rows: [
        {
          columns: [
            kpiConfigs.electricity_space_normal.default_facility_cubic_feet,
            kpiConfigs.energy_cost_prod_normal.lineage_facility,
            kpiConfigs.actual_vs_planned.default_facility,
            kpiConfigs.co2.lineage_facility
          ]
        }
      ]
    },
    'tar-heel_172': {
      _identifier: 'tar-heel-facility',
      rows: [
        {
          columns: [
            kpiConfigs.energy_cost_prod_normal.lineage_facility,
            kpiConfigs.eui.default_facility_cubic_feet
          ]
        }
      ]
    },
    sfnt: {
      _identifier: 'santa-fe-org',
      rows: [
        {
          columns: [
            kpiConfigs.eui.sfnt_facility_square_feet,
            kpiConfigs.co2.sfnt_facility,
            kpiConfigs.energy_prod_normal.sfnt_facility,
            kpiConfigs.co2_prod_normal.sfnt_facility
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
            kpiConfigs.co2_prod_normal.lineage_facility,
            // [
            //   kpiConfigs.kwh_budget.default_facility,
            //   kpiConfigs.kwh_budget.default_facility
            // ]
            kpiConfigs.kwh_budget.default_facility
          ]
        }
      ]
    },
    'raleigh-hq': {
      _identifier: 'raleigh-hq-facility',
      rows: [
        {
          columns: [
            kpiConfigs.eui.default_facility_square_feet,
            kpiConfigs.eui.default_facility_cubic_feet,
            kpiConfigs.load_factor.default_facility
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
            kpiConfigs.co2.lineage_org,
            kpiConfigs.co2_prod_normal.lineage_org
          ]
        }
      ]
    },
    sfnt: {
      _identifier: 'santa-fe-org',
      rows: [
        {
          columns: [
            kpiConfigs.eui.sfnt_org_square_feet,
            kpiConfigs.co2.sfnt_org,
            kpiConfigs.energy_prod_normal.sfnt_org,
            kpiConfigs.co2_prod_normal.sfnt_org
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
