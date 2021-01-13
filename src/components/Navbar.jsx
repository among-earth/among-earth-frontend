import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ history }) {
  return (
    <nav>
      <div>
        <div>AMONG EARTH</div>
      </div>
      <div>
        <NavLink to='/'>HOME</NavLink>
        <NavLink to='/travels'>TRAVELS</NavLink>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);

Navbar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
