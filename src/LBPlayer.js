import React, { Component } from 'react';

class LBPlayer extends Component{
  constructor(props) {
    super(props);
    console.log(props);
  }
  render(){
    return(
        <tr>
          <td>{this.props.player_data.current_position}</td>
          <td>{`${this.props.player_data.player_bio.first_name} ${this.props.player_data.player_bio.last_name}`}</td>
          <td>{this.props.player_data.total}</td>
        </tr>
    )
  };
}


export default LBPlayer
