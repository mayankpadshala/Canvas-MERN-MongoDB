import React, { Component } from 'react'
import {Route, Switch, Link, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import axios from 'axios';


const CustomTableCell = withStyles(theme => ({
  head: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const styles = theme => ({
  root_main: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 120,
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 10,
    overflowX: "auto",
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   width: 200,
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 5,
    width: 250,
      
  },
  textField2: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      width: 170,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  submit: {
      marginTop: theme.spacing.unit * 3,
      backgroundColor: '#007dc1',
      color: '#fff !important'
    },
  textColor1:{
      color: '#008ee2',
  },
  paperClass:{
    marginTop: 20,
    overflowX: "auto",
    padding: '5% 10% 5%'
  },
  fullWidth: {
      width: '100%',
      textAlign: 'center',
  }
});

class RegisterMain extends Component {

    state = {
      courseFilter: 'is exactly',
      searchCategory : 'By Course ID',
      showByID : true,
      showByTerm : false,
      showByName : false,
      errorMessage : '',
      labelWidth: 0,
      redirect: false,
      searchSubmitted: false,
      courseId: '',
      searchResults: {},
      courseTerm: '',
      courseName: '',
      };

      checkSearchCategory  = (e) => {
        //e.preventDefault();
      
         if(e.target.value === 'By Course ID')
         {
            this.setState({
              searchCategory : e.target.value,
              showByID : true,
              showByName : false,
              showByTerm : false,
              errorMessage : ''
            })
         }
         else if(e.target.value === 'By Term')
         {
            this.setState({
              searchCategory : e.target.value,
              showByID : false,
              showByName : false,
              showByTerm : true,
              errorMessage : ''
            })
         }
         else if(e.target.value === 'By Course Name')
         {
              this.setState({
                searchCategory : e.target.value,
                showByID : false,
                showByName : true,
                showByTerm : false,
                errorMessage : ''
              })
         }
         
      }    

      handleChange = name => e => {
        this.setState({
         [name] : e.target.value,
         errorMessage : ''
        })
     }

     submitSearch = (e) => {
      e.preventDefault();
      this.setState({searchSubmitted: true});
      if(this.state.searchCategory === 'By Course ID') {
        if(this.state.courseId === '')
        {
          this.setState({
            errorMessage : 'Enter Cousre ID to search.'
          })
        }
        else{
          this.setState({
            errorMessage : ''
          })

          const searchCriteria = {
            courseFilter: this.state.courseFilter,
            courseId: this.state.courseId,
          }

          axios
          .post('/api/courses/getBycourseId', searchCriteria)
          .then(res => {
              // console.log(res)
              this.setState({searchResults: res.data})
          })
          .catch(err => {
              // console.log(err)
              // return err
          }) 

        }   
      } else if(this.state.searchCategory === 'By Term') {
        // console.log(this.state)
          axios
            .post('/api/courses/getBycourseTerm', {term: this.state.courseTerm})
            .then(res => {
                // console.log(res)
                this.setState({searchResults: res.data})
            })
            .catch(err => {
                console.log(err)
                // return err
            }) 
      } else if(this.state.searchCategory === 'By Course Name') {
        axios
            .post('/api/courses/getBycourseName', {courseName: this.state.courseName})
            .then(res => {
                // console.log(res)
                this.setState({searchResults: res.data})
            })
            .catch(err => {
                console.log(err)
                // return err
            }) 
      }
    }

    enroll = (id) => {
      // console.log(id);

      this.setState({redirect: !this.state.redirect}); 
        axios
        .post('/api/courses/enroll', {id})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            // return err
        }) 
    }

    delete = (id) => {
 
      // console.log(id);

      this.setState({redirect: !this.state.redirect}); 
        axios
        .post('/api/courses/unenroll', {id})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            // return err
        }) 
    }

    renderRedirect = () => {
      if(this.state.redirect) {
        return <Redirect to='/dashboard' />
      }
    }

  render() {
        const { classes, theme } = this.props;
        const courseFilters = ["is exactly", "greater than or equal to", "less than or eqaul to"];
        const terms = ["Spring 2019", "Fall 2019"];
        const categories = ['By Course ID', 'By Term', 'By Course Name'];
        
        const enrolledCourses = this.props.userProfile.enrolledCourses

        const selectionForm = (
          <div>
            <Paper className={classes.paperClass}>
                <form className={classes.container} onSubmit={this.submitSearch}>
                    <div className={classes.fullWidth}>
                      <label style={{color:'red'}}>{this.state.errorMessage}</label>
                    </div>
                    <div>
                      <TextField
                        id="searchCategory"
                        select
                        label="Select Search Category"
                        className={classes.textField}
                        value={this.state.searchCategory}
                        onChange={this.checkSearchCategory}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        helperText="Please select the search category"
                        margin="normal"
                        >
                        {categories.map(option => (
                            <option key={option} value={option}>
                            {option}
                            </option>
                        ))}
                      </TextField>
                    </div>
                    <div style={{display: this.state.showByTerm ? 'block' : 'none' }}>
                      <TextField
                      id="courseTerm"
                      select
                      label="Select Term"
                      className={classes.textField}
                      value={this.state.courseTerm}
                      onChange={this.handleChange('courseTerm')}
                      SelectProps={{
                          native: true,
                          MenuProps: {
                          className: classes.menu,
                          },
                      }}
                      helperText="Please select the term"
                      margin="normal"
                      >
                      {terms.map(option => (
                          <option key={option} value={option}>
                          {option}
                          </option>
                      ))}
                      </TextField>
                    </div>

                    <div style={{display: this.state.showByName ? 'block' : 'none' }}>
                      <TextField
                      id="courseName"
                      label="Course Name"
                      className={classes.textField}
                      value={this.state.courseName}
                      onChange={this.handleChange('courseName')}
                      margin="normal"
                      />
                    </div>

                    <div style={{display: this.state.showByID ? 'block' : 'none' }}>
                        <TextField
                        id="courseFilter"
                        select
                        label="Filter Course ID by"
                        className={classes.textField}
                        value={this.state.courseFilter}
                        onChange={this.handleChange('courseFilter')}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        helperText=""
                        margin="normal"
                        >
                        {courseFilters.map(option => (
                            <option key={option} value={option}>
                            {option}
                            </option>
                        ))}
                        </TextField>

                        <TextField
                        id="courseId"
                        label="Course ID To Filter"
                        className={classes.textField}
                        value={this.state.courseId}
                        onChange={this.handleChange('courseId')}
                        margin="normal"
                        />
                    </div>

                    <div className={classes.fullWidth}>
                        <Button
                        type="submit"
                        variant="contained"
                        className={classes.submit}
                        >
                        Search
                        </Button>
                    </div>
                </form>
                
            </Paper>
          </div>
        );
        
        const registeredCourses = (
          <div>
  
                  <Paper>
                  <div style={{textAlign: 'center'}}><h2>Delete a course</h2></div>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <CustomTableCell>Course ID</CustomTableCell>
                            <CustomTableCell align="right">Course Name</CustomTableCell>
                            <CustomTableCell align="right">Course Term</CustomTableCell>
                            <CustomTableCell align="right"></CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {Object.keys(enrolledCourses).map((key) => (  
                            <TableRow className={classes.row} key={key}>
                              <CustomTableCell component="th" scope="row">
                              CMPE {enrolledCourses[key].course.courseId}
                              </CustomTableCell>
                              <CustomTableCell align="right">{enrolledCourses[key].course.courseName}</CustomTableCell>
                              <CustomTableCell align="right">{enrolledCourses[key].course.term}</CustomTableCell>
                              <CustomTableCell align="right">
                              {/* <form className={classes.root} autoComplete="off" onSubmit={this.enroll}> */}
                                <Input
                                  style={{display: 'none'}}
                                  className={classes.input}
                                  name="COURSE"
                                  defaultvalue="VALUE ENROLL"
                                />
                                <Button 
                                  variant="contained" 
                                  className={classes.button} 
                                  // type="submit" 
                                  onClick={(e) => {
                                    e.preventDefault()
                                    
                                    this.delete(enrolledCourses[key].course._id);
                                  }}
                                  >
                                  Delete
                                </Button>
                              </CustomTableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      </Paper>
            
          </div>
        )

        const registrationTable = (
          <div>
              <Paper>
                    <div style={{textAlign: 'center'}}><h2>Register for a course</h2></div>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <CustomTableCell>Course ID</CustomTableCell>
                            <CustomTableCell align="right">Course Name</CustomTableCell>
                            <CustomTableCell align="right">Course Term</CustomTableCell>
                            <CustomTableCell align="right"></CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {Object.keys(this.state.searchResults).map((key) => (  
                            <TableRow className={classes.row} key={key}>
                              <CustomTableCell component="th" scope="row">
                              CMPE {this.state.searchResults[key].courseId}
                              </CustomTableCell>
                              <CustomTableCell align="right">{this.state.searchResults[key].courseName}</CustomTableCell>
                              <CustomTableCell align="right">{this.state.searchResults[key].term}</CustomTableCell>
                              <CustomTableCell align="right">
                              {/* <form className={classes.root} autoComplete="off" onSubmit={this.enroll}> */}
                                {/* <Input
                                  style={{display: 'none'}}
                                  className={classes.input}
                                  name="course"
                                  defaultvalue="VALUE ENROLL"
                                /> */}
                                <Button 
                                  variant="contained" 
                                  className={classes.button} 
                                  // type="submit" 
                                  onClick={(e) => {
                                    e.preventDefault()
                                    
                                    this.enroll(this.state.searchResults[key]._id);
                                  }}
                                  >
                                  Enroll
                                  
                                </Button>
                              </CustomTableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      </Paper>
            
          </div>
        )

        
          return(
            <div className={classNames(classes.root_main)}>
            {this.renderRedirect()}
              <div className={classNames(classes.content)} >
                  {selectionForm}
                  {this.state.searchSubmitted ? registrationTable : registeredCourses}
              </div>
            </div>
        );
      }
    }
    
    RegisterMain.propTypes = {
      classes: PropTypes.object.isRequired,
      theme: PropTypes.object.isRequired,
      userProfile: PropTypes.object.isRequired,
    };
        
    const mapStateToProps = (state) => ({
      userProfile : state.userProfile,
    })
        
    
    
export default connect(mapStateToProps, {  })(withStyles(styles)(withRouter(RegisterMain)));

