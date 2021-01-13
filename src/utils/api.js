import axios from 'axios';

const getNearestPlacesFromGoogle = async landmarkList => {
  if(!landmarkList) return;

  const { coordinates , id} = landmarkList[0];

  console.log(landmarkList);

  try {
    const result = await axios.get('http://localhost:8080/directions', {
      params: {
        lat: coordinates.lat,
        lng: coordinates.lng,
        id: id,
      },
    });

    return result.data;
  } catch (err) {
    console.log(err);
  }
};

const getAllPhoto = async () => {
  let copyImages;
  try {
    const result = await axios.get('http://localhost:8080/travels');

    const images = result.data;

    for (let image of images) {
      let { time } = image;
      const newTime = new Date(time);
      image.time = `${newTime.toLocaleDateString()} ${newTime.toLocaleTimeString()}`;
    }

    copyImages = [...images];
  } catch (err) {
    const { response } = err;
    if (response) alert('이미지를 불러들이는데 실패했습니다. 다시 시도해주세요.');
  }

  return copyImages;
};

const postAllPoints = async (paths, travelId) => {
  if(!paths) return;

  try {
    const result = await axios.post(`http://localhost:8080/travels/${travelId}`, {
      paths: paths,
    });

    return result.data;
  } catch (err) {
    console.log(err);
  }
};

const fetchStreetView = async (points, travelId) => {
  if(!points) return;

  const urls = [];
  const results = [];

  for(let i = 0; i < points.length; i++) {
    const { lat, lng, head } = points[i];
    urls.push(`https://maps.googleapis.com/maps/api/streetview?size=1000x640&location=${lat},${lng}&fov=80&heading=${head}&key=AIzaSyDbRTVExbnqlexkB6Z8w9Sym3KcR2_1PKY`);
  }

  try {
    const result = urls.reduce((prevPrms, url) => (
      prevPrms.then(async prevRes => {
        const currRes = await fetch(url);
        return [...prevRes, currRes];
      })
    ), Promise.resolve([]));

    result.then(data => {
      results.push(data);
    });

     return results;
  } catch (err) {
    console.error(err);
  }

};

const sendBlobImage = async (canvasRef, travelId, points) => {
  const canvas = canvasRef.current;
  const dataUrl = canvas.toDataURL('image/png');

  let blobBin = atob(dataUrl.split(',')[1]);
  let array = [];

  for(let i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
  }

  const file = new Blob([new Uint8Array(array)], { type: 'image/png' });

  let formData = new FormData();
  formData.append('travelImage', file, `${travelId}.png`);
  formData.append('points', JSON.stringify(points));

  try {
    await axios({
      method : 'POST',
      url : `http://localhost:8080/travels/${travelId}`,
      data: formData,
      headers: {
        'processData': false,
        'contentType': false,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export {
  getNearestPlacesFromGoogle,
  postAllPoints,
  fetchStreetView,
  sendBlobImage,
  getAllPhoto,
};
