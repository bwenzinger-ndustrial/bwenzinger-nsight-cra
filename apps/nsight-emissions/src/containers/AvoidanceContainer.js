import { connect } from 'react-redux';

import Avoidance from '../components/avoidance/Avoidance';
import getAvoidanceValue from '../redux/selectors/getAvoidanceValue';
import getSelectedAssetType from '../redux/selectors/getSelectedAssetType';

const mapStateToProps = (state) => {
  return {
    comparisonEmissions: state.comparisonEmissions,
    primaryEmissions: state.primaryEmissions,
    selectedAssetType: getSelectedAssetType(state),
    avoidance: getAvoidanceValue(state)
  };
};

export default connect(mapStateToProps)(Avoidance);
