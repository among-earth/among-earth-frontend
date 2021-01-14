import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

function Error({ children }) {
  return (
    <div>
      <ErrorBox>
      <h1>{children}</h1>
      </ErrorBox>
    </div>
  );
}

const ErrorBox = styled.div`
  width: 100%;
  border-bottom: 1px solid #BC3A46;
  text-align: center;

  h1 {
    color: ${({theme}) => theme.coralRed};
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;

export default Error;

Error.propTypes = {
  children: PropTypes.node.isRequired,
};
