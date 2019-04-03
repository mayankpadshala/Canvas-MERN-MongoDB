import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import Dashboard from './Dashboard/Dashboard';


//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/login" component={SignIn}/>
                <Route path="/signup" component={SignUp}/>
                <Route path='/student' component={Dashboard} />
                <Route path='/faculty' component={Dashboard} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;