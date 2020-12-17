import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Canvas from './Canvas';

const Travel = () => {
  const [fetchUrls, setFetchUrls] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [isSelectUrls, setIsSelectUrls] = useState(false);
  // const [isStartCanvas, setIsStartCanvas] = useState(false);

  const { travelId, points } = useSelector(state => ({
    travelId : state.directions.id,
    points: state.directions.points,
  }));

  const fetchAll = async urls => {
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
      console.log(err);
    }

    setIsLoading(false);
  };

  // const draw = (ctx, paths, frameCount) => {
  //   let image = new Image();
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //   image.src = paths[frameCount];

  //   ctx.drawImage(image, 0, 0, 300, 300);
  // };

  useEffect(() => {
    if(points) {
      let copyUrls = [];

      points.forEach(point => {
        const { lat, lng, head } = point;
        copyUrls.push(`https://maps.googleapis.com/maps/api/streetview?size=640x640&pitch=40&fov=100&location=${lat},${lng}&heading=${head}&source=outdoor&key=AIzaSyDXgeijd6uNjxKp9CyhpY-z_KKKYH5mXZ8`);
      });

      setFetchUrls([...copyUrls]);
    }
  }, []);

  useEffect(() => {
    fetchAll(fetchUrls);
  }, [fetchUrls]);

  return (
    <div style={{height: '800px', width: '800px'}}>
      {isLoading
       ? <h1>...isLoading</h1>
       : <Canvas paths={imagePaths} />
      }
      {/* {imagePaths && imagePaths.map((path, i) => {
        return (
          <img key={i} style={{ width:'640px', height:'640px'}} src={path} alt='streetViewImage'></img>
        );
      })} */}
    </div>
  );
};

export default Travel;

Travel.propTypes = {
};
