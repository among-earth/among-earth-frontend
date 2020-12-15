import axios from 'axios';

const fetchNearestPlacesFromGoogle = async landmarkList => {
  if(!landmarkList.length) return;

  console.log(landmarkList, 'landmarkList in fetch')

  const { coordinates } = landmarkList[0];

  try {
    const result = await axios.get('http://localhost:8080/directions', {
      params: {
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
    });

    return result.data;
  } catch (err) {
    console.log(err);
  }
};

// const fetchPlacePhotos = async () => {
//   try {
//     const result = await axios.get('https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photoreference=${photoRef}&key={}')
//   }
// }

const fetchStreetviewUrl = async points => {
  console.log(points,' points in api')
  try {
    const result = await axios.post('http://localhost:8080/travels/:travel_id', {
      body: points,
    });

    return result.data;
  } catch (err) {
    console.log(err);
  }
};


export {
  fetchNearestPlacesFromGoogle,
  fetchStreetviewUrl,
};
