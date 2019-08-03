import React from 'react';
import { Helmet } from 'react-helmet';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const classes = {
  root: {
    width: '100%',
  },
  paper: {
    // marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    // marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
};

export default class FindBtc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btcAmount: '',
      error: '',
      outputArray: [],
    };
  }

  _handleBtcValue = (ev) => {
    this.setState({
      btcAmount: ev.target.value,
      error: '',
    });
  };

  _findBtc = () => {
    const { btcAmount } = this.state;
    const amountRegex = /^[+-]?\d+(\.\d+)?$/.test(btcAmount);
    if (amountRegex) {
      this._getValue(btcAmount);
    } else {
      this.setState({
        error: 'Please Enter Valid Number. eg(12,1.2,0.12)',
        outputArray: [],
      });
    }
  };

  _getValue = (btcAmount) => {
    const { btcArray } = this.props;
    const outputArray = [];
    let newArray = btcArray.slice();
    let count = 0;
    while (count < 3 && newArray.length) {
      const ouput = newArray.reduce((prev, curr) => {
        if (
          Math.abs(curr.amount - btcAmount) < Math.abs(prev.amount - btcAmount)
        ) {
          return curr;
        }
        return prev;
      });
      newArray = newArray.filter((item) => {
        if (item.id !== ouput.id) {
          return item;
        }
        return false;
      });
      outputArray.push(ouput);
      count += 1;
    }
    this.setState({
      outputArray,
    });
  };

  render() {
    const { btcAmount, error, outputArray } = this.state;
    return (
      <div>
        <Helmet>
          <title>BTC TRANSACION | Find Your COIN</title>
        </Helmet>
        <h3>Find BTC by Value</h3>
        <TextField
          id="standard-search"
          label="Enter Amount"
          type="search"
          margin="normal"
          onChange={this._handleBtcValue}
          value={btcAmount}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this._findBtc}
          className="findBtcButton"
        >
          Find BTC
        </Button>
        <p className="error">{error}</p>
        <div style={classes.root}>
          <Paper style={classes.paper}>
            <Table style={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>HASH</TableCell>
                  <TableCell>AMOUNT</TableCell>
                  <TableCell>TIME STAMP</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {outputArray.map(btc => (
                  <TableRow key={btc.id}>
                    <TableCell>{btc.id}</TableCell>
                    <TableCell>{btc.amount}</TableCell>
                    <TableCell>{btc.timeStamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}
