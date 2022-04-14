import React, { useCallback } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import { useHistory } from 'react-router-dom';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import queryString from 'qs';
import styled from 'styled-components';

import { MultiCalendarComparisonWidget } from '@ndustrial/nd-date-picker-react';
import { getSearchString } from '@ndustrial/nsight-common/utils';

const OptionsWrapper = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  background-color: #fff;
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  border-bottom: 1px solid #d8d8d8;
  display: block;
  top: 100%;
  width: 100%;
  z-index: 10;
  height: 120px;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: flex;
    align-items: center;
    position: relative;
    top: 0;
    height: 65px;
  }
`;

const MenuHeader = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${rem('14px')};
  font-weight: 700;
  letter-spacing: ${rem('0.5px')};
  padding: 20px 0 20px 18px;
  text-align: center;
  text-transform: uppercase;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: inline-block;
  }
`;

const MultiCalendarWrapper = styled.div`
  display: flex;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    height: 42px;
  }
`;

const propTypes = {
  className: PropTypes.string,
  comparisonDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }).isRequired,
  pickerRange: PropTypes.string.isRequired,
  primaryDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }).isRequired,
  resetComparisonEmissionsData: PropTypes.func.isRequired,
  resetPrimaryEmissionsData: PropTypes.func.isRequired,
  setComparisonDates: PropTypes.func.isRequired,
  setPrimaryDates: PropTypes.func.isRequired
};

function DateSelector({
  className,
  comparisonDates,
  pickerRange,
  primaryDates,
  resetComparisonEmissionsData,
  resetPrimaryEmissionsData,
  setComparisonDates,
  setPrimaryDates
}) {
  const history = useHistory();

  const queryParams = queryString.parse(location.search, {
    ignoreQueryPrefix: true
  });

  // updates query params for comparison dates
  const updateComparisonQueryParams = useCallback(
    (startDate) => {
      const { location } = history;
      const searchOptions = {
        searchString: location.search
      };

      if (startDate) {
        searchOptions.addParams = {
          comparisonStart: startDate.startOf(pickerRange).format('YYYY-MM-DD')
        };
      } else {
        searchOptions.removeParams = ['comparisonStart'];
      }

      const search = getSearchString(searchOptions);
      history.replace({ search });
    },
    [history, pickerRange]
  );

  // when the primary range changes, if the number of primary days is different than the number of comparison days, reset comparison data and remove from query params
  // if number of days remain the same, keep the comparison data
  const updatePrimaryQueryParams = useCallback(
    (startDate, endDate) => {
      const { location } = history;
      const searchOptions = {
        searchString: location.search
      };

      if (startDate && endDate) {
        const primaryEnd = endDate
          .utc()
          .endOf(pickerRange)
          .format('YYYY-MM-DD');
        const primaryStart = startDate.format('YYYY-MM-DD');

        if (
          primaryEnd !== queryParams.primaryEnd ||
          primaryStart !== queryParams.primaryStart
        ) {
          searchOptions.addParams = {
            primaryEnd,
            primaryStart
          };

          if (
            !comparisonDates.from ||
            !comparisonDates.to ||
            startDate.diff(endDate, pickerRange) !==
              comparisonDates.from.diff(comparisonDates.to, pickerRange)
          ) {
            searchOptions.removeParams = ['comparisonStart'];
            resetComparisonEmissionsData();
          }
        }
      } else {
        searchOptions.removeParams = [
          'comparisonStart',
          'primaryStart',
          'primaryEnd'
        ];
        resetPrimaryEmissionsData();
        resetComparisonEmissionsData();
      }

      const search = getSearchString(searchOptions);
      history.replace({ search });
    },
    [
      comparisonDates.from,
      comparisonDates.to,
      history,
      pickerRange,
      queryParams.primaryEnd,
      queryParams.primaryStart,
      resetComparisonEmissionsData,
      resetPrimaryEmissionsData
    ]
  );

  const onPrimaryDatesChange = useCallback(
    ({ from, to }) => {
      setPrimaryDates({ from, to });
      updatePrimaryQueryParams(from, to);
    },
    [setPrimaryDates, updatePrimaryQueryParams]
  );

  const onComparisonDatesChange = useCallback(
    ({ from, to }) => {
      setComparisonDates({ from, to: to ? to.endOf(pickerRange) : null });
      updateComparisonQueryParams(from);
    },
    [pickerRange, setComparisonDates, updateComparisonQueryParams]
  );

  return (
    <OptionsWrapper className={className}>
      <MenuHeader>Select Date Range(s)</MenuHeader>

      <MultiCalendarWrapper>
        <MultiCalendarComparisonWidget
          calendarType={pickerRange}
          primaryDates={primaryDates}
          comparisonDates={comparisonDates}
          onComparisonDatesChange={onComparisonDatesChange}
          onPrimaryDatesChange={onPrimaryDatesChange}
          label={''}
          autoFillComparisonRangeEndDate={true}
        />
      </MultiCalendarWrapper>
    </OptionsWrapper>
  );
}

DateSelector.propTypes = propTypes;

export default DateSelector;
