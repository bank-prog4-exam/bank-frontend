"use client"
import React, { PureComponent } from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  LineSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale } from '@devexpress/dx-react-chart';

interface DataItem {
  month: string;
  sale: number;
  total: number;
}

interface State {
  data: DataItem[];
}

export default class Demo1 extends PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [
        { month: 'Jan', sale: 50, total: 987 },
        { month: 'Feb', sale: 100, total: 3000 },
        { month: 'March', sale: 30, total: 1100 },
        { month: 'April', sale: 107, total: 7100 },
        { month: 'May', sale: 95, total: 4300 },
        { month: 'June', sale: 150, total: 7500 },
      ],
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
       <h1 className=" font-bold">The sum of amounts by category :</h1>
       <br />
        <Chart
          data={chartData}
        >
          <ValueScale name="sale" />
          <ValueScale name="total" />

          <ArgumentAxis />
          <ValueAxis scaleName="sale" showGrid={false} showLine showTicks />
          <ValueAxis scaleName="total" position="right" showGrid={false} showLine showTicks />

          <BarSeries
            name="Total amount by month"
            valueField="sale"
            argumentField="month"
            scaleName="sale"
          />

          <LineSeries
            name="Total amount by catégories"
            valueField="total"
            argumentField="month"
            scaleName="total"
          />
          
          <Legend />
        </Chart>
      </Paper>
    );
  }
}
