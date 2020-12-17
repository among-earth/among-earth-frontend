import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';

import { romeData, newYorkData } from '../lib/landmarkMockData';

import { computeTotalDistance } from '../utils/directions';

const Maps = ({ landmarkList, setTotalDistance, setPoints }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState(false);

  const onLoad = useCallback(() => {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();

    const origin = new google.maps.LatLng(newYorkData[0].coordinates.lat, newYorkData[0].coordinates.lng);
    const destination = new google.maps.LatLng(newYorkData[newYorkData.length - 1].coordinates.lat, newYorkData[newYorkData.length - 1].coordinates.lng);
    // TODO: comback
    // const waypoints = [];
    // const routes = newYorkData.splice(1, 3);

    // for(let i = 0; i < routes.length; i++) {
    //   const location = { location: new google.maps.LatLng(routes[i].coordinates.lat, routes[i].coordinates.lng)};
    //   waypoints.push(location);
    // }
    const waypoints = [];
    const location = { location: new google.maps.LatLng(newYorkData[1].coordinates.lat, newYorkData[1].coordinates.lng) };
    waypoints.push(location);

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
        // const { overview_path } = result.routes[0];

        // for (let i = 0; i < overview_path.length - 1; i++) {
        //   const start = overview_path[i];
        //   const end = overview_path[i + 1];
        //   const overview_head = google.maps.geometry.spherical.computeHeading(start, end);

        //   setPoints([{
        //     head: overview_head,
        //     lat: overview_path[i].lat(),
        //     lng: overview_path[i].lng(),
        //   }]);
        // }

        const { legs } = result.routes[0];

        for (let i = 0; i < legs.length; i++) {
          const steps = legs[i].steps;
          for (let j = 0; j < steps.length; j++) {
            const nextSegment = steps[j].path;
            const start = steps[j].start_location;
            const end = steps[j].end_location;
            const heading = google.maps.geometry.spherical.computeHeading(start, end);

            // TODO: delete cutSegment
            const cutSegment = nextSegment.slice(1, 5);
            console.log(cutSegment, 'cutSegment')
            cutSegment.forEach(segment => {
              setPoints([{
                head: heading,
                lat: segment.lat(),
                lng: segment.lng(),
              }]);
            });
            // for (let k = 0; k < nextSegment.length; k++) {
            //   setPoints([{
            //     head: heading,
            //     lat: nextSegment[i].lat(),
            //     lng: nextSegment[i].lng(),
            //   }]);
            // }
          }
        }

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

  const mapOptions = {
    width: '400px',
    height: '400px',
  };


  return (
    <GoogleMap
      mapContainerStyle={mapOptions}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
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
};

export default memo(Maps);

Maps.propTypes = {
  landmarkList: PropTypes.array.isRequired,
  setTotalDistance: PropTypes.func.isRequired,
  setPoints: PropTypes.func.isRequired,
};

  // const origin = new google.maps.LatLng(landmarkList[0].coordinates.lat, landmarkList[0].coordinates.lng);
  // const destination = new google.maps.LatLng(landmarkList[landmarkList.length - 1].coordinates.lat, landmarkList[landmarkList.length - 1].coordinates.lng);
  // const waypoints = [];
  // const routes = landmarkList.splice(1, 3);
  // for(let i = 0; i < routes.length; i++) {
  //   const location = { location: new google.maps.LatLng(routes[i].coordinates.lat, routes[i].coordinates.lng) };
  //   // const placeId = { placeId: routes[i].placeId };
  //   waypoints.push(location);
  // }

  // const caldistance = (google.maps.geometry.spherical.computeDistanceBetween(start, end) / 1000).toFixed(5);

  // 직선 사이에 미터당 거리를 구할 수 있으면 heading을 그냥 미터당으로 넘겨주는것도 좋은 방법..
  // google.maps.Polyline.prototype.GetPointsAtDistance = function(metres) {
  //   const next = metres;
  //   const points = [];
  //   // some awkward special cases
  //   if (metres <= 0) return points;
  //   const dist = 0;
  //   const olddist = 0;
  //   for (let i = 1; i < this.getPath().getLength()); i++) {
  //     olddist = dist;
  //     dist += google.maps.geometry.spherical.computeDistanceBetween(this.getPath().getAt(i), this.getPath().getAt(i - 1));
  //     while (dist > next) {
  //       const p1 = this.getPath().getAt(i - 1);
  //       const p2 = this.getPath().getAt(i);
  //       const m = (next - olddist) / (dist - olddist);
  //       points.push(new google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m));
  //       next += metres;
  //     }
  //   }
  //   return points;
  // }


  // More delicate segments----------------------------------------------
  // for (let i = 0; i < legs.length; i++) {
  //   const steps = legs[i].steps;
  //   for (let j = 0; j < steps.length; j++) {
  //     const nextSegment = steps[j].path;
  //     const start = steps[j].start_location;
  //     const end = steps[j].end_location;
  //     const heading = google.maps.geometry.spherical.computeHeading(start, end);

  //     // points.push({
  //     //   path: nextSegment,
  //     //   head: heading,
  //     // });

  //     for (let k = 0; k < nextSegment.length; k++) {
  //       points.push({
  //         lat: nextSegment[k].lat(),
  //         lng: nextSegment[k].lng(),
  //         head: heading,
  //     });
  //     }
  //   }
  // }
  // ----------------------------------------------------------------------
