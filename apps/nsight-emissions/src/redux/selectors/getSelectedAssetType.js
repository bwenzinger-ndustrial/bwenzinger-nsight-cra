import { createSelector } from 'reselect';

const getSelectedFacility = (state) => state.facilities.selectedSlug;

const getSelectedAssetType = createSelector(
  getSelectedFacility,
  (selectedFacility) => {
    let selectedAssetType = null;

    if (selectedFacility) {
      selectedAssetType = 'facility';
    } else {
      selectedAssetType = 'organization';
    }

    return selectedAssetType;
  }
);

export default getSelectedAssetType;
