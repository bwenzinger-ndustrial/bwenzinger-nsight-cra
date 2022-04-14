import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

const propTypes = {
  chartOptions: PropTypes.object
};

function Graph({ chartOptions }) {
  const chartComponent = React.createRef();

  Highcharts.setOptions({
    lang: {
      thousandsSep: ','
    },
    time: {
      useUTC: false
    }
  });

  return (
    <HighchartsReact
      constructorType="chart"
      containerProps={{ style: { height: '100%', width: '100%' } }}
      highcharts={Highcharts}
      options={chartOptions}
      ref={chartComponent}
    />
  );
}

Graph.propTypes = propTypes;

export default Graph;
