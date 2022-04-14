import actionTypes from '../../actions/kpiConfigActionTypes';
import createCompletionStatusSelector from '../createCompletionStatusSelector';

export default createCompletionStatusSelector('dashboard', [
  actionTypes.LOAD_KPI_CONFIG
]);
