import React, { Component } from 'react';

class LBPlayer extends Component{
  constructor(props) {
    super(props);

  }
  render(){
    return(
        <tr>
          <td>{this.props.pos}</td>
          <td>{`${this.props.bio.first_name} ${this.props.bio.last_name}`}</td>
          <td>{this.props.total}</td>
        </tr>
    )
  };
}


export default LBPlayer
