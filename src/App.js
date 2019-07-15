import React from 'react';
import { Route } from 'react-router-dom';
import Leaderboard from './components/pages/Leaderboard';
import Login from './components/pages/Login';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Leaderboard} />
      <Route exact path='/login' component={Login} />
    </div>
  );
}

export default App;
