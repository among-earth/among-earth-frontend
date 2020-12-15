import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import styled from 'styled-components';

const RegionSearchInput = ({
  country,
  setCountry,
  setCountryCode,
  setCountrySelect,
  inputValue,
  setInputValue,
}) => {

  const handleInputChange = ev => {
    setInputValue(ev);
  };

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const countryCode = results[0].address_components[0].short_name;

    setCountryCode(countryCode);
    setCountrySelect(true);
    setCountry(value);
    setInputValue(value);
  };

  const searchOptions = {
    types: ['(regions)'],
  };

  return (
    <PlacesAutocomplete
      value={inputValue}
      onChange={handleInputChange}
      onSelect={handleSelect}
      searchOptions={searchOptions}
      shouldFetchSuggestions={inputValue.length > 1}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Wrapper>
          <input {...getInputProps({ placeholder: '가고 싶은 나라를 입력 해 주세요.' })} />
            {loading ? <Suggestion>...loading</Suggestion> : null}

            {suggestions.map(suggestion => {
              const style = {
                color: suggestion.active ? '#eba13d' : '#efe1d9',
                borderBottom: suggestion.active ? '1px solid #eba13d' : 'none',
              };

              return (
                <Suggestion key={suggestion.description} {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </Suggestion>
              );
            })}
        </Wrapper>
      )}
    </PlacesAutocomplete>
  );
};

export default RegionSearchInput;

RegionSearchInput.propTypes = {
  country: PropTypes.string.isRequired,
  setCountry: PropTypes.func.isRequired,
  setCountryCode: PropTypes.func.isRequired,
  setCountrySelect: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  margin-top: 20px;
`;

const Suggestion = styled.div`
  width: 340px;
  height: 50px;
  z-index: 2;
  cursor: pointer;
  color: ${({theme}) => theme.ivory};
  line-height: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: '20px';
  transition-duration: 0.4s;
`;
