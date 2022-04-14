import { connect } from 'react-redux';

import Summary from '../components/Summary/Summary';
import getSelectedAssetType from '../redux/selectors/getSelectedAssetType';
import getSummaryValues from '../redux/selectors/getSummaryValues';

const mapStateToProps = (state) => {
  return {
    comparisonEmissions: state.comparisonEmissions,
    primaryEmissions: state.primaryEmissions,
    selectedAssetType: getSelectedAssetType(state),
    summary: getSummaryValues(state)
  };
};

export default connect(mapStateToProps)(Summary);
