// MyGaugeChart.js

import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts';

const MyGaugeChart = ({value, valueMax}) => {
    
  return (
    <Gauge
      value={value}
      valueMax={valueMax}
      startAngle={-110}
      endAngle={110}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
          transform: 'translate(0px, 0px)',
          color: '#000', // Change the color of the value text here
        },
        [`& .${gaugeClasses.root}`]: {
          backgroundColor: '#f0f0f0', // Background color of the gauge
        },
        [`& .${gaugeClasses.track}`]: {
          backgroundColor: '#e0e0e0', // Color of the gauge track
        },
        [`& .${gaugeClasses.fill}`]: {
          backgroundColor: '#3f51b5', // Color of the filled part of the gauge
        },
      }}
      text={({ value, valueMax }) => `$${value} / $${valueMax}`}
   
    />
  );
};

export default MyGaugeChart;