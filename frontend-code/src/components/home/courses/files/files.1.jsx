
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';

import {getStructure} from '../../UserFunctions'

class Files extends React.Component {

componentDidMount() {

  this.makeRequest('../backend-code/public/uploads/',"fileStructure");
  
  this.makeRequest("../backend-code/public/uploads/","parenFolderFileStructure");
}

makeRequest = (path,stateElement) => {
  let sendData = {
      path: path
      // path: this.state.rootFolderPath
      // path: "testing1/"
  };
  // console.log(sendData)

  getStructure(sendData)
  .then(response => {
    // console.log(response);

    let temp = [].concat(response.data);
    // let temp1 = [].concat(res.data);
    // console.log(temp[0]["data"]);
    var res = {
      name: 'react-treebeard',
      toggled: true,
      children: temp[0]["data"],
    }
    
    if (temp[0]["msg"] === "Success") {
        console.log(temp[0]["data"]);
        console.log(res);
        this.setState({
            [stateElement] : res
        });
    }
  })
  
};

    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
    render(){
        return (
          <div>
            {console.log(this.state.parenFolderFileStructure)}
            {console.log(this.state.fileStructure)}
            {
              this.state.parenFolderFileStructure ? 
              <Treebeard
                data={this.state.parenFolderFileStructure}
                // data={data}
                onToggle={this.onToggle}
            />
            :
            <div></div>
            }
          </div>
        );
    }
}

const content = document.getElementById('content');

export default (Files);