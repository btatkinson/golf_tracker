import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import LBJtron from '../../LBJtron';
import LBJtable from '../../LBJtable';
import LBTracked from '../../LBTracked';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import '../../Leaderboard.scss';

const PGA_BASE_URL = "https://statdata.pgatour.com/r";

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.rnd_averages = [null,null,null,null]
    this.state = {
      current: null,
      pga_leaderboard: null,
      isLoaded: false,
      tracking: [],
      h2h:[],
      threeball:[],
      dkTeams:[],
    };
    this.logout = this.props.logout.bind(this);
  }

  determine_stroke_averages(cr, finished){
    let to_determine = finished ? cr : cr-1;
    let players = this.state.pga_leaderboard.leaderboard.players;

    // determine average round score for each round played
    if (to_determine > 0){
      let rounds = [...Array(to_determine).keys()]
      for (var i = 0; i < rounds.length; i++) {
        let all_scores = [];
        for (var j = 0; j < players.length; j++) {
          let pscore = players[j].rounds[i].strokes
          if (pscore != null){
            all_scores.push(pscore);
          }
        }
        let rnd_average = _.mean(all_scores);
        this.rnd_averages[i] = rnd_average;
      }
    };
  }

  add_player = (player)=>{
    this.setState(state => ({
      tracking: [...state.tracking, player]
    }));
  }

  remove_player = (player) =>{
    this.setState({
      tracking: this.state.tracking.filter(
      p => p !== player)
    });
  }


  async componentDidMount(){
    let current = await axios.get(`${PGA_BASE_URL}/current/message.json`);
    this.setState({current:current.data.tid});
    let pga_leaderboard = await axios.get(`${PGA_BASE_URL}/${this.state.current}/leaderboard-v2mini.json`);

    // add "is tracked" property to players
    let new_players = []
    for (var i = 0; i < pga_leaderboard.data.leaderboard.players.length; i++) {
      let player = pga_leaderboard.data.leaderboard.players[i]
      player["is_tracked"] = false
      new_players.push(player)
    }
    pga_leaderboard.players = new_players;
    this.setState({
      pga_leaderboard: pga_leaderboard.data
    })

    // logic to determine previous round averages (to display strokes gained)
    let current_round = pga_leaderboard.data.leaderboard.current_round
    let is_finished = pga_leaderboard.data.leaderboard.is_finished
    this.determine_stroke_averages(current_round,is_finished)

    this.setState({
      isLoaded: true
    })
  }

  render(){

    return(
      <div>
        {this.state.isLoaded ? (
          <div>
            { this.props.isAuthenticated ? <button onClick={this.logout}>Logout</button>
            : (<div><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></div>)}
            <LBJtron info={this.state.pga_leaderboard.leaderboard} />
            <LBTracked
              tracked={this.state.tracking}
              avgs={this.rnd_averages}
              addp={this.add_player}
              removep={this.remove_player}
            />
            <LBJtable
              players={this.state.pga_leaderboard.leaderboard.players}
              avgs={this.rnd_averages}
              addp={this.add_player}
              removep={this.remove_player}
               />
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
function mapStateToProps(state){
  return {
    isAuthenticated: !!state.user.token
  }
}

Leaderboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};


export default connect(mapStateToProps, { logout })(Leaderboard);
