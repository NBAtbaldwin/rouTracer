import React from 'react';
import ReactDOM from 'react-dom';
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import * as ElevationUtil from './../../util/elevation_util';

const ElevationGraph = ({elevationArray, distance}) => {
  const yFormatter = (value) => `${value}ft`;
  const xFormatter = (value) => `${value}mi`;
  elevationArray = ElevationUtil.makeElevationObject(elevationArray, distance);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={elevationArray}
        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="miles" tickFormatter={xFormatter}  tickSize={4} axisLine={{ stroke: "#adadad" }} minTickGap={100} fontSize="12" tick={{ fill: '#999' }} />
        <YAxis tickFormatter={yFormatter} fontSize="12" tick={{ fill: '#999' }} axisLine={{ stroke: "#adadad" }} />
        <Tooltip/>
        <Area type='monotone' dataKey='elevation' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ElevationGraph;
