import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

import { MESSAGES, ROUTES } from '../constants';

const getNearestPlaces = async landmarkList => {
  if(!landmarkList) return;

  const { coordinates, id } = landmarkList[0];

  try {
    const result = await axios.get(ROUTES.DIRECTIONS, {
      params: {
        lat: coordinates.lat,
        lng: coordinates.lng,
        id: id,
      },
    });

    return result.data;
  } catch (err) {
    const { response } = err;

    if (response) alert(MESSAGES.RECOMMENDS_FAIL);
  }
};

const getAllPhoto = async () => {
  let copyImages;

  try {
    const result = await axios.get(ROUTES.TRAVELS);

    const images = result.data;

    for (let image of images) {
      const { time } = image;

      const newTime = new Date(time);
      image.time = `${newTime.toLocaleDateString()} ${newTime.toLocaleTimeString()}`;
    }

    copyImages = [...images];
  } catch (err) {
    const { response } = err;

    if (response) alert(MESSAGES.GET_PHOTOS_FAIL);
  }

  return copyImages;
};

const getAllImagePaths = async urls => {
  let copyPaths = [];

  try {
    for(let url of urls) {
      const data = await fetch(url);
      console.log(data);
      copyPaths.push(data);
    }
    // // }
    // const data = await Promise.all(urls.map(url => fetch(url)));

    // for (let item of data) {
    //   const { url } = item;
    //   copyPaths.push(url);
    // }

    return copyPaths;
  } catch (err) {
    const { response } = err;

    if (response) alert(MESSAGES.GET_PHOTOS_FAIL);
  }
};

const sendBlobImage = async (canvasRef, travelId, points) => {
  const canvas = canvasRef.current;
  const dataUrl = canvas.toDataURL('image/png');

  let blobBin = atob(dataUrl.split(',')[1]);
  let fileArr = [];

  for(let i = 0; i < blobBin.length; i++) {
    fileArr.push(blobBin.charCodeAt(i));
  }

  const file = new Blob([new Uint8Array(fileArr)], { type: 'image/png' });

  let formData = new FormData();
  formData.append('travelImage', file, `${travelId}.png`);
  formData.append('points', JSON.stringify(points));

  try {
    await axios({
      method : 'POST',
      url : `/travels/${travelId}`,
      data: formData,
      headers: {
        'processData': false,
        'contentType': false,
      },
    });
  } catch (err) {
    const { response } = err;
    if (response) alert(MESSAGES.PHOTO_FAIL);
  }
};

export {
  getNearestPlaces,
  getAllImagePaths,
  sendBlobImage,
  getAllPhoto,
};
