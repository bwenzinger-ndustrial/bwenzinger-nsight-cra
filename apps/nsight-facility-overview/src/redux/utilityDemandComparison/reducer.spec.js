import { expect } from 'chai';

import actionTypes from './actionTypes';
import reducer, { INITIAL_STATE } from './reducer';

describe('nsight-facility-overview/redux/utilityDemandComparison/reducer', function() {
  it('returns the initial state', function() {
    expect(reducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe(`${actionTypes.UTILITY_DEMAND_GET_CURRENT_SUCCESS}`, function() {
    it('only uses electric statements', function() {
      const nextState = reducer(INITIAL_STATE, {
        type: actionTypes.UTILITY_DEMAND_GET_CURRENT_SUCCESS,
        payload: {
          account_charges: [],
          meter_charges: [
            {
              service_type: 'electric',
              summary: {
                '2020-01': {
                  $: {},
                  kW: {
                    'Demand (MAX)': 100
                  },
                  kWh: { Usage: 1000 }
                }
              }
            },
            {
              service_type: 'gas'
            }
          ]
        }
      });

      expect(Object.keys(nextState.demand).length).to.equal(1);
      expect(nextState.demand['2020-01']).to.equal(100);
    });

    it('handles an alternative case', function() {
      const nextState = reducer(INITIAL_STATE, {
        type: actionTypes.UTILITY_DEMAND_GET_CURRENT_SUCCESS,
        payload: {
          account_charges: [],
          meter_charges: [
            {
              service_type: 'electric',
              summary: {
                '2020-01': {
                  $: {},
                  kW: {
                    'Demand (Max)': 100
                  },
                  kWh: { Usage: 1000 }
                }
              }
            },
            {
              service_type: 'gas'
            }
          ]
        }
      });

      expect(Object.keys(nextState.demand).length).to.equal(1);
      expect(nextState.demand['2020-01']).to.equal(100);
    });

    it('accumulates multiple statements', function() {
      const nextState = reducer(INITIAL_STATE, {
        type: actionTypes.UTILITY_DEMAND_GET_CURRENT_SUCCESS,
        payload: {
          account_charges: [],
          meter_charges: [
            {
              service_type: 'electric',
              summary: {
                '2020-01': {
                  $: {},
                  kW: {
                    'Demand (Max)': 100
                  },
                  kWh: { Usage: 1000 }
                }
              }
            },
            {
              service_type: 'electric',
              summary: {
                '2020-01': {
                  $: {},
                  kW: {
                    'Demand (Max)': 100
                  },
                  kWh: { Usage: 1000 }
                }
              }
            }
          ]
        }
      });

      expect(Object.keys(nextState.demand).length).to.equal(1);
      expect(nextState.demand['2020-01']).to.equal(200);
    });
  });

  describe('SET_SELECTED_FACILITY_SLUG', function() {
    let nextState;
    beforeEach(function() {
      reducer(INITIAL_STATE, {
        type: actionTypes.UTILITY_DEMAND_GET_CURRENT_SUCCESS,
        payload: {
          account_charges: [],
          meter_charges: [
            {
              service_type: 'electric',
              summary: {
                '2020-01': {
                  $: {},
                  kW: {
                    'Demand (MAX)': 100
                  },
                  kWh: { Usage: 1000 }
                }
              }
            },
            {
              service_type: 'gas'
            }
          ]
        }
      });

      nextState = reducer(INITIAL_STATE, {
        type: 'SET_SELECTED_FACILITY_SLUG'
      });
    });

    it('resets to the initial state', function() {
      expect(nextState).to.deep.equal(INITIAL_STATE);
    });
  });
});
