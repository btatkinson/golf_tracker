import React, { Component } from 'react';
import './LBPlayer.scss';

class LBPlayer extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
        <tr className='LBPlayer'>
          <td className='LBP-main'>
            <p className='LBP-pname'>{`${this.props.player_data.player_bio.first_name} ${this.props.player_data.player_bio.last_name}`}</p>
            <ul className='LBP-rounds'>
              {this.props.player_data.rounds.map(
                (r,index) => <li className='LBP-strokes' key={index}>{r.strokes}</li>)}
            </ul>
          </td>
          <td></td>
          <td>
          {this.props.player_data.total}
          {this.props.player_data.current_position}
          </td>
        </tr>
    )
  };
}


export default LBPlayer
