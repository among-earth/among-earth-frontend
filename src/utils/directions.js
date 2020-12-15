const selectLastWord = value => {
  const splittedArray = value.split(', ');
  const len = splittedArray.length;

  return splittedArray[len - 1];
};


const computeTotalDistance = result => {
  let total = 0;
  const myroute = result.routes[0];
  for (let i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;

  return total;
};


export { selectLastWord, computeTotalDistance };
