import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'qs';

function useQueryParams(ignoreQueryPrefix = true) {
  const { search } = useLocation();

  return useMemo(() => {
    return queryString.parse(search, { ignoreQueryPrefix });
  }, [ignoreQueryPrefix, search]);
}

export default useQueryParams;
