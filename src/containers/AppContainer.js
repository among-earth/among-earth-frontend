import { connect } from 'react-redux';

import * as userSelector from '../redux/user/user.selector';
import { setUserNickname } from '../redux/user/user.actions';

import App from '../components/App';

const mapStateToProps = state => ({
  user: userSelector.selectUserNickname(state),
});

const mapDispatchToProps = dispatch => ({
  setUserNickname: () => dispatch(setUserNickname('token')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
