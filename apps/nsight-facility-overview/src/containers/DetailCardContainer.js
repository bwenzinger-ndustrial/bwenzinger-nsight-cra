import { connect } from 'react-redux';

import {
  getComparisonDetail,
  getPrimaryDetail
} from '@ndustrial/nsight-common/selectors';

import DetailCard from '../components/FacilityDetail/DetailCard';

const mapStateToProps = (state) => {
  return {
    comparisonDates: {
      from:
        state.comparisonDetail.comparisonDates.from &&
        state.comparisonDetail.comparisonDates.from.toDate(),
      to:
        state.comparisonDetail.comparisonDates.to &&
        state.comparisonDetail.comparisonDates.to.toDate()
    },
    comparisonDetail: getComparisonDetail(state),
    primaryDates: {
      from:
        state.primaryDetail.primaryDates.from &&
        state.primaryDetail.primaryDates.from.toDate(),
      to:
        state.primaryDetail.primaryDates.to &&
        state.primaryDetail.primaryDates.to.toDate()
    },
    primaryDetail: getPrimaryDetail(state),
    weather: state.weather
  };
};

export default connect(mapStateToProps)(DetailCard);
