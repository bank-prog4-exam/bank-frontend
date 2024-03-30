"use client"
import React, { PureComponent } from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  ZoomAndPan,
} from '@devexpress/dx-react-chart-material-ui';

interface DataItem {
  x: number;
  y: number;
}

const generateData = (n: number): DataItem[] => {
  const ret: DataItem[] = [];
  let y = 0;
  for (let i = 0; i < n; i += 1) {
    y += Math.round(Math.random() * 10 - 5);
    ret.push({ x: i, y });
  }
  return ret;
};
const data: DataItem[] = generateData(100);

interface State {
  viewport: any; 
}

export default class Demo2 extends PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      viewport: undefined,
    };
    this.viewportChange = this.viewportChange.bind(this);
  }

  viewportChange(viewport: any) {
    this.setState({ viewport });
  }

  render() {
    const { viewport } = this.state;
    return (
      <Paper>
        <h1 className=" font-bold">The sum of expenses and income :</h1>
        <br />
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />

          <LineSeries valueField="y" argumentField="x" />
          <ZoomAndPan viewport={viewport} onViewportChange={this.viewportChange} />
        </Chart>
      </Paper>
    );
  }
}
