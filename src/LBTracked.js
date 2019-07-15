import React, { Component } from 'react';
import LBPlayer from './LBPlayer';
import './LBTracked.scss';


class LBTracked extends Component{
  constructor(props) {
    super(props);

    this.state = {
      tracked: this.props.tracked
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ tracked: nextProps.tracked });
  }

  render(){
    // only display something if golfers are being tracked
    const isTracking = (this.state.tracked.length > 0);
    return(
      <div>
        {isTracking ? (
        <div>
        <div className="LBTracked-container">
          <h1 className="LBJtable-header">Tracking</h1>
          <div className="Radar"></div>
        </div>
        <div className="LBJtable-container">
          <table className="LBJtable">
              <tbody>
                {this.state.tracked.map(
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
          )
       : (
        <span></span>
        )}
      </div>
    )
  }

}

export default LBTracked
