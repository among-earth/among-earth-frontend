import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import Footer from './Footer';
import Loading from './Loading';
import { delay } from '../utils/delay';
import { MESSAGES, URLS } from '../constants';
import { getAllImagePaths } from '../utils/api';

const Canvas = lazy(async () => {
  await delay(1600);
  return import('./Canvas');
});

function Travel() {
  const [streetviewUrls, setStreetviewUrls] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { travelId, points } = useSelector(state => ({
    travelId: state.directions.id,
    points: state.directions.points,
  }));

  useEffect(() => {
    if (points) {
      let urlList = [];

      points.forEach(point => {
        const { lat, lng, head } = point;
        urlList.push(`${URLS.GOOGLE_STREETVIEW}&location=${lat},${lng}&heading=${head}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
      });

      setStreetviewUrls([...urlList]);
    }
  }, []);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const paths = await getAllImagePaths(streetviewUrls);

        setImagePaths([...paths]);
        setIsLoading(false);
      } catch (err) {
        const { response } = err;
        if (response) alert(MESSAGES.PHOTO_FAIL);
      }
    })();
  }, [streetviewUrls]);

  return (
    <TravelContainer>
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
