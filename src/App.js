import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch, NavLink } from 'react-router-dom';

import './App.scss';

let websocket;

const BtcChart = Loadable({
  loader: () => import(/* webpackChunkName: "btcChart" */ './components/BtcChart'),
  loading: () => <div>loading page...</div>,
  modules: ['btcChart'],
});

const FindBtc = Loadable({
  loader: () => import(/* webpackChunkName: "findBtc" */ './components/FindBtc'),
  loading: () => <div>loading another page...</div>,
  modules: ['findBtc'],
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionStatus: 'Connecting...',
      btcArray: [],
    };
  }

  componentDidMount = () => {
    window.addEventListener('online', this._restart);
    window.addEventListener('offline', this._stop);

    websocket = new WebSocket('wss://ws.blockchain.info/inv');

    websocket.onopen = () => {
      this.setState({
        connectionStatus: 'Connected',
      });
      this._start();
    };

    websocket.onerror = () => {
      websocket.close();
      this._stop();
    };

    websocket.onclose = () => {
      this._stop();
    };

    websocket.onmessage = (event) => {
      const btcData = JSON.parse(event.data);
      if (btcData.op === 'utx') {
        this._updateBtcArray(btcData);
      }
    };
  };

  _start = () => {
    websocket.send('{"op":"unconfirmed_sub"}');
  };

  _restart = () => {
    this.setState({
      connectionStatus: 'Connected',
    });
  };

  _stop = () => {
    this.setState({
      connectionStatus: 'Disconnected',
    });
  };

  _updateBtcArray = (btcData) => {
    const { btcArray } = this.state;
    const btcArrayCopy = [...btcArray];
    const timeStamp = btcData.x.time;
    const btcHash = btcData.x.hash;
    const outputs = btcData.x.out;
    let btcTotalAmount = 0;
    for (let i = 0; i < outputs.length; i += 1) {
      btcTotalAmount += outputs[i].value;
    }
    btcTotalAmount /= 100000000;
    const btcObject = {
      id: btcHash,
      amount: btcTotalAmount,
      timeStamp: this._UnixTimestamp(timeStamp),
    };
    if (btcTotalAmount > 1) {
      btcArrayCopy.push(btcObject);
    }
    if (btcArrayCopy.length > 10) {
      btcArrayCopy.shift();
    }
    this.setState({
      btcArray: [...btcArrayCopy],
    });
  };

  _UnixTimestamp(t) {
    const dt = new Date(t * 1000);
    const hr = dt.getHours();
    const m = `0${dt.getMinutes()}`;
    const s = `0${dt.getSeconds()}`;
    return `${hr}:${m.substr(-2)}:${s.substr(-2)}`;
  }

  render() {
    const { connectionStatus, btcArray } = this.state;
    return (
      <div className="App">
        <div className="App-intro">
          <nav className="nav">
            <NavLink
              to="/"
              exact
              activeClassName="active"
              activeStyle={{ color: '#1569c7' }}
              className="NavLink"
            >
              Home
            </NavLink>
            <NavLink
              to="/searchBtc"
              activeClassName="active"
              activeStyle={{ color: '#1569c7' }}
              className="NavLink"
            >
              FindBtc
            </NavLink>
          </nav>
          <p className="connectionStatus">
            Status:
            <span
              className={
                connectionStatus === 'Connected' ? 'connect' : 'disconnected'
              }
            >
              {` ${connectionStatus}`}
            </span>
          </p>
          <Switch>
            <Route
              path="/"
              exact
              render={props => <BtcChart {...props} btcArray={btcArray} />}
            />
            <Route
              path="/searchBtc"
              render={props => <FindBtc {...props} btcArray={btcArray} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    null,
  )(App),
);
