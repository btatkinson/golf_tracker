import React from 'react';
import { Route } from 'react-router-dom';
import Leaderboard from './components/pages/Leaderboard';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import PropTypes from 'prop-types';
import './App.scss';

function App({ location }) {
  return (
    <div className="App">
      <Route location={location} exact path='/' component={Leaderboard} />
      <GuestRoute location={location} exact path='/login' component={Login} />
      <UserRoute location={location} exact path='/dashboard' component={Dashboard} />
    </div>
  );
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App;
