import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import RegionSearchInput from './RegionSearchInput';

function RegionSearch({
  user,
  setCountry,
  setCountrySelect,
}) {
  const [countryInputValue, setCountryInputValue] = useState('');
  const [error, setError] = useState(false);
  const { nickname } = user;

  const handleError = () => {
    setError(true);
  };

  const handleInputChange = value => {
    if (error) setError(false);

    setCountryInputValue(value);
  };

  return (
    <RegionWrapper>
      <p>안녕하세요<span>{nickname}님,</span></p>
      <span>어느 나라로 가볼까요?</span>
      <RegionSearchInput
        setCountry={setCountry}
        setCountrySelect={setCountrySelect}
        inputValue={countryInputValue}
        error={error}
        onError={handleError}
        onChange={handleInputChange}
      />
    </RegionWrapper>
  );
}

const RegionWrapper = styled.div`
  p {
    margin-bottom: 8px;
    color: ${({theme}) => theme.ivory};
  }

  span {
    color: ${({theme}) => theme.ivory};
  }

  span:first-child {
    font-size: 24px;
    margin: 0 10px;
  }
`;

export default RegionSearch;

RegionSearch.propTypes = {
  user: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
  }).isRequired,
  setCountry: PropTypes.func.isRequired,
  setCountrySelect: PropTypes.func.isRequired,
};
