import comparisonReducer from './comparisonReducer';
import primaryReducer from './primaryReducer';

function getDetailModule() {
  return {
    id: 'portfolioDetail',
    reducerMap: {
      portfolioComparisonDetail: comparisonReducer,
      portfolioPrimaryDetail: primaryReducer
    }
  };
}

export default getDetailModule;
