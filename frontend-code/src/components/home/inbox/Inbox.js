import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import {Typography, Button, Paper, TextField, AppBar, Tabs, Tab} from '@material-ui/core';
import {TableCell, TableBody, TablePagination, TableRow, Table} from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {connect} from 'react-redux';
import {Route, Switch, Link, withRouter} from 'react-router-dom'
import {sendMessageInbox} from '../../../redux/actions/courseActions'

const styles = theme => ({
  root1: {
    boxShadow: 'none',
    width: '100%',
    marginTop: theme.spacing.unit * 5,
},
root: {
  boxShadow: 'none',
  width: '100%',
  marginTop: theme.spacing.unit * 10,
  textAlign: 'center'
},
tableWrapper: {
  // overflowX: 'auto',
},
formControl: {
  margin: theme.spacing.unit * 3,
},
group: {
  margin: `${theme.spacing.unit}px 0`,
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
  textColor1:{
    color: '#008ee2',
  },
  paperClass:{
    marginTop: 20,
    // overflowX: "auto",
    padding: '0% 5% 5%'
  },
  button: {
    margin: theme.spacing.unit * 4 ,
  },
  fullWidth: {
    width: '100%',
    // float: 'left'
  },
  textField: {
      marginLeft: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 5,
      width: '90%',
        
    },
    textField2: {
        marginLeft: 32,
        //marginRight: theme.spacing.unit * 3,
        width: '95%',
    },
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

class Inbox extends React.Component {
  state = {
    value : 0,
    is_student : '',
    sjsuID : '',
    fromName : '',
    errorMessage : '',
    successMessage : '',
    usersList : '',
    message : '',
    listOfSenders : '',
    page : 0,
    rowsPerPage : 5,
    receivedMessages : '',
  };

  componentWillMount = () => {
   
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  
  handleChangeState = name => e => {
    //console.log.value(e.target.value);
    this.setState({
     [name] : e.target.value,
     errorMessage : '',
     successMessage : ''
    })
  }
  
  sendMessage = (e) => {
    e.preventDefault();

    const data = {
      sendTo : this.state.sendTo,
      message : this.state.message,
    }
    
    this.props.sendMessageInbox(data)

  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const { classes, theme } = this.props;
    const header = "Inbox"
    const types = this.state.listOfSenders;
    const receivedMessages =  this.props.auth.user.RECEIVED_MESSAGES
    let noMessage = '';
    if(receivedMessages.length == 0)
    {
      noMessage = "Your inbox is empty!!"
    }
    
    const {rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, receivedMessages.length - page * rowsPerPage);

    return (
      <Grid container spacing={16}>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
        <div style={{marginTop: '32px'}}>
        {this.state.redirectVar}
        <div className={classes.root} >
            <Typography variant="h6" className={classes.textColor1} noWrap>
                {header}
            </Typography>
        </div>
        <Paper className={classes.paperClass}>

        <AppBar position="static" color="default">
          <Tabs
            id='value'
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Inbox" />
            <Tab label="Send Message" />
          </Tabs>
        </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
          <TabContainer dir={theme.direction} style={{ overflowX : 'hidden'}}>
            <Paper className={classes.root}>
              <Typography variant="h6" style={{color: '#008ee2'}} noWrap>
                  {noMessage}
              </Typography>
              <div style={{display: receivedMessages.length == 0 ? 'none' : 'block'}}>
                <div className={classes.tableWrapper}>
                  <Table className={classes.table} aria-labelledby="tableTitle">
                    
                    <TableBody>
                      {Object.keys(receivedMessages)
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(n => {
                          return (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={n}
                            >
                              <TableCell component="td" scope="row" padding="none"
                              style={{width: '20%', overflowWrap:'normal'}}>
                                <b>From : </b> {receivedMessages[n].FROM} 
                              </TableCell>
                              <TableCell scope="row" ><b>Message : </b>{receivedMessages[n].MESSAGE}</TableCell>
                              <TableCell scope="row" align="right">{receivedMessages[n].Date.slice(0,10)}</TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={receivedMessages.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </div>
            </Paper>
          </TabContainer>
          
          <TabContainer dir={theme.direction}>
              <form className={classes.container} onSubmit={this.sendMessage}>
                  <div className={classes.fullWidth}>
                    <label style={{color:'red'}}>{this.state.errorMessage}</label>
                    <label style={{color:'green'}}>{this.state.successMessage}</label>
                  </div>

                  <TextField
                        id="sendTo"
                        label="Enter SJSUID to send to"
                        className={classes.textField}
                        value={this.state.sendTo}
                        onChange={this.handleChangeState('sendTo')}
                        margin="normal"
                        required
                        >
                        {/* <option value="" disabled>Select Sender</option> */}
                        {/* {Object.keys(this.state.listOfSenders).map(option => (
                            <option 
                            style={{display : this.state.listOfSenders[option].SJSU_ID == this.state.sjsuID ? 'none' : 'block'}}
                            key={this.state.listOfSenders[option].SJSU_ID} 
                            value={this.state.listOfSenders[option].SJSU_ID}>
                            {this.state.listOfSenders[option].SJSU_ID + " : " + this.state.listOfSenders[option].FNAME + " " + this.state.listOfSenders[option].LNAME}
                            </option>
                        ))} */}
                      </TextField>

                      <TextField
                          id="message"
                          label="Message"
                          className={classes.textField}
                          value={this.state.message}
                          onChange={this.handleChangeState('message')}
                          margin="normal"
                          required
                          >
                      </TextField>

                      <div>
                        <Button
                        type="submit"
                        variant="contained"
                        color="primary" 
                        className={classes.button}
                        >
                        Send Message
                      </Button>
                  </div> 
                  
             
              </form>
          </TabContainer>
        </SwipeableViews>
            
        </Paper>

            
      </div>
      </Grid>
      </Grid>
    );
  }
}

Inbox.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
    selectedCourse: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
    
  
  const mapStateToProps = (state) => ({
    nav : state.nav,
    selectedCourse : state.selectedCourse,
    auth: state.auth
  })
  
  export default connect(mapStateToProps, { sendMessageInbox })(withStyles(styles, { withTheme: true })(withRouter(Inbox)));
  