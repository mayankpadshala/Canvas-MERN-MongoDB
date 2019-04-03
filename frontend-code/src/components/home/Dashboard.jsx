import React, { Component } from 'react'
import {Route} from 'react-router-dom';

import SideNav from './SideNav'

import ProfileMain from './profile/ProfileMain'
import Home from './home'

import CreateMain from './createCourse/CreateMain'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <SideNav/>
        {/* {this.state.openDashboard ?<Home /> : <InNav parentData={this.state}></InNav>}                     */}
              <Route exact path='/dashboard' 
                  render={()=> {
                  return <Home/>
                  }}
              />
              <Route path='/dashboard/profile' 
                  render={()=> {
                  return <ProfileMain parentData={this.state}/>
                  }}
              />

              <Route path='/dashboard/create' 
                  render={()=> {
                  return <CreateMain parentData={this.state}/>
                  }}
              />

                                       
      </div>
    )
  }
}

export default Dashboard
