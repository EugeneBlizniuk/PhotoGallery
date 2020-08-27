import React, { Component } from 'react';
import './../css/App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../../util/APIUtils';
import { ACCESS_TOKEN } from '../../constants';

import Footer from './Footer';
import NewContent from '../../user/content/js/NewContent';
import Login from '../../user/login/js/Login';
import Signup from '../../user/signup/js/Signup';
import Profile from '../../user/profile/js/Profile';
import AppHeader from '../../common/js/AppHeader';
import NotFound from '../../common/js/NotFound';
import LoadingIndicator from '../../common/js/LoadingIndicator';
import PrivateRoute from '../../common/js/PrivateRoute';
import LastView from '../../views/js/LastView';
import FriendContentView from '../../views/js/FriendContentView';

import { Layout, notification } from 'antd';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }

    this.loadCurrentUser = this.loadCurrentUser.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader history={this.props.history} />

          <Content className="app-content">
          <div className="content">
            <div className="container">
              <Switch>
                <Route exact path="/" 
                  render={(props) => <LastView isAuthenticated={this.state.isAuthenticated} 
                  currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>
                
                <Route exact path="/images/friends" render={(props) => <FriendContentView isAuthenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>

                <Route path="/login"> 
                  <Login history={this.props.history}/>
                </Route>
                
                <Route path="/signup" 
                  component={Signup}>
                </Route>
                
                <Route path="/users/:username/:albumid/" 
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} 
                  currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                
                <Route path="/users/:username" 
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} 
                  currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                  
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/upload" 
                  component={NewContent} handleLogout={this.handleLogout} currentUser={this.state.currentUser}>
                </PrivateRoute>
                
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </div>
            <Footer/>

          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);