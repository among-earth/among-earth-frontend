import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';

import LandingPage from './LandingPage';
import UserInfo from './UserInfo';
import DirectionsContainer from '../containers/DirectionsContainer';
import Travel from './Travel';
import Travels from './Travels';
import PATH from '../constants/constants';

import theme from './styles/theme';
import GlobalStyle from './styles/globalStyle';

const App = ({
  user,
  setUserNickname,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Switch>
        <Route exact path={PATH.LANDING}>
          <LandingPage/>
        </Route>
        <Route path={PATH.USER}>
          <UserInfo onLogin={setUserNickname} />
        </Route>
        <Route path={PATH.DIRECTIONS}>
          <DirectionsContainer user={user}/>
        </Route>
        <Route path={PATH.TRAVEL}>
          <Travel />
        </Route>
        <Route path={PATH.TRAVELS}>
          <Travels />
        </Route>
        <Redirect to={PATH.LANDING} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;

App.propTypes = {
  user: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
  }).isRequired,
  setUserNickname: PropTypes.func.isRequired,
};
