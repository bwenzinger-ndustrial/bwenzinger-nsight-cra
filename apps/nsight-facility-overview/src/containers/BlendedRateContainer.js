import { connect } from 'react-redux';

import { getSelectedFacility } from '@ndustrial/nsight-common/selectors';

import BlendedRate from '../components/BlendedRate';
import { getBlendedRateData } from '../redux/blendedRate/actions';
import {
  getBlendedRate,
  getBlendedRateAvg
} from '../redux/blendedRate/selectors';

const mapStateToProps = (state) => ({
  blendedRate: getBlendedRate(state),
  blendedRateAverage: getBlendedRateAvg(state),
  selectedFacility: getSelectedFacility(state)
});

const mapDispatchToProps = {
  getBlendedRateData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlendedRate);
