const getApplicationGroupings = (state) =>
  state.applications ? state.applications.groupings : [];

export default getApplicationGroupings;
