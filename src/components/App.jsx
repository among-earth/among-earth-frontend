import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import TravelInfo from './TravelInfo';
import LandingPage from './LandingPage';
import UserInfo from './UserInfo';
import Directions from './Directions';
import Travel from './Travel';
import Travels from './Travels';

function App({ user, setUserNickname }) {
  return (
    <Switch>
      <Route exact path='/'>
        {user ? <TravelInfo /> : <LandingPage />}
      </Route>
      <Route path='/users'>
        <UserInfo onLogin={setUserNickname} />
      </Route>
      <Route path='/directions'>
        <Directions />
      </Route>
      <Route path='/travel/:travel_id'>
        <Travel />
      </Route>
      <Route path='/travels'>
        <Travels />
      </Route>
      <Redirect to='/' />
    </Switch>
  );
}

export default App;

App.propTypes = {
  user: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  setUserNickname: PropTypes.func.isRequired,
};
