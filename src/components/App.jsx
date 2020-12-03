import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';

import TravelInfo from './TravelInfo';
import LandingPage from './LandingPage';
import UserInfo from './UserInfo';
import Directions from './Directions';
import Travel from './Travel';
import Travels from './Travels';

import theme from './styles/theme';
import GlobalStyle from './styles/globalStyle';

function App({ user, setUserNickname }) {
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
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
    </ThemeProvider>
  );
}

export default App;

App.propTypes = {
  user: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  setUserNickname: PropTypes.func.isRequired,
};
