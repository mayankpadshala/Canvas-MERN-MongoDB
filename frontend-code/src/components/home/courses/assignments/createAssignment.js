import React, { Component } from 'react'
import {Route, Switch, Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import {uploadAssignment} from '../../../../redux/actions/courseActions'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 884,
    backgroundColor: '#f0f0f0',
    padding: '32px',
    border: '0.5px solid black',
    margin: '60px 0px 0px 120px',
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

class CreateAssignment extends Component {
  state = {
  }

  componentWillMount() {
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  setAssignment  = (event) => {
    event.preventDefault();

    this.setState({
      file: event.target.files[0],
    })
    
  }

  onSubmit = () => {

    const file = this.state.file

    const fd = new FormData();

    fd.append("Assignment", file, file.name);
    fd.append("title", this.state.title)
    fd.append("dueDate", this.state.dueDate)
    fd.append("totalPoints", this.state.totalPoints)
    fd.append('courseId', this.props.selectedCourse.courseClicked)
    this.props.uploadAssignment(fd, this.props.history);
 
  }
  
  render() {
    
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form className={classes.form} onSubmit={this.onSubmit}>
        <div style={{    display: "flex", flexDirection: "column", width: '60%'}}>
            <div className={classes.heading}>TITLE : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="title"
              onChange={this.onChange}
            />

            <div className={classes.heading}>DUEDATE : </div>
            <TextField
                  id="date"
                  type="date"
                  name="dueDate"
                  onChange={this.onChange}
                  defaultValue="----------"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
              <div className={classes.heading}></div>

            <div className={classes.heading}>TOTALPOINTS : </div>
            <TextField
              // id="outlined-multiline-static
              // multiline
              label="TOTALPOINTS"
              rows="1"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="totalPoints"
              onChange={this.onChange}
            />
            

            <div className={classes.heading}>Select Supported File : </div>
            <div className={classes.heading}>
            <input type="file" onChange={this.setAssignment}/>
            </div>
            {/* <Paper className={classes.header}> */}
            <div className={classes.heading}>
              <Button variant="contained" className={classes.post} type='submit'>
                Create Assignment
              </Button>
              </div>
            {/* </Paper> */}
        </div>
      </form>
      </div>
    )
  }
}

CreateAssignment.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  selectedCourse: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  nav : state.nav,
  selectedCourse : state.selectedCourse
})

export default connect(mapStateToProps, { uploadAssignment })(withStyles(styles)(withRouter(CreateAssignment)));