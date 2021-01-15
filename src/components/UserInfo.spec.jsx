import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { renderWithRouter } from '../setupTests';

import '@testing-library/jest-dom/extend-expect';

import UserInfo from './UserInfo';

describe('<UserInfo />', () => {
  const setup = (props = {}) => {
    const onLogin = jest.fn();
    const utils = render(<UserInfo {...props} onLogin={onLogin}/>);
    const { getByText, getByPlaceholderText } = utils;
    const input = getByPlaceholderText('Nickname');
    const button = getByText('OK!');

    return {
      ...utils,
      input,
      button,
    };
  };

  afterEach(cleanup);

  it('has input and a button', () => {
    const { input, button } = setup();

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('changes input', () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: 'input value' }});
    expect(input).toHaveAttribute('value', 'input value');
  });

  it('submits form when button is clicked', () => {
    const mockHistoryPush = jest.fn();

    const { getByTestId, getByText } = renderWithRouter(<UserInfo onLogin={mockHistoryPush} />);

    const input = getByTestId('nameInput');
    const button = getByText('OK!');

    fireEvent.change(input, { target: { value: 'input value' }});
    fireEvent.click(button);
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  });
});
