import portfolioMetadataReducer from './reducer';

function getPortfolioMetadataModule() {
  return {
    id: 'portfolioMetadata',
    reducerMap: {
      portfolioMetadata: portfolioMetadataReducer
    }
  };
}

export default getPortfolioMetadataModule;
