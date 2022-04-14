import queryString from 'qs';

function getSearchString({
  searchString = '',
  addParams = {},
  removeParams = []
}) {
  const currentParams = queryString.parse(searchString, {
    ignoreQueryPrefix: true
  });

  const filteredParams = removeParams.reduce((result, param) => {
    const { [param]: omit, ...rest } = result;
    return rest;
  }, currentParams);

  const newParams = {
    ...filteredParams,
    ...addParams
  };

  return queryString.stringify(newParams);
}

export default getSearchString;
