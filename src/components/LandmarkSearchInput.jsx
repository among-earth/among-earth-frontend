import React from 'react';
import PropTypes from 'prop-types';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import styled from 'styled-components';

import Error from './Error';
import { selectLastWord } from '../utils';
import { MESSAGES } from '../constants';
import { landmarkSearchOptions } from '../constants/options';

function LandmarkSearchInput({
  inputValue,
  countryCode,
  selectLandmark,
  setLandmarkSelect,
  error,
  onError,
  onChange,
}) {
  const handleInitialLandmark = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    const placeId = results[0].place_id;
    const pickedKoreanName = selectLastWord(value);

    selectLandmark([{
      name: pickedKoreanName,
      id: placeId,
      coordinates: latLng,
    }]);

    setLandmarkSelect(true);
  };

  return (
    <PlacesAutocomplete
      onError={onError}
      value={inputValue}
      onChange={val => onChange(val)}
      onSelect={handleInitialLandmark}
      searchOptions={landmarkSearchOptions(countryCode)}
      shouldFetchSuggestions={inputValue.length > 1}
      debounce={1000}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Wrapper>
          <input {...getInputProps({ placeholder: MESSAGES.LANDMARK_SEARCH })} />
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
  color: ${({ theme }) => theme.ivory};
  line-height: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: '20px';
  transition-duration: 0.4s;
`;

export default LandmarkSearchInput;

LandmarkSearchInput.propTypes = {
  inputValue: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectLandmark: PropTypes.func.isRequired,
  setLandmarkSelect: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
