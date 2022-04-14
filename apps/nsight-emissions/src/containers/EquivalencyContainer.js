import { connect } from 'react-redux';

import Equivalency from '../components/Equivalency';

const mapStateToProps = (state) => {
  return {
    comparisonEmissions: state.comparisonEmissions,
    primaryEmissions: state.primaryEmissions
  };
};

export default connect(mapStateToProps)(Equivalency);
