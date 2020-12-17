import axios from 'axios';

const fetchNearestPlacesFromGoogle = async landmarkList => {
  if(!landmarkList) return;

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

const postAllPoints = async (points, travelId) => {
  if(!points) return;

  try {
    const result = await axios.post(`http://localhost:8080/travels/${travelId}`, {
      points: points,
    });

    return result.data;
  } catch (err) {
    console.log(err);
  }
};

const fetchStreetView = async (points, travelId) => {
  if(!points) return;

  const lat = points[20].lat;
  const lng = points[20].lng;
  const head = points[20].head;
  const urls = [];
  const results = [];

  for(let i = 0; i < points.length; i++) {
    const { lat, lng, head } = points[i];
    urls.push(`https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${lat},${lng}&fov=80&heading=${head}&key=AIzaSyDbRTVExbnqlexkB6Z8w9Sym3KcR2_1PKY`)
  }

  try {
    // const url = `https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${lat},${lng}&fov=80&heading=${head}&key=AIzaSyDbRTVExbnqlexkB6Z8w9Sym3KcR2_1PKY`;
    // for(let i = 0; i < urls.length; i++) {
    //   const result = await fetch(urls[i]);
    //   const { url } = result;
    //   results.push(url);
    // }

    const result = urls.reduce((prevPrms, url) => (
      prevPrms.then(async prevRes => {
        const currRes = await fetch(url);
        return [...prevRes, currRes];
      })
    ), Promise.resolve([]));

    result.then(data => {
      results.push(data);
    });

     console.log(results, 'result in api');
     return results;
  } catch (err) {
    console.error(err);
  }

};


export {
  fetchNearestPlacesFromGoogle,
  postAllPoints,
  fetchStreetView,
};
