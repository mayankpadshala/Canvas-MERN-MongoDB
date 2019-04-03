import React, { Component } from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom'

import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Dashboard from './components/home/Dashboard'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={SignIn}/>
          <Route path="/signup" component={SignUp}/>
          <Route path='/dashboard' component={Dashboard}  />
  </div>
      </BrowserRouter>
    );
  }
}

export default App;
