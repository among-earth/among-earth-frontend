import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';

import { computeTotalDistance } from '../utils';
import { MESSAGES } from '../constants';
import { mapStyleOptions, mapOptions, polylineOptions } from '../constants/options';

function Maps({ landmarkList, setTotalDistance, setPoints }) {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState(false);

  const onLoad = useCallback(() => {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();

    let origin;
    let destination;
    let waypoints = [];

    const originIdx = 0;
    const waypointsIdx = 1;
    const lastIdx = landmarkList.length - 1;

    landmarkList.forEach((landmark, idx) => {
      const { lat, lng } = landmark.coordinates;

      if(idx === originIdx) origin = new google.maps.LatLng(lat, lng);
      if(idx === waypointsIdx) destination = new google.maps.LatLng(lat, lng);
      if(idx === lastIdx) waypoints = new google.maps.LatLng(lat, lng);
    });

    const requestOption = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.WALKING,
      waypoints: [{ location: waypoints }],
      optimizeWaypoints: true,
    };

    directionsService.route(requestOption, (result, status) => {
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
        alert(MESSAGES.MAP_FAIL);
      }
    });

    directionsDisplay.setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={mapStyleOptions}
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
