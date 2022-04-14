import facilityMetadataReducer from './reducer';

function getFacilityMetadataModule() {
  return {
    id: 'facilityMetadata',
    reducerMap: {
      facilityMetadata: facilityMetadataReducer
    }
  };
}

export default getFacilityMetadataModule;
