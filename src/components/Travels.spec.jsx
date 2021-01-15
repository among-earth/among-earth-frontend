import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { renderWithRedux } from '../setupTests';

import '@testing-library/jest-dom/extend-expect';

import Travels from './Travels';

describe('<Travels />', () => {
  const setup = () => {
    const utils = renderWithRedux(<Travels />);

    return utils;
  };

  afterEach(cleanup);

  it('has input and a button', () => {
    const { getByText } = setup();

    expect(getByText('여행은 즐거우셨나요?')).toBeInTheDocument();
  });
});
