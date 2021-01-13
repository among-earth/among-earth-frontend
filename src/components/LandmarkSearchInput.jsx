import React from 'react';
import PropTypes from 'prop-types';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import styled from 'styled-components';

import { selectLastWord } from '../utils';

function LandmarkSearchInput({
  inputValue,
  countryCode,
  setInputValue,
  selectLandmark,
  setLandmarkSelect,
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

  const searchOptions = {
    componentRestrictions: { country: countryCode },
    type: ['tourist_attraction'],
  };

  return (
    <PlacesAutocomplete
      value={inputValue}
      onChange={setInputValue}
      onSelect={handleInitialLandmark}
      searchOptions={searchOptions}
      shouldFetchSuggestions={inputValue.length > 1}
      debounce={1000}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Wrapper>
          <input {...getInputProps({ placeholder: '가고 싶은 랜드마크를 입력 해 주세요.' })} />
          {loading ? <Suggestion>...Loading</Suggestion> : null}
          {suggestions.map(item => {
            const style = {
              color: item.active ? '#eba13d' : '#efe1d9',
              borderBottom: item.active ? '1px solid #eba13d' : 'none',
            };
            return (
              <Suggestion key={item.description} {...getSuggestionItemProps(item, { style })}>
                {item.description}
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
  setInputValue: PropTypes.func.isRequired,
  selectLandmark: PropTypes.func.isRequired,
  setLandmarkSelect: PropTypes.func.isRequired,
};
