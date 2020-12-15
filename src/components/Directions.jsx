import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RegionSearchInput from './RegionSearchInput';
import LandmarkSearchInput from './LandmarkSearchInput';
import Maps from './Maps';
import { fetchNearestPlacesFromGoogle } from '../utils/api';
import Modal from './Modal';
import Header from './Header';
import Footer from './Footer';


import { GrLocation } from 'react-icons/gr';

const Directions = ({
  user,
  country,
  landmarkList,
  selectCountry,
  selectLandmark,
  totalDistance,
  calculateTotalDistance,
  points,
  getAllPoints,
}) => {
  const history = useHistory();
  const [countryCode, setCountryCode] = useState('');
  const [isCountrySelect, setCountrySelect] = useState(false);
  const [landmarkInputValue, setLandmarkInputValue] = useState('');
  const [countryInputValue, setCountryInputValue] = useState('');
  const [recommendList, setRecommendList] = useState([]);
  const [isSelected, setSelect] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    (async () => {
      try {
        const suggestions = await fetchNearestPlacesFromGoogle(landmarkList);

        const newRecommendList = suggestions.map(suggestion => ({
          name: suggestion.name,
          id: suggestion.place_id,
          coordinates: suggestion.geometry.location,
        }));

        setRecommendList(newRecommendList);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [isSelected]);

  const handleClick = ev => {
    const { name, id, value, className} = ev.target;

    selectLandmark([{
      name: name,
      id: id,
      coordinates: { lat: Number(value), lng: Number(className) },
    }]);

    if (landmarkList.length === 4) setDisabled(true);
  };

  const submitTravelData = ev => {
    ev.preventDefault();

    setModalOpen(true);
  };

  const handleModalButton = () => {
    history.push('/travels/:travel_id');
  };

  return (
    <Container>
      <Header />
      <form onSubmit={submitTravelData}>
        {isCountrySelect ?
          <LandmarkWrapper>
            <p><span>{country}</span>에서 가고 싶은 장소를 입력해 주세요.</p>
            <LandmarkSearchInput
              inputValue={landmarkInputValue}
              countryCode={countryCode}
              setInputValue={setLandmarkInputValue}
              landmarkList={landmarkList}
              selectLandmark={selectLandmark}
              setNearLandmark={fetchNearestPlacesFromGoogle}
              setRecommendList={setRecommendList}
              setSelect={setSelect}
              disabled={isDisabled}
              setDisabled={setDisabled}
            />
          </LandmarkWrapper> :
          <RegionWrapper>
            <p>안녕하세요<span>{user.nickname}님,</span></p>
            <span>어느 나라로 가볼까요?</span>
            <RegionSearchInput
              country={country}
              setCountry={selectCountry}
              setCountryCode={setCountryCode}
              setCountrySelect={setCountrySelect}
              inputValue={countryInputValue}
              setInputValue={setCountryInputValue}
            />
          </RegionWrapper>
        }
      </form>
      <Recommends>
        {isSelected &&
          <>
          <div>근처에 있는 추천 장소</div>
          {recommendList && recommendList.map(recommend => {
            return (
              <button
                type='button'
                id={recommend.id}
                name={recommend.name}
                onClick={handleClick}
                key={recommend.id}
                value={recommend.coordinates.lat}
                className={recommend.coordinates.lng}
              >
                {recommend.name}
              </button>
            );
          })}
          </>
        }
      </Recommends>
      <SelectedLandmarkWrapper>
        {landmarkList && landmarkList.map(landmark => {
          return (
          <div key={landmark.id}>
            <span>{landmark.name}</span>
            <GrLocation fontSize='24px' style={{ color: '#eba13d'}}/>
          </div>
          );
        })}
      </SelectedLandmarkWrapper>
      <button onClick={openModal}>확인</button>
      {isModalOpen &&
        <Modal
          isModalOpen={isModalOpen}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          <Maps
            landmarkList={landmarkList}
            setTotalDistance={calculateTotalDistance}
            setPoints={getAllPoints}
          />
          <button onClick={handleModalButton}>좋아요</button>
        </Modal>
      }
      <Footer />
    </Container>
  );
};

const Container = styled.div`
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
    outline: none;

    &:focus {
    background: #f7efeb;
    }
  }

  input[type='submit'] {
    width: 60px;
    cursor: pointer;
    text-align: center;
    background-color: ${({theme}) => theme.orangeYellow};
    height: 50px;
    border-radius: 6px;
    color: ${({theme}) => theme.ivory};
    font-family: 'Limelight', cursive;
  }
`;

const SelectedLandmarkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 30px;
  }

  span {
    margin-bottom: 20px;
    font-size: 14px;
  }
`;

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

const Recommends = styled.div`
  width: 500px;

  div {
    color: ${({theme}) => theme.ivory};
  }

  button {
    padding: 5px 10px;
    border-radius: 20px;
    border: none;
    margin: 10px;
    background-color: ${({theme}) => theme.ivory};
    color: ${({theme}) => theme.green}
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
};

// FIXME: image 가져오기
// const newRecommendList = await suggestions.map(async suggestion => {
//   try {
//   const photoRef = suggestion.photos[0].photo_reference;
//   let url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
//   let res = await fetch(url, {
//     credentials: 'includes',
//   });
//   const blob = new Blob();
//   const result = res.blob();

//   const image = URL.createObjectURL(result);

//   return ({
//     name: suggestion.name,
//     id: suggestion.place_id,
//     coordinates: suggestion.geometry.location,
//     photo: image,
//   })
// } catch (err) {
//   console.log(err);
// }
// });