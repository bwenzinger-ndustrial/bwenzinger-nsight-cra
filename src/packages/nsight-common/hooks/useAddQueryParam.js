import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import getSearchString from '../utils/getSearchString';

export const useAddQueryParam = () => {
  const history = useHistory();

  return useCallback(
    (newParam) => {
      const searchOptions = {
        addParams: newParam,
        searchString: history.location.search
      };
      const search = getSearchString(searchOptions);
      return history.push({ search });
    },
    [history]
  );
};
