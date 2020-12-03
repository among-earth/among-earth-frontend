import { connect } from 'react-redux';

import { setUserNickname } from '../redux/user/user.actions';

import App from '../components/App';

const mapStateToProps = state => ({
  user: state.nickname,
});

const mapDispatchToProps = dispatch => ({
  setUserNickname: action => dispatch(setUserNickname(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
