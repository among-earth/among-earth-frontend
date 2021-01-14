const polylineOptions = {
  polylineOptions: {
    strokeColor: 'red',
    strokeWeight: 6,
    strokeOpacity: 0.8,
  },
};

const mapStyleOptions = {
  width: '600px',
  height: '400px',
  borderRadius: '10px',
};

const mapOptions = {
  mapTypeId: 'satellite',
  streetViewControl: false,
  mapTypeControl: false,
};

const regionSearchOptions = {
  types: ['(regions)'],
};

const landmarkSearchOptions = countryCode => {
  return ({
    componentRestrictions: { country: countryCode },
    type: ['tourist_attraction'],
  });
};

export {
  polylineOptions,
  mapStyleOptions,
  mapOptions,
  regionSearchOptions,
  landmarkSearchOptions,
}