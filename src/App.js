import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../src/components/home/Home';
import UserList from '../src/components/userList/UserList';
import Chat from '../src/components/chatMessage/ChatApp';
import Signup from '../src/components/signup/Signup';
import Profile from '../src/components/profile/Profile';
import Signin from './components/signin/Signin'
import NotFound from '../src/components/errors/NotFound';
import { Layout, notification } from 'antd';
import LoadingIndicator from './components/loadingIndicator/LoadingIndicator';
import AppHeader from './components/header/AppHeader';

const { Content } = Layout;

class App extends Component {

  constructor(props) {
    super(props);
    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  render() {
    if(this.props.reducerState.auth.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader onLogout={this.handleLogout} />
          <Content className="app-content">
            <div className="container">
              <Switch>    
                <Route exact path="/" component={Home}></Route>
                <Route path="/login"
                  render={(props) => <Signin onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/user/:email" component={Profile}></Route>
                <Route path="/users" component={UserList}></Route>
                <Route path="/chat" component={Chat}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reducerState: state
  }
}

export default withRouter(connect(mapStateToProps)(App));