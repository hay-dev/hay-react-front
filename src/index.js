import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router';
import { BrowserRouter as Router, Route, browserHistory, IndexRoute } from 'react-router-dom';
import App from './components/App';
import IndexPage from './components/indexPage';
import EditorPage from './components/editorPage';
import SearchPage from './components/searchPage';
import ViewPage from './components/viewPage';
import FollowerPage from './components/followerPage';
import ProfilePage from './components/ProfilePage';
import ProfileModifyPage from './components/profileModifyPage';
import store from './store';
import { Provider } from 'react-redux';

function renderAppInElement(el) {
  ReactDOM.render(
      <Provider store = {store}>
        <Router history = {browserHistory}>
          <div>
            <Route exact path = "/" component = {IndexPage}/>
            <Route exact path = "/editor" component = {EditorPage}/>
            <Route exact path = "/search" component = {SearchPage}/>
            <Route exact path = "/lookup/:id" component = {ViewPage}/>
            <Route exact path = "/follower" component = {FollowerPage}/>
            <Route exact path = "/profile" component = {ProfilePage}/>
            <Route exact path = "/profile/modify" component = {ProfileModifyPage}/>
          </div>
        </Router>
      </Provider>, el);
}

document
  .querySelectorAll('.__react-root')
  .forEach(renderAppInElement)
