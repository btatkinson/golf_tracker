import React, { Component } from 'react';
import axios from 'axios';
import LBPlayer from './LBPlayer';
import './Leaderboard.css';

const PGA_BASE_URL = "https://statdata.pgatour.com/r";

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: null,
      pga_leaderboard: null,
      isLoaded: false,
      field:null
    };

  }

  async componentDidMount(){
    let current = await axios.get(`${PGA_BASE_URL}/current/message.json`);
    this.setState({current:current.data.tid});
    let pga_leaderboard = await axios.get(`${PGA_BASE_URL}/${this.state.current}/leaderboard-v2mini.json`);
    this.setState({
      pga_leaderboard:pga_leaderboard.data,
      isLoaded: true,
    })
  }

  render(){

    return(
      <div>
        {this.state.isLoaded ? (
          <div>
            <h1>Tour Leaderboard</h1>
            <table>
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Name</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.state.pga_leaderboard.leaderboard.players.map(
                  p => <LBPlayer key={p.player_id} pos={p.current_position} bio={p.player_bio} total={p.total} />)}
              </tbody>
            </table>
          </div>
        ) : (
        <div className="lb-container">
          <div className="preload">
              <div className="preload-status">
                  <div className="preload-status-bar"></div>
                  <div className="preload-status-info">LOADING</div>
              </div>
          </div>
        </div>
        )
      }
      </div>
    );
  }
}








export default Leaderboard;
