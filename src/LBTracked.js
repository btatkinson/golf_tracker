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
    return(
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
    )
  }

}

export default LBTracked
