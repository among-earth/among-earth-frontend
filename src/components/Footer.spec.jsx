import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithRouter } from '../setupTests';

import '@testing-library/jest-dom/extend-expect';

import Footer from './Footer';

describe('<Footer />', () => {
  const NAME = 'Made by DOHEE KIM';

  afterEach(cleanup);

  it('should render exact text', () => {
    const { getByText } = renderWithRouter(<Footer />);

    expect(getByText(NAME)).toBeInTheDocument();
  });
});
