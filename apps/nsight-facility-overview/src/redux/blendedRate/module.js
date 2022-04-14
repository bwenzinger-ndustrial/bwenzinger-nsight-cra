import reducer from './reducer';

function getBlendedRateModule() {
  return {
    id: 'blendedRate',
    reducerMap: {
      blendedRate: reducer
    }
  };
}

export default getBlendedRateModule;
