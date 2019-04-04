import React, { Component } from 'react'
import {Route} from 'react-router-dom';

import SideNav from './SideNav'

import ProfileMain from './profile/ProfileMain'
import Home from './home'

import CreateMain from './createCourse/CreateMain'
import RegisterMain from './registerCourse/RegisterMain'
import CourseMain from './courses/CourseMain'

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
                  return <CreateMain />
                  }}
              />

              <Route path='/dashboard/register' 
                  render={()=> {
                  return <RegisterMain />
                  }}
              />

              <Route path='/dashboard/courses' 
                  render={()=> {
                  return <CourseMain />
                  }}
              />

                                       
      </div>
    )
  }
}

export default Dashboard
