import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';

import { computeTotalDistance } from '../utils';

function Maps({ landmarkList, setTotalDistance, setPoints }) {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState(false);

  const onLoad = useCallback(() => {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();

    const origin = new google.maps.LatLng(landmarkList[0].coordinates.lat, landmarkList[0].coordinates.lng);
    const destination = new google.maps.LatLng(landmarkList[landmarkList.length - 1].coordinates.lat, landmarkList[landmarkList.length - 1].coordinates.lng);

    const waypoints = [];

    const routes = landmarkList.splice(1, 3);

    for(let i = 0; i < routes.length; i++) {
      const location = { location: new google.maps.LatLng(routes[i].coordinates.lat, routes[i].coordinates.lng)};
      waypoints.push(location);
    }
    // const waypoints = [];
    // const location = { location: new google.maps.LatLng(landmarkList[1].coordinates.lat, landmarkList[1].coordinates.lng) };
    // waypoints.push(location);

    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.WALKING,
      waypoints: waypoints,
      optimizeWaypoints: true,
    };

    directionsService.route(request, (result, status) => {
      console.log(result, 'result');
      if (status === google.maps.DirectionsStatus.OK) {
        const totalDistance = computeTotalDistance(result);
        const { legs } = result.routes[0];
        let copyPoints = [];

        for (let i = 0; i < legs.length; i++) {
          const steps = legs[i].steps;
          for (let j = 0; j < steps.length; j++) {
            const nextSegment = steps[j].path;
            const start = steps[j].start_location;
            const end = steps[j].end_location;
            const heading = google.maps.geometry.spherical.computeHeading(start, end);

            nextSegment.forEach(segment => {
              copyPoints.push({
                head: heading,
                lat: segment.lat(),
                lng: segment.lng(),
              });

            });
          }
        }
        setPoints(copyPoints);
        setDirections(result);
        setMarkers(true);
        setTotalDistance(totalDistance);
      } else {
        console.error('error fetching directions', result, status);
      }
    });

    directionsDisplay.setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const polylineOptions = {
    polylineOptions: {
      strokeColor: 'red',
      strokeWeight: 6,
      strokeOpacity: 0.8,
    },
  };

  const styleOptions = {
    width: '600px',
    height: '400px',
    borderRadius: '10px',
  };

  const mapOptions = {
    mapTypeId: 'satellite',
    streetViewControl: false,
    mapTypeControl: false,
  };

  return (
    <GoogleMap
      mapContainerStyle={styleOptions}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          suppressMarkers={markers}
          options={polylineOptions}
        />
      )}
    </GoogleMap>
  );
}

export default memo(Maps);

Maps.propTypes = {
  landmarkList: PropTypes.array.isRequired,
  setTotalDistance: PropTypes.func.isRequired,
  setPoints: PropTypes.func.isRequired,
};
