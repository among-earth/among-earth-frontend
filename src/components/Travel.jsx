import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';
import Loading from './Loading';
import { delay } from '../utils/delay';

const Canvas = lazy(async () => {
  await delay(1600);
  return import('./Canvas');
});

function Travel() {
  const [streetviewUrls, setStreetviewUrls] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { nickname, travelId, points } = useSelector(state => ({
    nickname: state.user.nickname,
    travelId: state.directions.id,
    points: state.directions.points,
  }));

  const getAllImagePaths = async urls => {
    let copyPaths = [];
    setIsLoading(true);

    try {
      const data = await Promise.all(urls.map(url => fetch(url)));

      for (let item of data) {
        const { url } = item;
        copyPaths.push(url);
      }

      setImagePaths([...copyPaths]);
    } catch (err) {
      const { response } = err;
      if (response) alert('이미지 경로를 불러들이는데 실패했습니다. 다시 시도해주세요.');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (points) {
      let urlList = [];

      points.forEach(point => {
        const { lat, lng, head } = point;
        urlList.push(`https://maps.googleapis.com/maps/api/streetview?size=640x640&pitch=30&fov=100&location=${lat},${lng}&heading=${head}&source=outdoor&key=AIzaSyDXgeijd6uNjxKp9CyhpY-z_KKKYH5mXZ8`);
      });

      setStreetviewUrls([...urlList]);
    }
  }, []);

  useEffect(() => {
    getAllImagePaths(streetviewUrls);
  }, [streetviewUrls]);

  return (
    <TravelContainer>
      <Header />
      <Suspense fallback={<Loading />}>
        {isLoading
          ? <Loading />
          : <Canvas paths={imagePaths} travelId={travelId} points={points}/>
        }
      </Suspense>
      <Footer />
    </TravelContainer>
  );
}

const TravelContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({theme}) => theme.coralRed};
  position: relative;
`;

export default Travel;
