import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router';
import { BrowserRouter as Router, Route, browserHistory, IndexRoute } from 'react-router-dom';
import App from './components/App';
import IndexPage from './components/indexPage/IndexPage';
import store from './store';
import { Provider } from 'react-redux';

function renderAppInElement(el) {
  ReactDOM.render(
      <Provider store = {store}>
        <Router history = {browserHistory}>
          <Route exact path = "/" component = {IndexPage}/>
        </Router>
      </Provider>, el);
}

document
  .querySelectorAll('.__react-root')
  .forEach(renderAppInElement)
