import actionTypes from './actionTypes';

const lowerCaseProperties = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key.toLowerCase()] = value;
    return acc;
  }, {});
};

const accumulateField = (obj, field) => {
  if (!obj) return 0;

  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (key.toLowerCase().includes(field)) {
      acc += value;
    }
    return acc;
  }, 0);
};

const INITIAL_STATE = {
  error: null
};

function utilityDemandReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.UTILITY_DEMAND_GET_CURRENT_SUCCESS:
      let unit = 'kW';
      let sawKw = false;
      let sawKva = false;
      let sawKvar = false;
      let sawKwh = false;
      let demand;
      let usage;

      const demandMap = action.payload.meter_charges.reduce(
        (acc, meterData) => {
          if (meterData.service_type === 'electric') {
            for (let [key, meterSummary] of Object.entries(meterData.summary)) {
              meterSummary = lowerCaseProperties(meterSummary);

              const currentKwDemand = acc.kw[key] ? acc.kw[key] : 0;
              const currentKvaDemand = acc.kva[key] ? acc.kva[key] : 0;
              const currentKvarDemand = acc.kvar[key] ? acc.kvar[key] : 0;
              const currentKwhUsage = acc.kwh[key] ? acc.kwh[key] : 0;
              const nextKwDemand = accumulateField(
                meterSummary.kw,
                'demand (max)'
              );
              const nextKvaDemand = accumulateField(
                meterSummary.kva,
                'demand (max)'
              );
              const nextKvarDemand = accumulateField(
                meterSummary.kvar,
                'demand (max)'
              );
              const nextKwhUsage = accumulateField(meterSummary.kwh, 'usage');
              sawKw = sawKw ? true : nextKwDemand !== 0;
              sawKva = sawKva ? true : nextKvaDemand !== 0;
              sawKvar = sawKvar ? true : nextKvarDemand !== 0;
              sawKwh = sawKwh ? true : nextKwhUsage !== 0;

              acc.kw[key] = currentKwDemand + nextKwDemand;
              acc.kva[key] = currentKvaDemand + nextKvaDemand;
              acc.kvar[key] = currentKvarDemand + nextKvarDemand;
              acc.kwh[key] = currentKwhUsage + nextKwhUsage;
            }
          }
          return acc;
        },
        {
          kw: {},
          kva: {},
          kvar: {},
          kwh: {}
        }
      );

      if (sawKw) {
        unit = 'kw';
        demand = demandMap.kw;
      } else if (sawKva) {
        unit = 'kva';
        demand = demandMap.kva;
      } else if (sawKvar) {
        unit = 'kvar';
        demand = demandMap.kvar;
      } else if (sawKwh) {
        unit = 'kwh';
        usage = demandMap.kwh;
      }

      return {
        ...state,
        error: null,
        demand,
        usage,
        unit
      };

    case actionTypes.UTILITY_DEMAND_MAX_GET_LAST_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case 'SET_SELECTED_FACILITY_SLUG': {
      return {
        ...INITIAL_STATE
      };
    }

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default utilityDemandReducer;
