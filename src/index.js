import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

// import './index.scss';
import App from './App';
import { store } from './store/configureStore';
// import registerServiceWorker from './registerServiceWorker';

// const store = configureStore(window.__REDUX_STATE__ || {});

const AppBundle = (
  <ReduxProvider store={store}>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </ReduxProvider>
);

window.onload = () => {
  Loadable.preloadReady().then(() => {
    const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
    renderMethod(AppBundle, document.getElementById('root'));
  });
};

// registerServiceWorker();
