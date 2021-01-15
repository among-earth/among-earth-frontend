import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { IoLocation } from 'react-icons/io5';

 function SelectedLandmark({ landmarkList, onDelete }) {
  return (
    <SelectedLandmarkWrapper>
    {landmarkList &&
      landmarkList.map(landmark => {
        return (
          <div className='wrapper' key={landmark.id}>
            <div className='icon-container'>
              <div>
                <IoLocation />
              </div>
              <button onClick={ev => onDelete(ev)} value={landmark.id} type='submit' className='deleteButton'>X</button>
            </div>
            <span>{landmark.name}</span>
          </div>
        );
      })}
  </SelectedLandmarkWrapper>
  );
}

const SelectedLandmarkWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;

  .wrapper {
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 30px;
    text-align: center;
  }

  .icon-container {
    font-size: 50px;
    color: ${({theme}) => theme.orangeYellow};
    margin-bottom: 5px;
    position: relative;
  }

  .deleteButton {
    all: unset;
    position: absolute;
    background-color: ${({theme}) => theme.coralRed};
    width: 20px;
    height: 20px;
    border-radius: 30px;
    color: ${({theme}) => theme.ivory};
    font-size: 15px;
    top: -3px;
    right: -3px;
    cursor: pointer;
    font-family: 'Limelight', cursive;
  }

  span {
    margin-bottom: 20px;
    font-size: 16px;
    color: ${({theme}) => theme.ivory}
  }
`;
export default SelectedLandmark;

SelectedLandmark.propTypes = {
  landmarkList: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
