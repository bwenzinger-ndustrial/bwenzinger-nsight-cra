import React, { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

require('highcharts/modules/map')(Highcharts);

function createChartFactory(chartName, marginTop = '40px') {
  const Chart = ({ chartOptions }) => {
    const chartRef = useRef(null);

    return (
      <HighchartsReact
        constructorType={'chart'}
        containerProps={{
          style: { height: '300px', width: '100%', marginTop: marginTop }
        }}
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartRef}
      />
    );
  };

  Chart.displayName = `${chartName}Chart`;
  Chart.propTypes = {
    chartOptions: PropTypes.object
  };

  return Chart;
}

export default createChartFactory;
