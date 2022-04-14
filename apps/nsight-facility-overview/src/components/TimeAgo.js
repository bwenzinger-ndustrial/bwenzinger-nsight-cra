import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export const TIME_AGO_INTERVAL = 30000;

moment.locale('custom-time-ago', {});
moment.locale('en');

function TimeAgo({ date, refreshTime, timeFormats }) {
  const [timeAgo, setTimeAgo] = React.useState(moment(date).fromNow());
  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentLocale = moment.locale();

      if (timeFormats) {
        moment.updateLocale('custom-time-ago', {
          relativeTime: {
            ...timeFormats
          }
        });

        moment.locale('custom-time-ago');
      }

      setTimeAgo(moment(date).fromNow());

      moment.locale(currentLocale);
    }, refreshTime);
    return () => clearInterval(interval);
  }, [date, refreshTime, timeFormats]);

  return <time>{timeAgo}</time>;
}

TimeAgo.defaultProps = {
  refreshTime: TIME_AGO_INTERVAL
};

TimeAgo.propTypes = {
  date: PropTypes.number,
  refreshTime: PropTypes.number,
  timeFormats: PropTypes.shape({
    s: PropTypes.string
  })
};

export default TimeAgo;
