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
      connectionStatus: 'connecting...',
      btcArray: []
    };
  }

  componentDidMount = () => {
    window.addEventListener('online',  this._restart);
    window.addEventListener('offline', this._stop);

    websocket = new WebSocket('wss://ws.blockchain.info/inv');

    websocket.onopen = () => {
      this.setState({
        connectionStatus: 'connected'
      })
      this._start()
    };

    websocket.onerror = () => {
      websocket.close();
      this._stop()
    };

    websocket.onclose = () => {
      this._stop()
    };

    websocket.onmessage = (event) => {
      let btcData = JSON.parse(event.data)
      if (btcData.op === 'utx'){
        this._updateBtcArray(btcData)
      }
    }
  }

  _start = () => {
    websocket.send('{"op":"unconfirmed_sub"}');
  }

  _restart = () => {
    this.setState({
      connectionStatus: 'connected'
    })
  }

  _stop = (event) => {
    this.setState({
      connectionStatus: 'disconnected'
    })
  }

  _updateBtcArray = (btcData) => {
    const { btcArray } = this.state
    let btcArrayCopy = [...btcArray]
    let timeStamp = btcData.x.time;
    let btcHash = btcData.x.hash;
    let out = btcData.x.out;
    let btcTotalAmount = 0;
    for(let i = 0; i < out.length; i++){
      btcTotalAmount += out[i].value;
    }
    btcTotalAmount /= 100000000;
    var btcObject = { id: btcHash, amount: btcTotalAmount, timeStamp: this._Unix_timestamp(timeStamp) };
    if(btcTotalAmount > 1) {
      btcArrayCopy.push(btcObject);
    }
    if (btcArrayCopy.length > 10) {
      btcArrayCopy.shift();
    }
   this.setState({
     btcArray: [...btcArrayCopy]
   })
  }

  _Unix_timestamp (t) {
    let dt = new Date(t*1000);
    let hr = dt.getHours();
    let m = "0" + dt.getMinutes();
    let s = "0" + dt.getSeconds();
    return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);
  }

  render() {
    const { connectionStatus, btcArray } = this.state
    return (
      <div className="App">
        <div className="App-intro">
          <nav>
            <NavLink to="/" exact activeClassName="active" activeStyle={{ color: '#1569c7' }} className="NavLink">
              Home
            </NavLink>
            <NavLink to="/searchBtc" activeClassName="active" activeStyle={{ color: '#1569c7'}} className="NavLink">
              FindBtc
            </NavLink>
          </nav>
          <p>status: {connectionStatus}</p>
          <Switch>
            <Route path="/" exact render={(props) => { return <BtcChart {...props} btcArray={btcArray} />}} />
            <Route path="/searchBtc" render={(props) => { return <FindBtc {...props} btcArray={btcArray} />}} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    null
  )(App),
);
