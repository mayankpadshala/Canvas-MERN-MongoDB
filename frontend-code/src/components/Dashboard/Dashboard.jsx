import React, { Component } from 'react'
import {Route} from 'react-router-dom';

import SideNav from './Sidebar/SideNav'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <SideNav></SideNav>
      </div>
    )
  }
}

export default Dashboard
