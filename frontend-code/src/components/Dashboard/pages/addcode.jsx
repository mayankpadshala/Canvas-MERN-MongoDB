import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import jwt_decode from 'jwt-decode';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {storeAddCode, getAddCodes} from '../../UserFunctions'


const styles = theme => ({
  root: {
    boxShadow: 'none',
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
    margin: '15px',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    },
  iconButton: {
    padding: 10,
    },
  divider: {
    width: '100%',
    border: '1px solid black',
    margin: 0,
  },
  post: {
    padding: '12px',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: '#007dc1',
    color: '#fff !important',
    marginBottom: theme.spacing.unit * 3,
  },
  paper: {
      margin: '32px',
  }
});

class AddCode extends React.Component {
  

  state = {
    SJSUID: '',
    COURSEID: '',
    addcodes: [],
    FLAG: false,
  }

  getAddCodes = () => {
    getAddCodes(this.props.COURSEID)
    .then(response => {
        this.setState({addcodes: response.data})
    })
  }

  initialRender() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    this.setState({
      SJSUID: decoded.SJSUID,
      COURSEID: this.props.COURSEID,
      FLAG: decoded.FLAG,
    })

    this.getAddCodes();

  }

  componentWillMount(){
    this.initialRender();
  }

  

  generateNumber = (e) => {
    let min = 100000;
    let max = 999999;
    const random = Math.floor(Math.random()*(max-min+1)+min);

    const data = {
      ADDCODE : random,
      COURSEID : this.state.COURSEID
    }

    storeAddCode(data)
    .then(res => {
        // console.log(res);
        this.initialRender();
    })

  }


  render() {
    const { classes } = this.props;

    const header = (
        <div style={{textAlign: 'center'}}>
          {/* <Paper style={{textAlign: 'center'}}> */}
              <Button variant="contained" className={classes.post} onClick={() => this.generateNumber()}>
                Generate AddCode
              </Button>
          {/* </Paper> */}
        </div>
      )

      const ProfPage = (
            <Paper className={classes.root}>
                {console.log(this.state)}
                <div>
                    {header}
                </div>
                
                <div>
                    <h1>Genertated Add Codes: Not Used Yet</h1>
                    {Object.keys(this.state.addcodes).map((key, index) => (
                        <h2>
                            {this.state.addcodes[key].ADDCODE}
                        </h2>
                    ))}
                </div>
           </Paper>
      )

      const studentPage = (
            <Paper className={classes.root}>
                    <div>
                        <h1>Enroll using Add Code</h1>
                    </div>
                    <div>
                    <Paper className={classes.paper}>
                        <form className={classes.paper} onSubmit={this.onSubmit}>
                        <div style={{    display: "flex", flexDirection: "column", width: '30%'}}>
                            <div className={classes.heading}>COURSEID : </div>
                            <TextField
                                // id="outlined-multiline-static
                                // multiline
                                required='true'
                                rows="1"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                name="COURSEID"
                                onChange={this.onChange}
                            />

                            <div className={classes.heading}>ADDCODE : </div>
                            <TextField
                                // id="outlined-multiline-static
                                // multiline
                                required='true'
                                rows="1"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                name="ADDCODE"
                                onChange={this.onChange}
                            />


                            {/* <Paper className={classes.header}> */}
                            <div className={classes.heading}>
                                <Button variant="contained" className={classes.post} type='submit'>
                                    Enroll
                                </Button>
                                </div>
                            {/* </Paper> */}
                            </div>
                        </form>
                    </Paper>
                </div>
            </Paper>
      )

    return (
        
        <div>
            {/* {this.state.FLAG ? ProfPage : studentPage} */}
            {ProfPage}
        </div>

    );
  }
}

AddCode.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddCode);