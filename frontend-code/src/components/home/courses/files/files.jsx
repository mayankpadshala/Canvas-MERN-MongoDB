import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { uploadFile} from '../../UserFunctions';

import axios from "axios";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FolderIcon from "@material-ui/icons/Folder";
import FileIcon from "@material-ui/icons/Description";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Button from "@material-ui/core/Button";

import FolderTree from 'react-folder-tree';

import {getStructure} from '../../UserFunctions'
import {Treebeard} from 'react-treebeard';

import jwt_decode from 'jwt-decode';

const styles = theme => ({
  root: {
    backgroundColor: '#f0f0f0',
    marginLeft: 200
},
folderMenuRoot: {
  width: "100%",
  maxWidth: 360,
  backgroundColor: theme.palette.background.paper
},
parent: {
  // marginTop: "100px"
},
container: {
  display: "flex",
  flexWrap: "wrap"
},
textField: {
  marginLeft: theme.spacing.unit,
  marginRight: theme.spacing.unit
},
labelText: {
  // color: "#ffffff",
  fontWeight: "Bold"
},
inputStyle: {
  minWidth: "750px"
},
submitButton: {
  color: "#000000",
  // color: "#ffffff",
  // fontWeight: 'Bold',
  borderColor: "#000000 !important",
  // borderColor: "#ffffff !important",
  margin: theme.spacing.unit,
  width: "100%"
},
radioLabelText: {
  color: "#000000"
  // color: "#ffffff"
},
nested: {
  paddingLeft: theme.spacing.unit * 4
}
});


class Files extends Component {
  constructor() {
    super();
    this.state = {
        COURSEID: '',
        SJSUID: '',
        FLAG: false,
        open: false,
        fileStructure: [],
        newFolderName: "",
        newFolderNameValid: false,
        formErrors: {
            newFolderName: "",
        },
        formValid: false,
        rootFolderPath : "../backend-code/public/uploads/course",
        parentFolderPath : "../backend-code/public/uploads/",
        parenFolderFileStructure: [],
        selectedFolderPath: ''
    };
}


handleClick = () => {
  this.setState(state => ({ open: !state.open }));
};

componentDidMount() {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);

    this.setState({
      SJSUID: decoded.SJSUID,
      FLAG: !decoded.faculty,
      COURSEID: this.props.COURSEID,
    })

  this.makeRequest(this.state.rootFolderPath,"fileStructure");
  this.makeRequest(this.state.parentFolderPath,"parenFolderFileStructure");
}

makeRequest = (path,stateElement) => {
  let sendData = {
      path: path
      // path: this.state.rootFolderPath
      // path: "testing1/"
  };
  // console.log(sendData)

  getStructure(sendData)
  .then(res => {
    // console.log(res);
    let temp = [].concat(res.data);
                if (temp[0]["msg"] === "Success") {
                    console.log(temp[0]["data"])
                    this.setState({
                        [stateElement] : temp[0]["data"]['children']
                    });
                }
  })
  
};


prepareFileStructure = (jsonArray,level) => {
  if (!jsonArray) {
      // console.log("not there")
      // return "";
  } else {
      let res = jsonArray.map((item, key) => {
          return (
              <div key={key}>
                {item.type === "directory" 
                ?
                      <ListItem 
                      button 
                      style={{paddingLeft: (level*20)+"px"}}
                      onClick={() => {this.openFolder(item.type,item.path)}}
                      // onClick={() => this.downloadFile(key+item.name,item.type,item.path)}
                      >
                          {/* <a 
                              // style={{display: "none"}} 
                              id={key+item.name}
                              href={"http://localhost:3001/download/"+item.path.substring(3) }
                              // display
                              target="_blank"
                          >
                          </a> */}
                          <ListItemIcon>
                              {item.type === "directory" ? <FolderIcon /> : <FileIcon />}
                          </ListItemIcon>
                          <ListItemText inset primary={item.name} />
                      </ListItem>
                      :
                      <div></div>
                }
                  {
                      this.prepareFileStructure(item.children,level+1)
                  }
              </div>
          );
      })
  return res;
  }
}
prepareFileStructureLvl0 = (jsonArray,level) => {
  if (!jsonArray) {
      // console.log("not there")
      // return "";
  } else {
      let res = jsonArray.map((item, key) => {
          return (
              <div key={key}>
                 {item.type === "directory" 
                    ?
                    <div></div>
                    :
                      <ListItem 
                      button 
                      style={{paddingLeft: (level*10)+"px"}}
                      onClick={() => this.downloadFile(key+item.name)}
                      >
                      {/* {console.log(item.path)} */}
                          <a 
                              // style={{display: "none"}} 
                              id={key+item.name}
                              href={"http://localhost:5000/"+item.path.substring(23) }
                              target="_blank"
                          >
                          </a>
                          <ListItemIcon>
                              {item.type === "directory" ? <FolderIcon /> : <FileIcon />}
                          </ListItemIcon>
                          <ListItemText inset primary={item.name} />
                      </ListItem>
                 }
                  {/* {
                      this.prepareFileStructure(item.children,level+1)
                  } */}
              </div>
            
              );
      })
  return res;
  }
}

