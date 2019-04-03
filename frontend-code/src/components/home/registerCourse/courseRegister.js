import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import jwt_decode from 'jwt-decode';

import Divider from '@material-ui/core/Divider';

//Import Axios Api Requests 
// import {  getEnrolledCourses, getCoursesbyID , enrollUser, deleteUser, getSearchedCourse , getSearchedCoursebyTerm, getSearchedCoursebyName} from '../../UserFunctions';

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


class CourseRegister extends React.Component{
      
    state = {
        courseTerm: 'Spring 2019',
        courseDept: '',
        courseId: '',
        courseName: '',
        courseFilter: 'is exactly',
        sendRows : '',
        sendRowHeaders : '',
        sendHeader : '',
        sendButton : '',
        formTable : '',
        searchCategory : 'By Course ID',
        showByID : true,
        showByTerm : false,
        showByName : false,
        errorMessage : '',
        SJSUID: '',
        labelWidth: 0,
        courses: [],
        filteredCourses: [],
        enrolledCourses: [],
        redirect: false,
        searchSubmitted: false

    }

    renderRedirect = () => {
      if(this.state.redirect) {
        return <Redirect to='/student/dashboard' />
      }
    }

    getEnrolledUsers() {
      const token = localStorage.usertoken;
      
      const decoded = jwt_decode(token);
      // console.log(decoded.SJSUID);
      this.setState({SJSUID : decoded.SJSUID});
    

      const user = {
        SJSUID: decoded.SJSUID,
        FLAG: decoded.FLAG,
      }


    //   !decoded.FLAG ? 
    //   getEnrolledCourses(user)
    //   .then(res => {
    //     console.log(res);
    //     var result = res.course.filter(course => course.enrollment != null);
    //     this.setState({enrolledCourses: result});
    //   }) 
    //   :
    //   getCoursesbyID(user)
    //   .then(res => {
    //     console.log(res);
    //     var result = res.course;
    //     // console.log(result);
    //     this.setState({enrolledCourses: result});
    //   })
    }

    componentWillMount(){

      // this.setState({
      //   labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
      // });
      // this.getEnrolledUsers();
    
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

          // getSearchedCourse({
          //   COURSEFILTER: this.state.courseFilter,
          //   COURSEID: this.state.courseId,
          // })
          // .then(res => {
          //   this.setState({filteredCourses: res.course})
          // })

        }   
      } else if(this.state.searchCategory === 'By Term') {
        // getSearchedCoursebyTerm({
        //   COURSETERM: this.state.courseTerm
        // })
        // .then(res => {
        //   this.setState({filteredCourses: res.course})
        // })
      } else if(this.state.searchCategory === 'By Course Name') {
        // getSearchedCoursebyName({CNAME: this.state.courseName})
        // .then(res => {
        //   this.setState({filteredCourses: res.course})
        // })
      }
    }

    enroll = (courseId) => {
 
      console.log(courseId);

      this.setState({redirect: !this.state.redirect}); 
      
      const enrolUser = {
        SJSUID: this.state.SJSUID,
        COURSEID: courseId,
        STATUS: 1,
      }

      // enrollUser(enrolUser)
      // .then(res => {
      //   console.log(res);
      //   if(res.status) {
      //     console.log("res.status " + res.status);
      //   } else if (res.error) {
      //     console.log("res.error "+ res.error);
      //     this.setState({errorMessage: res.error});
      //   }         
      // })
      // .catch(err => {
      //   console.log(err);
      // })
    }

    delete = (courseId) => {
 
      console.log(courseId);

      this.setState({redirect: !this.state.redirect}); 
      
      const deleteuser = {
        SJSUID: this.state.SJSUID,
        COURSEID: courseId,
      }

      // deleteUser(deleteuser)
      // .then(res => {
      //   console.log(res);
      //   if(res.status) {
      //     console.log("res.status " + res.status);
      //   } else if (res.error) {
      //     console.log("res.error "+ res.error);
      //     this.setState({errorMessage: res.error});
      //   }         
      // })
      // .catch(err => {
      //   console.log(err);
      // })

      // this.getEnrolledUsers();
    }

    render(){

      
        const { classes } = this.props;
        const header = "Add Course"
        const courseFilters = ["is exactly", "greater than or equal to", "less than or eqaul to"];
        const terms = ["Spring 2019", "Fall 2019"];
        const categories = ['By Course ID', 'By Term', 'By Course Name'];
        console.log(this.state);

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
                        {Object.keys(this.state.filteredCourses).map((key) => (  
                            <TableRow className={classes.row} key={key}>
                              <CustomTableCell component="th" scope="row">
                              CMPE {this.state.filteredCourses[key].COURSEID}
                              </CustomTableCell>
                              <CustomTableCell align="right">{this.state.filteredCourses[key].CNAME}</CustomTableCell>
                              <CustomTableCell align="right">{this.state.filteredCourses[key].COURSEID}</CustomTableCell>
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
                                    
                                    this.enroll(this.state.filteredCourses[key].COURSEID);
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


        const registeredCourses = (
          <div>
    
               {console.log(this.state.filteredCourses)}
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
                        {Object.keys(this.state.enrolledCourses).map((key) => (  
                            <TableRow className={classes.row} key={key}>
                              <CustomTableCell component="th" scope="row">
                              CMPE {this.state.enrolledCourses[key].COURSEID}
                              </CustomTableCell>
                              <CustomTableCell align="right">{this.state.enrolledCourses[key].CNAME}</CustomTableCell>
                              <CustomTableCell align="right">{this.state.enrolledCourses[key].COURSEID}</CustomTableCell>
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
                                    
                                    this.delete(this.state.enrolledCourses[key].COURSEID);
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

        return(
            <div>
                <div className={classes.root} >
                {this.renderRedirect()}
                <Typography variant="h6" className={classes.textColor1} noWrap>
                    {header}
                </Typography>
                </div>
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
                <div>
                    <Divider/>
                </div> 
                {this.state.searchSubmitted ? registrationTable : registeredCourses}
                    
            </div>
        )
    }
}

CourseRegister.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  
export default withStyles(styles)(CourseRegister);