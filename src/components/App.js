import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, BrowserRouter as Router, IndexRoute, Redirect, Route} from 'react-router-dom';

import IndexPage from './indexPage';
import EditorPage from './editorPage';
import SearchPage from './searchPage';
import ViewPage from './viewPage';
import FollowerPage from './followerPage';
import ProfilePage from './ProfilePage';
import ProfileModifyPage from './profileModifyPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.isLoggedIn = this.render.bind(this);
    }

    renderComponent(Component) {
        if (this.loggedIn()) {
            return (
                <Component/>
            );
        } else {
            return (
                <Redirect to="/"/>
            );
        }
    }

    loggedIn() {
        return this.props.token !== '';
    }

    render() {
        return (
            <Router history={browserHistory}>
                <div>
                    <Route exact path="/" component={IndexPage}/>
                    <Route exact path="/editor" render={() => {
                        return this.renderComponent(EditorPage);
                    }}/>
                    <Route exact path="/search" component={SearchPage}/>
                    <Route exact path="/lookup/:id" component={ViewPage}/>
                    <Route exact path="/follower" component={FollowerPage}/>
                    <Route exact path="/profile" render={() => {
                        return this.renderComponent(ProfilePage);
                    }}/>
                    <Route exact path="/profile/modify" render={() => {
                        return this.renderComponent(ProfileModifyPage);
                    }}/>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
};

App = connect(mapStateToProps)(App);

export default App;
