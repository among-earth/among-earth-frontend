import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Directions({ user }) {
  const userName = user.nickname;
  const [isCountry, setCountry] = useState('');

  const handleInputChange = ev => {
    console.log(ev.target.name);
    setCountry(ev.target.value);
  };

  const submitTravelData = ev => {
    ev.preventDefault();
    console.log(isCountry);
  };

  return (
    <div>
      <form onSubmit={submitTravelData}>
        <div>
          <span>안녕하세요 {userName}님</span>
          <span>어느 나라로 가볼까요?</span>
          <input
            type='text'
            name='country'
            onChange={handleInputChange}
            value={isCountry}
            placeholder='로마'
          />
        </div>
        <div>
          <span>가고 싶은 장소를 입력해 주세요.</span>
          <input
            type='text'
            name='landmarks'
            onChange={handleInputChange}
            value={isCountry}
            placeholder='로마'
          />
        </div>
        <div>
          <button>트레비 분수</button>
          <button>콜로세움</button>
          <button>피사의 사탑</button>
        </div>
      </form>
      <div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
      </div>
    </div>
  );
}

export default Directions;

Directions.propTypes = {
  user: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
  }).isRequired,
};
