import actionTypes from '../../actions/kpiConfigActionTypes';
import createLoadingStatusSelector from '../createLoadingStatusSelector';

export default createLoadingStatusSelector('dashboard', [
  actionTypes.LOAD_KPI_CONFIG
]);
