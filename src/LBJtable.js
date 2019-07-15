import React, { Component } from 'react';
import LBPlayer from './LBPlayer';
import './LBJtable.scss';

class LBJtable extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <div className="LBJheader-container">
          <h1 className="LBJtable-header">Leaderboard</h1>
        </div>
        <div className="LBJtable-container">
          <table className="LBJtable">
            <tbody>
                {this.props.players.map(
                  p => <LBPlayer
                  key={p.player_id}
                  pdata={p}
                  avgs={this.props.avgs}
                  addp={this.props.addp}
                  removep={this.props.removep}
                  />)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default LBJtable
