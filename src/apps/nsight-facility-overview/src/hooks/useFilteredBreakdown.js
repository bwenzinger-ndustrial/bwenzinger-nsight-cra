import { useMemo } from 'react';

export default (breakdown) => {
  return useMemo(() => {
    return breakdown?.filter((breakdown) => !breakdown.hide) ?? [];
  }, [breakdown]);
};
