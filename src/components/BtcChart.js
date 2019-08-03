import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class BtcChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { btcArray } = this.props
    return (
      <div>
        <h3>BTC CHART</h3>
        {btcArray.length ? <LineChart
          width={1000}
          height={500}
          data={btcArray}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeStamp" style={{fontSize: '14px'}} />
          <YAxis dataKey="amount" style={{fontSize: '14px'}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart> : 'LOADING CHARTS...' }
      </div>
    );
  }
}
