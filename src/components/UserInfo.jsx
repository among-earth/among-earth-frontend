import React, { useState } from 'react';
import PropTypes from 'prop-types';

function UserInfo({ onLogin, history }) {
  const [input, setInput] = useState('');

  const handleInputChange = ev => {
    setInput(ev.target.value);
  };

  const submitUserNickname = ev => {
    ev.preventDefault();

    if(input.length < 2) {
      console.log('닉네임은 한 글자 이상 입력 해 주세요.');
      setInput('');
      return;
    }

    onLogin(input);
    history.push('/directions');
  };

  return (
    <div>
      <div>당신의 닉네임을 입력해주세요.</div>
      <form onSubmit={submitUserNickname}>
        <input
          onChange={handleInputChange}
          type='text'
          name='nickname'
          value={input}
          placeholder='Nickname'
        />
        <input type='submit' />
      </form>
    </div>
  );
}

export default UserInfo;

UserInfo.propTypes = {
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
