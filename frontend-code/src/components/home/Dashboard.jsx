import React, { Component } from 'react'
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import SideNav from './SideNav'

import ProfileMain from './profile/ProfileMain'
import Home from './home'

import CreateMain from './createCourse/CreateMain'
import RegisterMain from './registerCourse/RegisterMain'
import CourseMain from './courses/CourseMain'
import Inbox from './inbox/Inbox'

import {getCurrentProfile} from '../../redux/actions/profileActions'

class Dashboard extends Component {
  componentWillMount() {
    this.props.getCurrentProfile()
  }
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

              <Route path='/dashboard/inbox' 
                  render={()=> {
                  return <Inbox />
                  }}
              />

                                       
      </div>
    )
  }
}

export default connect(null, { getCurrentProfile })(withRouter(Dashboard));

