import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useQueryParams } from '@ndustrial/nsight-common/hooks';
import { getSearchString } from '@ndustrial/nsight-common/utils';

import DetailTable from '../components/TableView/DetailTable';
import {
  getCPDates,
  getDetailTableInfo,
  getTableExport
} from '../redux/selectors';

function DetailTableContainer() {
  const history = useHistory();
  const { visibleDate } = useQueryParams();

  const detailInfo = useSelector(getDetailTableInfo);
  const selectedDates = useSelector(getCPDates);
  const tableExport = useSelector(getTableExport);

  const exportData = useCallback(() => {
    const anchor = document.createElement('a');

    anchor.setAttribute('download', tableExport.title);
    anchor.setAttribute(
      'href',
      `data:text/csv;charset=utf-8,${encodeURI(tableExport.data)}`
    );
    anchor.setAttribute('target', '_blank');

    anchor.click();
  }, [tableExport]);

  useEffect(() => {
    const availableDates = Object.keys(detailInfo.dates);
    const hasValidVisibleDate = !!(
      visibleDate && availableDates.indexOf(visibleDate) >= 0
    );

    if (!hasValidVisibleDate && selectedDates.from) {
      history.push({
        search: getSearchString({
          addParams: {
            visibleDate: selectedDates.from.format('YYYY-MM-DD')
          },
          searchString: history.location.search
        })
      });
    }
  }, [detailInfo.dates, history, selectedDates.from, visibleDate]);

  return (
    <DetailTable
      detailInfo={detailInfo}
      exportData={exportData}
      selectedDates={selectedDates}
      visibleDate={visibleDate}
    />
  );
}

export default DetailTableContainer;
