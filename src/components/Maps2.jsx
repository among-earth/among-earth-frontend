import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { GoogleMap, DirectionsRenderer, DirectionsService, LoadScript } from '@react-google-maps/api';


const Directions = props => {
  // const [directions, setDirections] = useState();
  const { origin, destination, landmarkList } = props;
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState(false);
  const [totalDistance, setDistance] = useState(null);

  console.log(landmarkList, 'in Directions')


  const options = {
    polylineOptions: {
      strokeColor: 'red',
      strokeWeight: 6,
      strokeOpacity: 0.8,
    },
  };
  let waypoints = [];
  // const google = window.google;
  // const directionsService = new google.maps.DirectionsService();
  // const directionsDisplay = new google.maps.DirectionsRenderer();
  const google = window.google;

  const routes = landmarkList.splice(1, 3);
  for(let i = 0; i < routes.length; i++) {
    const location = { location: new google.maps.LatLng(routes[i].coordinates.lat, routes[i].coordinates.lng)};
    waypoints.push(location);
  }

  const directionsCallback = (result, status) => {
    console.log(result, status);

    if(status === google.maps.DirectionsStatus.OK) {
      setDirections(result);
      setMarkers(true);
      setDistance(result.routes[0].legs[0].distance.value);

      console.log(directions, markers, totalDistance)
    } else {
      console.error(result, status);
    }
  };

  const directionOptions = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.WALKING,
    waypoints: waypoints,
  }

  return (
      <>
      <DirectionsService
        options={directionOptions}
        callback={directionsCallback}
      />
            {directions &&
      <>
      <DirectionsRenderer suppressMarkers={markers} directions={directions} options={options} />
      </>
      }
       </>
  );
};

const Map = props => {
  const { landmarkList } = props;
  // const [map, setMap] = useState(null);
  // const [directions, setDirections] = useState(null);
  // const [markers, setMarkers] = useState(false);
  // const [totalDistance, setDistance] = useState(null);
  const [map, setMap] = useState(null);

  console.log(landmarkList, 'in Map')

  const startPoint = landmarkList[0].coordinates;
  const endPoint = landmarkList[landmarkList.length - 1].coordinates;

  const onLoad = useCallback(() => {
    const google = window.google;
    const directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);
  }, []);

  console.log(map, 'map')

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  return (
    <GoogleMap
      mapContainerStyle={{
        width: '400px',
        height: '400px',
      }}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Directions landmarkList={landmarkList} origin={startPoint} destination={endPoint} />
    </GoogleMap>
  );
};

Map.propTypes = {
  landmarkList: PropTypes.array.isRequired,
};

Directions.propTypes = {
  landmarkList: PropTypes.array.isRequired,
  origin: PropTypes.object,
  destination: PropTypes.object,
};

export default React.memo(Map);
