import { connect } from 'react-redux';

import { getSelectedFacilityId } from '@ndustrial/nsight-common/selectors';

import UtilityDemandComparisonChart from '../components/FacilityDashboard/Utility/DemandComparisonChart';
import { getUtilityDemandComparisonData } from '../redux/utilityDemandComparison/actions';
import {
  getUtilityDemandComparison,
  getUtilityDemandSummary,
  getUtilityDemandUnit
} from '../redux/utilityDemandComparison/selectors';

const mapStateToProps = (state) => ({
  utilityDemandComparison: getUtilityDemandComparison(state),
  utilityDemandSummary: getUtilityDemandSummary(state),
  utilityDemandUnit: getUtilityDemandUnit(state),
  facilityId: getSelectedFacilityId(state)
});

const mapDispatchToProps = {
  getUtilityDemandComparisonData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UtilityDemandComparisonChart);
