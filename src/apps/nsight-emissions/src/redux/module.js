import comparisonReducer from './comparisonReducer';
import primaryReducer from './primaryReducer';

function getEmissionsModule() {
  return {
    id: 'emissions',
    reducerMap: {
      comparisonEmissions: comparisonReducer,
      primaryEmissions: primaryReducer
    }
  };
}

export default getEmissionsModule;
