import React from 'react';
import { Helmet } from 'react-helmet';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const BtcChart = (props) => {
  const { btcArray } = props;
  return (
    <div>
      <Helmet>
        <title>BTC TRANSACION | BTC STATUS </title>
      </Helmet>
      <h3>BTC CHART</h3>
      {btcArray.length ? (
        <LineChart
          width={1000}
          height={500}
          data={btcArray}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timeStamp" style={{ fontSize: '14px' }} />
          <YAxis dataKey="amount" style={{ fontSize: '14px' }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      ) : (
        'GETTING BTC VALUE...'
      )}
    </div>
  );
};
export default BtcChart;
