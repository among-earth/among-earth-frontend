import { connect } from 'react-redux';

import { selectCountry } from '../redux/directions/directions.actions';

import Travel from '../components/Travel';

const mapStateToProps = state => ({
  points: state.directions.points,
  travelId: state.directions.id,
});

const mapDispatchToProps = dispatch => ({
  selectCountry: action => dispatch(selectCountry(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Travel);
