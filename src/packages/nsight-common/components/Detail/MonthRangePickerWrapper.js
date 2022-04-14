import React, { useEffect, useState } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import PropTypes from 'prop-types';

import { MonthPicker } from '@ndustrial/nd-date-picker-react';

const propTypes = {
  onRangeChange: PropTypes.func.isRequired,
  range: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  })
};

function MonthRangePickerWrapper(props) {
  const { onRangeChange, range } = props;

  const [dateRange, setDateRange] = useState(range);

  const onDatesChange = ({ startDate, endDate }) => {
    setDateRange({ from: startDate, to: endDate });

    if (startDate && endDate) {
      onRangeChange({ from: startDate, to: endDate });
    }
  };

  useEffect(() => {
    setDateRange(range);
  }, [range]);

  return <MonthPicker range={dateRange} onSetRange={onDatesChange} />;
}

MonthRangePickerWrapper.propTypes = propTypes;
export default MonthRangePickerWrapper;