openFolder = (type,path) => {
  this.setState({selectedFolderPath: path})
  if (type === "directory") {
      console.log(path)
      this.setState({
          parentFolderPath: path
      },this.makeRequest(path,"parenFolderFileStructure"));
  }
}

downloadFile = (key,type,path) => {
  document.getElementById(""+key).click()
}

handleUserInput(e) {
  const name = e.target.name;
  const value = e.target.value;
  // this.setState({ [name]: value });
  this.setState({ [name]: value },
  );
}

handleNewFolderSubit = () => {
  let sendData = {
      parent_folder_path: "../backend-bode/public/uploads",
      new_folder_name: this.state.newFolderName,
      new_folder_path: this.state.parentFolderPath+"/"+this.state.newFolderName,
  };
  console.log(sendData);
  axios
      .post("/files/createNewFolder", sendData)
      .then(response => {
          let temp = [].concat(response.data);
          if (temp[0]["msg"] === "Success") {
              this.makeRequest(this.state.rootFolderPath,"fileStructure");
          }else{
              this.setState({
                  formErrors: {
                      newFolderName: temp[0]["msg"],
                  },
              });
          }
      });
};

fileSelectedNowUpload = (e) =>{
  if (e.target.files.length === 1) {
      // console.log(e.target.files)
      let file = e.target.files[0];
      // var ext = file.name.substr(file.name.lastIndexOf('.') );
      let filename = file.name;
      // let filename = "profileImageOf"+this.state.user_id+ext;
      let fd = new FormData();
      fd.append("folderUpload", file, filename)
      console.log(this.state.selectedFolderPath)
      fd.append("filepath", this.state.selectedFolderPath)
      axios.post("/files/uploadFileFolder",fd).then((response) => {
          let temp = [].concat(response.data);
          window.location.reload();
          // if (temp[0]['msg'] === "Success") {
          //     this.setState({
          //         profileImageURL: temp[0]['data']['imgUrl']
          //     });
          //     console.log(temp[0]['data']['imgUrl'])
          //     window.location.reload();
          // }
      });
  }
}

  render() {
    const { classes } = this.props;

    return (
      <div style ={{margin: 84}}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Grid item xs={12}>
                        <div className={"displayError"}>
                            {/* <FormErrors formErrors={this.state.formErrors} /> */}
                        </div>
                    </Grid>
                    <Grid item xs={12} >
                    {this.state.FLAG ? 
                    <div>
                    <form>
                            <div className="form-group">
                                <label 
                                    style={{display: 'block'}}
                                    htmlFor="newFolderInput"
                                    className="m-label-text"
                                >
                                    {/* Course ID* */}
                                </label>
                                <input
                                    type="text"
                                    onChange={event =>
                                        this.handleUserInput(event)
                                    }
                                    name="newFolderName"
                                    className="m-input-style-300 form-control"
                                    style={{margin: '32px'}}
                                    value={this.state.newFolderName}
                                    id="newFolderInput"
                                    placeholder="Enter New Folder Name"
                                />
                            </div>
                            <Button
                                onClick={this.handleNewFolderSubit}
                                // disabled={!this.state.formValid}
                                type="button"
                                style={{margin: '32px'}}
                                variant="outlined"
                                className="m-submit-button"
                            >
                                New Folder
                            </Button>
                        </form>
                            <input 
                                // style = {{display: 'none'}}
                                type="file" 
                                onChange={this.fileSelectedNowUpload}
                                // ref={fileInput => this.fileInput = fileInput }
                            />
                            </div>
                            :
                            <div>

                            </div>
                    }
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item xs={6}>
                            <List
                                component="nav"
                                className={classes.folderMenuRoot}
                            >
                            {this.prepareFileStructure(this.state.fileStructure,0)}
                            </List>
                        </Grid>
                        <Grid item xs={6} >
                            <List
                                component="nav"
                                className={classes.folderMenuRoot}
                            >
                                {this.prepareFileStructureLvl0(this.state.parenFolderFileStructure,0)}
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
    )
  }
}


Files.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Files);

