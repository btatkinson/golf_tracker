import React, { Component } from 'react';
import LBPlayer from './LBPlayer';
import './LBJtable.scss';

class LBJtable extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="LBJtable-container">
        <table className="LBJtable">
            <tbody>
              {this.props.data.players.map(
                p => <LBPlayer key={p.player_id} player_data={p}/>)}
            </tbody>
          </table>
        </div>);
  }
}

export default LBJtable
