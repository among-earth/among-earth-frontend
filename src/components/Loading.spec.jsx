import React from 'react';
import { cleanup, render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Loading from './Loading';

describe('<Loading />', () => {
  afterEach(cleanup);

  it('should render exact text', () => {
    const LOADING_MESSAGE = 'Loading...';
    const { getByText } = render(<Loading />);

    expect(getByText(LOADING_MESSAGE)).toBeInTheDocument();
  });
});
