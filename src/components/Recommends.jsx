import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

function Recommends({ recommendList, addLandmark, landmarkList }) {
  return (
    <RecommendContainer>
      <Text>
        <span>경유지를 선택하세요.</span>
        <p>(경유지는 총 3개까지 선택 가능합니다.)</p>
      </Text>
      <div>
        {recommendList && landmarkList.length < 3 ?
          recommendList.map(recommend => {
            return (
              <button
                type='submit'
                id={recommend.id}
                name={recommend.name}
                onClick={addLandmark}
                key={recommend.id}
                value={recommend.coordinates.lat}
                className={recommend.coordinates.lng}
              >
                {recommend.name}
              </button>
            );
          })
          : <h1>모든 경유지를 선택했습니다.</h1>
        }
      </div>
    </RecommendContainer>
  );
}

const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Limelight', cursive;

  div {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
  }

  h1 {
    border: 4px solid #BC3A46;
    padding: 20px;
    border-radius: 30px;
    font-size: 20px;
    margin-bottom: 25px;
    color: ${({theme}) => theme.ivory};
  }

  button {
    width: 400px;
    border: 1px solid #fff;
    height: 40px;
    border-radius: 20px;
    margin: 10px;
    background: none;
    font-size: 18px;
    cursor: pointer;
    outline: none;
    color: ${({theme}) => theme.ivory};

    &:hover {
      transform: scale(1.2);
      transition-duration: 1s;
      border: 1px solid #BC3A46;
    }
  }
`;

const Text = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${({theme}) => theme.ivory};

  span {
    margin-bottom: 10px;
    font-size: 20px;
  }
`;

export default Recommends;

Recommends.propTypes = {
  recommendList: PropTypes.array.isRequired,
  addLandmark: PropTypes.func.isRequired,
  landmarkList: PropTypes.array.isRequired,
};
