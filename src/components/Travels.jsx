import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import Header from './Header';
import { URLS, MESSAGES } from '../constants';
import { getTravelId } from '../utils';
import { getAllPhoto } from '../utils/api';

function Travels() {
  const history = useHistory();
  const [allImages, setAllImages] = useState(null);
  const { nickname } = useSelector(state => ({
    nickname: state.user.nickname,
  }));

  const moveToTravels = ev => {
    ev.preventDefault();

    const { value } = ev.target;
    const travelId = getTravelId(value);

    history.push(`/travels/${travelId}`);
  };

  useEffect(() => {
    (async function () {
      try {
        const images = await getAllPhoto();

        setAllImages(images);
      } catch(err) {
        const { response } = err;
        if(response) alert(MESSAGES.GET_PHOTOS_FAIL);
      }
    })();
  }, []);

  return (
    <TravelsContainer>
      <h1><span>{nickname}님,</span> 여행은 즐거우셨나요? <p>다른 여행을 떠나볼까요?✈️</p></h1>
      <GridContainer>
      {allImages && allImages.map(image => {
        const { path, time } = image;
        const route = `${URLS.AWS_S3}/${path}`;

        return (
          <ImageContainer key={path}>
            <img src={route}></img>
            <Contents>
              <button onClick={ev => moveToTravels(ev)} value={path}>GO!</button>
              <div>{time}</div>
            </Contents>
          </ImageContainer>
        );
      })}
      </GridContainer>
    </TravelsContainer>
  );
}

const TravelsContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({theme}) => theme.green};

  h1 {
    margin: 200px 0 100px 0;
    font-size: 20px;
    color: ${({theme}) => theme.ivory};
    text-align: center;

    span {
      font-size: 28px;
    }

    p{
      margin: 15px 0;
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  padding: 100px;
  grid-template-columns: 250px 250px 250px 250px;
  grid-gap: 3rem;
  justify-items: center;
  margin: 0;
  padding: 0;
`;

const ImageContainer = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 0 0 30px 0;
  height: 360px;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04);

  img {
    object-fit: cover;
      width: 250px;
      height: 250px;
  }

  &:hover {
      transform: scale(1.1);
      transition-duration: 0.4s;
  }
`;

const Contents = styled.div`
  padding: 10px;

  button {
    position: absolute;
    background: none;
    background-color: ${({theme}) => theme.orangeYellow};
    border-radius: 30px;
    border: none;
    width: 50px;
    height: 50px;
    font-size: 20px;
    right: 0;
    margin-right: 10px;
    color: white;
    cursor: pointer;
    outline: none;
    font-family: 'Limelight', cursive;
  }

  div {
    position: absolute;
    bottom: 10px;
  }
`;

export default Travels;
