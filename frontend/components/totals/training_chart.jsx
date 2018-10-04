import React from 'react';
import * as ConversionUtil from "./../../util/conversion_util";
import { CartesianGrid, LabelList, ScatterChart, Scatter, Line, XAxis, YAxis, ZAxis, Tooltip, Legend, Bar} from 'recharts';
import * as ChartUtil from "./../../util/chart_util";

const ActivityChart = ({week, activities, activityType, metric}) => {

  function renderTooltip(props) {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div style={{ backgroundColor: 'white', border: '1px solid #999', margin: 0, padding: 10, fontSize: 12, }}>
          <p>Activity: {data.title}</p>
          <p><span>distance: </span>{data.distance}mi</p>
          <p><span>time: </span>{ConversionUtil.activityChartTime(data.duration)}</p>
        </div>
      );
    }

    return null;
  }

  function renderDotLabel (props) {
    const {x, y, fill, value, position, height} = props;
    const displayLabel = () => (
      <text
         x={x}
         y={y}
         dy={height/1.7}
         dx={height/1.95}
         fontSize='12'
         fontFamily='Roboto, sans-serif'
         fill='black'
         textAnchor="middle">
         {
           metric === 'distance' ? value : ConversionUtil.activityChartTime(value)
         }
       </text>
     );
   const hideLabel = () => (
     <text
        x={x}
        y={y}
        dy={-4}
        fontSize='12'
        fontFamily='sans-serif'
        fill='#adadad'
        textAnchor="middle">Rest</text>
    );

    if(height >= 40) {
      return displayLabel();
    } else if (height > 0) {
      return null;
    } else {
      return hideLabel();
    }
  }

  function domain() {
    return ChartUtil.parseDomain(activities, metric)
  }

  function getVal() {
    return metric
  }

  return(
    <div>
      <ScatterChart width={790} height={160} margin={{top: 80, right: 0, bottom: 0, left: 0}}>
        <XAxis type="category" dataKey="weekday" interval={0} tick={{ fontSize: 0 }} tickLine={{ transform: 'translate(0, -52)', stroke: "#adadad", strokeDasharray: "2 2" }} tickSize={52} axisLine={{ stroke: "#adadad", strokeDasharray: "2 2" }} />
        <YAxis type="number" dataKey="index" name={week[0].formattedDate.getDate()} height={40} width={20} tick={false} tickLine={false} axisLine={false} />
        <ZAxis type="number" dataKey={getVal()} domain={domain} range={[0, 2500]} />
        <Tooltip cursor={{strokeDasharray: '3 3'}} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
        <Scatter data={week} fill='#ffcf88'>
          <LabelList dataKey={getVal()} position='center' content={renderDotLabel} />
        </Scatter>
      </ScatterChart>
    </div>
  )
}

export default ActivityChart;
