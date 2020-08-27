import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/js/App';
import registerServiceWorker from './register/registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  < Provider store={store}>
    <Router>
		  <App  />
    </Router>
  </Provider>, 
  document.getElementById('root')
);

registerServiceWorker();