import React from 'react';
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import jwt_decode from 'jwt-decode';
import ReactDOM from "react-dom";

import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';


//Import Axios Api Requests 

import { getCourses, enrollUser } from '../../UserFunctions';


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
    padding: '32px'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 180,
    padding: 0,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  table: {
    minWidth: 700,
  },
});

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    verticalAlign: 'top',
    padding: '16px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);



class CourseRegister extends React.Component {


      state = {
        SJSUID: '',
        courseTerm: "",
        courseID: "",
        courseName: "",
        labelWidth: 0,
        courses: [],
        redirect: false,
        courseTerm: 'Spring 2019',
        dept: '',
        courseFilter: 'is exactly',
        courseFilterValue: '',
        searchCategory : '',
        showByID : true,
        showByTerm : false,
        showByName : false,
        errorMessage : ''
      };


      handleChange = name => e => {
        this.setState({
         [name] : e.target.value
        })
     }

      onSubmit = (e) => {
        e.preventDefault();

        console.log(this.state);
      }

      renderRedirect = () => {
          if(this.state.redirect) {
            return <Redirect to='/student/dashboard' />
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

        enrollUser(enrolUser)
        .then(res => {
          console.log(res);          
        })
        .catch(err => {
          console.log(err);
        })
      }

    componentDidMount(){

      this.setState({
        labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
      });

      const token = localStorage.usertoken;
      
      const decoded = jwt_decode(token);
      // console.log(decoded.SJSUID);
      this.setState({SJSUID : decoded.SJSUID});


      getCourses()
      .then(res => {
        var result = res.course;
        // console.log(result);
        this.setState({courses: result});
      })

    }

    //Select Course
    checkSearchCategory  = (e) => {
      //e.preventDefault();
      console.log("Hell" + e.target.value);
    
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

    
  

  render() {

  
    const { classes } = this.props;  
      

    const registrationTable = (
      <div>

            <Grid
              container
              direction="row"
              justify="space-evenly"
              // alignItems="center"
              item xs={9}
          >
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
                    {Object.keys(this.state.courses).map((key) => (  
                        <TableRow className={classes.row} key={key}>
                          <CustomTableCell component="th" scope="row">
                          CMPE {this.state.courses[key].COURSEID}
                          </CustomTableCell>
                          <CustomTableCell align="right">{this.state.courses[key].CNAME}</CustomTableCell>
                          <CustomTableCell align="right">{this.state.courses[key].COURSEID}</CustomTableCell>
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
                                
                                this.enroll(this.state.courses[key].COURSEID);
                              }}
                              >
                              Enroll
                            </Button>
                          </CustomTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
            </Grid>
        
      </div>
    )

    const courseFilters = ["is exactly", "greater than or equal to", "less than or eqaul to"];
    const terms = ["Spring 2019", "Fall 2019"];
    const categories = ['By Course ID', 'By Term', 'By Course Name']

    return (
      <Paper className={classes.root}>
      <div>
        <h1>Select Course to Register</h1>
        {this.renderRedirect()}
      </div>

      <div style={{display: 'block'}}>

      <form className={classes.root} autoComplete="off" onSubmit={this.onSubmit}>
           {/* Select Serach Category */}
           <div>
              <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple"
              >
                Select Search Category
              </InputLabel>
              <Select
                id="searchCategory"
                value={this.state.searchCategory}
                onChange={this.checkSearchCategory}
                input={
                  <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    
                    id="outlined-age-simple"
                  />
                }
              > 
                  
                  {categories.map(option => (
                      <MenuItem key={option} value={option}>
                      {option}
                      </MenuItem>
                  ))}

              </Select>
            </FormControl>
          </div>
          
          {/* Select constraints */}
          {/* <div style={{display: this.state.showByTerm ? 'block' : 'none' }}> */}
          <FormControl style={{display: this.state.showByTerm ? 'flex' : 'none' }} variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Course Constraints
            </InputLabel>
            <Select
              id="courseTerm"
              value={this.state.dept}
              onChange={this.handleChange('dept')}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  id="outlined-age-simple"
                />
              }
            > 
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {terms.map(option => (
                              <MenuItem key={option} value={option}>
                              {option}
                              </MenuItem>
                          ))}
            </Select>
          </FormControl>
          {/* </div> */}

          {/* <div style={{display: this.state.showByName ? 'block' : 'none' }} > */}
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Course Term
            </InputLabel>
            <Select
              id='courseName'
              value={this.state.courseFilter}
              onChange={this.handleChange('courseFilter')}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  id="outlined-age-simple"
                />
              }
            > 
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {courseFilters.map(option => (
                              <MenuItem key={option} value={option}>
                              {option}
                              </MenuItem>
                          ))}
            </Select>
          </FormControl>
          {/* </div> */}

          <div style={{display: this.state.showById ? 'flex' : 'none' }}>
        <FormControl className={classes.margin}  >
          <InputLabel htmlFor="age-customized-select" className={classes.bootstrapFormLabel}>
            Course ID
          </InputLabel>
          <BootstrapInput name="courseID" onChange={this.handleChange}/>
        </FormControl>
        </div>

        {/* <FormControl className={classes.margin}>
          <InputLabel htmlFor="age-customized-select" className={classes.bootstrapFormLabel}>
            Course Name
          </InputLabel>
          <BootstrapInput name="courseName" onChange={this.handleChange} />
        </FormControl> */}

          <div style={{margin: "64px 0 0 8px"}}>
            <Button variant="contained" className={classes.button} type='submit'>
              Submit
            </Button>
          </div>
      </form>

      </div>

      <div>
      {registrationTable}
      </div>

    </Paper>
        
           
    );
  }
}

CourseRegister.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseRegister);