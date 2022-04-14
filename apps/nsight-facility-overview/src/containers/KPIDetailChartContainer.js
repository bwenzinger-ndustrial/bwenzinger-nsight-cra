import { connect } from 'react-redux';

import KPIDetailChart from '@ndustrial/nsight-common/components/KPI/KPIDetailChart';
import {
  getComparisonDetail,
  getPrimaryDetail
} from '@ndustrial/nsight-common/selectors';

import { getKpiDetailChartDataStatus } from '../redux/detail/selectors';

const mapStateToProps = (state) => ({
  hasNoData: getKpiDetailChartDataStatus(state),
  primaryData: getPrimaryDetail(state),
  secondaryData: getComparisonDetail(state),
  comparisonDates: state.comparisonDetail.comparisonDates,
  primaryDates: state.primaryDetail.primaryDates,
  isRealTimeEnabled: state.facilities && state.facilities.isRealTimeEnabled,
  useIndexForXAxisValue: true
});

export default connect(mapStateToProps)(KPIDetailChart);
