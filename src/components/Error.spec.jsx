import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithRouter } from '../setupTests';

import '@testing-library/jest-dom/extend-expect';

import Error from './Error';

describe('<Error />', () => {
  afterEach(cleanup);

  it('should render exact text', () => {
    const ERROR_MESSAGE = 'error message';
    const { getByText } = renderWithRouter(<Error>{ERROR_MESSAGE}</Error>);

    expect(getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });
});
