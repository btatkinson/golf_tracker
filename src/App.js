import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Leaderboard from './components/pages/Leaderboard';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Dashboard from './components/pages/Dashboard';
import Confirmation from './components/pages/Confirmation';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import './App.scss';

class App extends Component{

  render(){
    return (
      <div className="App">
        <Switch>
          <Route location={window.location} exact path='/' component={Leaderboard} />
          <Route location={window.location} exact path='/confirmation/:token' component={Confirmation} />
          <GuestRoute location={window.location} exact path='/login' component={Login} />
          <GuestRoute location={window.location} exact path='/signup' component={Signup} />
          <UserRoute location={window.location} exact path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    );
  }

}

// App.propTypes = {
//   location: PropTypes.shape({
//     pathname: PropTypes.string.isRequired
//   }).isRequired
// }

export default App;
