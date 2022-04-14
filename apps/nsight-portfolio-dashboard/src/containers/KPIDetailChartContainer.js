import { connect } from 'react-redux';

import KPIDetailChart from '@ndustrial/nsight-common/components/KPI/KPIDetailChart';
import {
  getPortfolioComparisonDetail,
  getPortfolioPrimaryDetail
} from '@ndustrial/nsight-common/selectors';

const mapStateToProps = (state) => ({
  primaryData: getPortfolioPrimaryDetail(state),
  secondaryData: getPortfolioComparisonDetail(state),
  comparisonDates: state.portfolioComparisonDetail.comparisonDates,
  primaryDates: state.portfolioPrimaryDetail.primaryDates,
  isPortfolio: true
});

export default connect(mapStateToProps)(KPIDetailChart);
