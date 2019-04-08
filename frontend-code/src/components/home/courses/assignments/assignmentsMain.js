import React from 'react';
import {Route, Switch, Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import jwt_decode from 'jwt-decode';
import { Paper} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';
import CreateAssignment from './createAssignment'
import ViewAssignment from './viewAssignments'
import {courseSection} from '../../../../redux/actions/courseActions'


const styles = theme => ({
root: {
  width: '100%',
  maxWidth: 884,
  backgroundColor: '#f0f0f0',
  padding: '32px',
  border: '0.5px solid black',
  margin: '60px 0px 0px 120px',
},
root_header: {
  width: 'auto',
  margin: '120px 0px 0px 120px',
  textAlign: 'center'
},
root1: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: '32px',
    border: '0.5px solid black'
},
nested: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
bgPaper: {
    padding: '4px',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #D3D3D3'
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  listItem: {
    background: 'white',
    border: '1px solid gray',
    margin: '0px',
    padding: '0px'
  },
  listItemText: {
    margin: '16px'
  },
  divider: {
    border: '1px dashed black'
  },
  header: {
    textAlign: 'center'
  },
  post: {
    padding: '12px',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: '#007dc1',
    color: '#fff !important',
    marginBottom: theme.spacing.unit * 3,
  },
  formFields: {
    padding: 32
  },
  heading: {
    textAlign: '-webkit-auto',
    margin: "16px 0px 0px 0px",
    fontWeight: 'bold',
    fontSize: '1.2em',
  },
  textField: {
    width: '50%',
  }
});

class AssignmentMain extends React.Component {
  state = {
    open: true,
    openPast: false,
    isFaculty: false,
  };

  initialRender = () => {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    // console.log(decoded);

    this.setState({
      isFaculty: decoded.faculty,
    })

    // getAssignByCourse(this.props.COURSEID)
    // .then(res => {
    //   // console.log(res);
    //   this.setState({assignments: res});
    // })
  }

  componentWillMount() {
    this.initialRender()
  }
  
  

  render() {
    const { classes } = this.props;
    // console.log(this.state);

   

    const header = (
      <div className={classes.root_header}>

        {this.state.isFaculty ? 
        <Button color='primary' onClick={() => {this.props.courseSection('createAssignment', this.props.history)}}>Create Assignment</Button>
        : 
        // <Button variant='contained' color='primary' disabled='true'>Assignments</Button>
        <div></div> 
        }
      </div>
    )

    return (
      <div style={{marginTop: '32px'}}>

          {header}

          
          <Route path="/" 
              render={()=> {
              return <ViewAssignment/>
              }} 
          />
        
      </div>
    );
  }
}

AssignmentMain.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  selectedCourse: PropTypes.object.isRequired,
};
  

const mapStateToProps = (state) => ({
  nav : state.nav,
  selectedCourse : state.selectedCourse
})

export default connect(mapStateToProps, { courseSection })(withStyles(styles)(withRouter(AssignmentMain)));
