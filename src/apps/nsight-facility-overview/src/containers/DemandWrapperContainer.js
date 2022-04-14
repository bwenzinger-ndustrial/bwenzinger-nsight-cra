import { connect } from 'react-redux';

import { getSelectedFacility } from '@ndustrial/nsight-common/selectors';

import DemandWrapper from '../components/DemandWrapper';
import { getDailyKwhData } from '../redux/dailyKwh/actions';
import { getKwhData } from '../redux/dailyKwh/selectors';
import { getDemandView } from '../redux/dashboard/selectors';
import { getDemandComparisonData } from '../redux/demandComparison/actions';
import { getDemandComparison } from '../redux/demandComparison/selectors';
import { getHeatmapData } from '../redux/demandHeatmap/actions';
import {
  getDailyHeatmapData,
  getWeeklyHeatmapData
} from '../redux/demandHeatmap/selectors';
import { getDemandUnits } from '../redux/facilityMetadata/selectors';

const mapStateToProps = (state) => {
  return {
    demandComparison: getDemandComparison(state),
    dailyHeatmapDemand: getDailyHeatmapData(state),
    dailyKwh: getKwhData(state),
    facility: getSelectedFacility(state),
    selectedDemandView: getDemandView(state),
    weeklyHeatmapDemand: getWeeklyHeatmapData(state),
    demandUnits: getDemandUnits(state)
  };
};

const mapDispatchToProps = {
  getDailyKwhData,
  getDemandComparisonData,
  getHeatmapData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemandWrapper);
