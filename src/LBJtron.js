import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCut,faCrosshairs,faGolfBall,faCircle } from '@fortawesome/free-solid-svg-icons'
import './LBJtron.scss';

class Jtron extends Component {
  constructor(props) {
    super(props);

    this.first_place_money = this.props.info.players[0].rankings.projected_money_event;
  }
  render(){
    return(
      <div className="LBJtron">
        <div className="LBJ-maintext">
          <h1 className="LBJ-title">{this.props.info.tournament_name}</h1>
          <div className="LBJ-mainrow">
            <div className="LBJ-ipcell">
              <h2> <FontAwesomeIcon icon={faCircle} className="LBJ-icon LBJ-neon" /> R{this.props.info.current_round} {this.props.info.round_state}</h2>
            </div>
            <div className="LBJ-moneycell"><h2>1st Place: ${this.first_place_money.toLocaleString()}</h2>
            </div>
          </div>
          <div className="LBJ-secondaryrow">
            <div className="LBJ-secondarycell">
              <h2> <FontAwesomeIcon icon={faCut} className="LBJ-icon" /> Cut Line: {this.props.info.cut_line.cut_line_score}</h2>
            </div>
            <div className="LBJ-secondarycell">
              <h2> <FontAwesomeIcon icon={faCrosshairs} className="LBJ-icon" /> {this.props.info.courses[0].course_name} in Silvis, IL</h2>
            </div>
            <div className="LBJ-secondarycell">
              <h2> <FontAwesomeIcon icon={faGolfBall} className="LBJ-icon" /> Par {this.props.info.courses[0].par_total}, {Math.round(this.props.info.courses[0].distance_total/33)} Yards</h2>
            </div>
          </div>
        </div>
      </div>
  )
  }
}




export default Jtron;
