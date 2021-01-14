import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LandmarkSearchInput from './LandmarkSearchInput';
import Recommends from './Recommends';
import SelectedLandmark from './SelectedLandmark';

import { wooble } from './styles/keyframes';

function LandmarkSearch({
  country,
  landmarkList,
  selectLandmark,
  setLandmarkSelect,
  isLandmarkSelected,
  recommendList,
  openModal,
}) {
  const [landmarkInputValue, setLandmarkInputValue] = useState('');
  const [error, setError] = useState(false);
  const { name , code} = country;

  const handleError = () => {
    setError(true);
  };

  const handleInputChange = value => {
    if (error) setError(false);

    setLandmarkInputValue(value);
  };

  const addLandmark = ev => {
    ev.preventDefault();

    const { name, id, value, className} = ev.target;

    selectLandmark([{
      name: name,
      id: id,
      coordinates: { lat: Number(value), lng: Number(className) },
    }]);
  };

  return (
    <div style={{ width: '100%'}}>
      {isLandmarkSelected ?
        <RecommendsWrapper>
          <Recommends
            addLandmark={addLandmark}
            recommendList={recommendList}
            landmarkList={landmarkList}
          />
          <SelectedLandmark landmarkList={landmarkList} />
          <ModalButton onClick={() => openModal}>GO!</ModalButton>
        </RecommendsWrapper>
      :
        <LandmarkWrapper>
          <p><span>{name}</span>에서 가고 싶은 장소를 입력해 주세요.</p>
          <LandmarkSearchInput
            inputValue={landmarkInputValue}
            countryCode={code}
            selectLandmark={selectLandmark}
            setLandmarkSelect={setLandmarkSelect}
            error={error}
            onError={handleError}
            onChange={handleInputChange}
          />
        </LandmarkWrapper>
      }
    </div>
  );
}

const ModalButton = styled.button`
  width: 60px;
  cursor: pointer;
  text-align: center;
  background-color: ${({theme}) => theme.orangeYellow};
  height: 50px;
  border-radius: 6px;
  color: ${({theme}) => theme.ivory};
  font-family: 'Limelight', cursive;
  border: none;
  outline: none;

  &:hover {
    animation: ${wooble} 1s 1;
  }
`;


const RecommendsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LandmarkWrapper = styled.div`
  margin: 40px 0;

  p {
    margin-bottom: 8px;
    color: ${({theme}) => theme.ivory};
  }

  span {
    color: ${({theme}) => theme.ivory};
  }

  span:first-child {
    font-size: 24px;
    margin-right: 10px;
  }
`;

export default LandmarkSearch;

LandmarkSearch.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  landmarkList: PropTypes.array.isRequired,
  selectLandmark: PropTypes.func.isRequired,
  setLandmarkSelect: PropTypes.func.isRequired,
  isLandmarkSelected: PropTypes.bool.isRequired,
  recommendList: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
