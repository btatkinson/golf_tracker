import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import './LBPlayer.scss';

class LBPlayer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      pdata: this.props.pdata
    }

    this.handleTracking = this.handleTracking.bind(this);
  }

  // move to helpers
  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  async handleTracking(evt){
    let pdata_copy = this.state.pdata;
    pdata_copy.is_tracked = !pdata_copy.is_tracked;
    await this.setState({
      pdata: pdata_copy
    })
    if(this.state.pdata.is_tracked){
      this.props.addp(this.state.pdata);
    }else {
      this.props.removep(this.state.pdata);
    }
  }

  render(){
    return(
        <tr className='LBPlayer'>
          <td className='track-cell'>
            <h4><FontAwesomeIcon icon={faEye} className={"LBP-eye " + (this.state.pdata.is_tracked ? "eye-selected" : "")} onClick={this.handleTracking}/></h4>
          </td>
          <td className='LBP-main'>
            <p className={"LBP-pname " + (this.state.pdata.is_tracked ? "eye-selected" : "")}>{`${this.props.pdata.player_bio.first_name} ${this.props.pdata.player_bio.last_name}`}</p>
            <ul className='LBP-rounds'>
              {this.props.pdata.rounds.map(
                (r,index) => <li className='LBP-strokes' key={index}>{r.strokes ? r.strokes : "Cut"}</li>)}
            </ul>
            <ul className='LBP-sg'>
              {this.props.pdata.rounds.map(
                (r,index) => <li className='LBP-strokes' key={index}>{r.strokes ? this.round(this.props.avgs[index]-r.strokes,1) : ""}</li>)}
            </ul>
          </td>
          <td></td>
          <td className='LBP-score'>
            <div className='LBP-total'>
              <h2 className="LBP-stext">{this.props.pdata.total}</h2>
              <h4 className="LBP-ptext">{this.props.pdata.current_position}</h4>
            </div>
          </td>
        </tr>
    )
  };
}


export default LBPlayer
