import React from 'react';
import { useSelector } from 'react-redux';

import Graph from '../components/Graph';
import { getCoincidentPeak } from '../redux/selectors';

function GraphContainer() {
  const coincidentPeak = useSelector(getCoincidentPeak);

  return <Graph chartOptions={coincidentPeak} />;
}

export default GraphContainer;
