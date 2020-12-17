import { connect } from 'react-redux';

import { calculateTotalDistance, selectCountry, selectLandmark, getAllPoints, setTravelId } from '../redux/directions/directions.actions';

import Directions from '../components/Directions';

const mapStateToProps = state => ({
    country: state.directions.country,
    landmarkList: state.directions.landmarkList,
    totalDistance: state.directions.totalDistance,
    points: state.directions.points,
    travelId: state.directions.id,
});

const mapDispatchToProps = dispatch => ({
  selectCountry: action => dispatch(selectCountry(action)),
  selectLandmark: action => dispatch(selectLandmark(action)),
  calculateTotalDistance: action => dispatch(calculateTotalDistance(action)),
  getAllPoints: action => dispatch(getAllPoints(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Directions);
