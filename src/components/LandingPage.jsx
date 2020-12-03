import React from 'react';
import PropTypes from 'prop-types';

function LandingPage({ history }) {

  const moveToPath = path => history.push(path);

  return (
    <div>
      <div>
        <span>AMONG</span>
        <span>EARTH</span>
      </div>
      <button onClick={moveToPath('/user')}>START</button>
    </div>
  );
}

export default LandingPage;

LandingPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
