import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import RegionSearch from './RegionSearch';
import LandmarkSearch from './LandmarkSearch';
import Maps from './Maps';
import Button from './Button';
import Modal from './Modal';
import Footer from './Footer';
import { getNearestPlaces } from '../utils/api';
import { MESSAGES } from '../constants';

function Directions({
  user,
  country,
  landmarkList,
  selectCountry,
  selectLandmark,
  totalDistance,
  calculateTotalDistance,
  points,
  getAllPoints,
  travelId,
}) {
  const [recommendList, setRecommendList] = useState([]);
  const [isCountrySelected, setCountrySelect] = useState(false);
  const [isLandmarkSelected, setLandmarkSelect] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    (async () => {
      try {
        const suggestions = await getNearestPlaces(landmarkList);
        const newRecommendList = suggestions.map(suggestion => ({
          name: suggestion.name,
          id: suggestion.place_id,
          coordinates: suggestion.geometry.location,
        }));

        setRecommendList(newRecommendList);
      } catch (err) {
        const { response } = err;
        if (response) alert(MESSAGES.RECOMMENDS_FAIL);
      }
    })();
  }, [isLandmarkSelected]);

  const submitTravelData = ev => {
    ev.preventDefault();

    setModalOpen(true);
  };

  return (
    <Container>
      <FormWrapper onSubmit={submitTravelData}>
        {isCountrySelected ?
          <LandmarkSearch
            landmarkList={landmarkList}
            selectLandmark={selectLandmark}
            setLandmarkSelect={setLandmarkSelect}
            country={country}
            recommendList={recommendList}
            openModal={openModal}
            isLandmarkSelected={isLandmarkSelected}
          />
        :
          <RegionSearch
            user={user}
            setCountry={selectCountry}
            setCountrySelect={setCountrySelect}
          />
        }
      </FormWrapper>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          travelId={travelId}
        >
          <h1>이 경로로 여행을 시작할까요?</h1>
          <h3>총 거리는 {totalDistance}m 입니다.</h3>
          <Maps
            landmarkList={landmarkList}
            setTotalDistance={calculateTotalDistance}
            setPoints={getAllPoints}
          />
          <Button path={`/travels/${travelId}`} isLanding={false}>Lets go!</Button>
        </Modal>
      )}
      <Footer />
    </Container>
  );
}

const FormWrapper = styled.form`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({theme}) => theme.green};

  input {
    all: unset;
  }

  input[type='text'] {
    width: 300px;
    background: #efe1d9;
    padding: 0 20px;
    height: 50px;
    border-radius: 6px;

    &:focus {
    background: #f7efeb;
    }
  }
`;

export default Directions;

Directions.propTypes = {
  user: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
  }).isRequired,
  country: PropTypes.string.isRequired,
  landmarkList: PropTypes.array.isRequired,
  selectCountry: PropTypes.func.isRequired,
  selectLandmark: PropTypes.func.isRequired,
  totalDistance: PropTypes.number.isRequired,
  calculateTotalDistance: PropTypes.func.isRequired,
  points: PropTypes.array.isRequired,
  getAllPoints: PropTypes.func.isRequired,
  travelId: PropTypes.string.isRequired,
};
