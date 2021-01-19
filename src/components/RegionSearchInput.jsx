import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

import Error from './Error';
import { MESSAGES } from '../constants';
import { regionSearchOptions } from '../constants/options';

function RegionSearchInput({
  setCountry,
  setCountrySelect,
  inputValue,
  error,
  onError,
  onChange,
}) {
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const countryCode = results[0].address_components[0].short_name;

    setCountry({ country: { name: value, code: countryCode } });
    setCountrySelect(true);
  };

  return (
    <PlacesAutocomplete
      onError={onError}
      value={inputValue}
      onChange={val => onChange(val)}
      onSelect={handleSelect}
      searchOptions={regionSearchOptions}
      shouldFetchSuggestions={inputValue.length > 1}
      debounce={1000}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading, displaySuggestions }) => (
        <Wrapper>
          <input {...getInputProps({ placeholder: MESSAGES.REGION_SEARCH })} />
            {loading ? <Suggestion>...Loading</Suggestion> : null}
            {error &&
              <Error>
                <h1>{MESSAGES.ZERO_RESULT}</h1>
              </Error>
            }
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
}

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

export default RegionSearchInput;

RegionSearchInput.propTypes = {
  setCountry: PropTypes.func.isRequired,
  setCountrySelect: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  onError: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
