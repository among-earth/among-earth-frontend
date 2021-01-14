import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';

import LandingPage from './LandingPage';
import UserInfo from './UserInfo';
import Header from './Header';
import DirectionsContainer from '../containers/DirectionsContainer';
import Travel from './Travel';
import Travels from './Travels';
import { ROUTES } from '../constants';

import theme from './styles/theme';
import GlobalStyle from './styles/globalStyle';

function App({
  user,
  setUserNickname,
}) {
  return (
    <Router>
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path={ROUTES.LANDING}>
          <LandingPage/>
        </Route>
        <Route path={ROUTES.USER}>
          <UserInfo onLogin={setUserNickname} />
        </Route>
        <Route path={ROUTES.DIRECTIONS}>
          <DirectionsContainer user={user}/>
        </Route>
        <Route path={ROUTES.TRAVEL}>
          <Travel />
        </Route>
        <Route path={ROUTES.TRAVELS}>
          <Travels />
        </Route>
        <Redirect to={ROUTES.LANDING} />
      </Switch>
    </ThemeProvider>
    </Router>
  );
}

export default App;

App.propTypes = {
  user: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
  }).isRequired,
  setUserNickname: PropTypes.func.isRequired,
};
