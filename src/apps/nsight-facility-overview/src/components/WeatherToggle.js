import React, { useState } from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  FormControlLabel,
  RadioButton,
  RadioGroup
} from '@ndustrial/nd-inputs-react';
import weatherUtils from '@ndustrial/nsight-common/charts/weather/weatherUtils';

const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  margin: -40px 0 16px 40px;
`;

const RadioFormControlLabel = styled(FormControlLabel)`
  span {
    font-size: ${rem('12px')};
    font-weight: 700;
  }
`;

const InlineRadio = styled(RadioGroup)`
  z-index: 20;
`;

const propTypes = {
  chartRef: PropTypes.object.isRequired,
  initialWeatherView: PropTypes.string.isRequired
};

function WeatherToggle({ chartRef, initialWeatherView }) {
  const [value, setValue] = useState(initialWeatherView.toLowerCase());

  return (
    <RadioButtonContainer>
      <InlineRadio
        id="weather"
        inline
        onChange={(e) => {
          const thisVal = e.currentTarget.value;
          setTimeout(() => {
            weatherUtils.onWeatherChange(thisVal, chartRef.current.chart);
          });
          setValue(e.currentTarget.value);
        }}
        value={value}
      >
        <RadioFormControlLabel
          control={(props) => <RadioButton {...props} />}
          value="high"
          label="Daily High"
        />
        <RadioFormControlLabel
          control={(props) => <RadioButton {...props} />}
          value="low"
          label="Daily Low"
        />
      </InlineRadio>
    </RadioButtonContainer>
  );
}

WeatherToggle.propTypes = propTypes;

export default WeatherToggle;
