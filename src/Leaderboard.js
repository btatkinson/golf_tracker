import React, { Component } from 'react';
import axios from 'axios';
import LBJtron from './LBJtron';
import LBJtable from './LBJtable';
import './Leaderboard.scss';

const PGA_BASE_URL = "https://statdata.pgatour.com/r";

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: null,
      pga_leaderboard: null,
      isLoaded: false,
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
            <LBJtron info={this.state.pga_leaderboard.leaderboard} />
            <LBJtable data={this.state.pga_leaderboard.leaderboard} />
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
