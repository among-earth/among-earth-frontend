import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';

import LandingPage from './LandingPage';
import UserInfo from './UserInfo';
import Directions from './Directions';
import Travel from './Travel';
import Travels from './Travels';

import theme from './styles/theme';
import GlobalStyle from './styles/globalStyle';

function App({ user, setUserNickname }) {
  const history = useHistory();
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Switch>
        <Route exact path='/'>
          <LandingPage history={history}/>
        </Route>
        <Route path='/user'>
          <UserInfo history={history} onLogin={setUserNickname} />
        </Route>
        <Route path='/directions'>
          <Directions user={user}/>
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
  user: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
  }).isRequired,
  setUserNickname: PropTypes.func.isRequired,
};
