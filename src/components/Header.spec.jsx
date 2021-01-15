import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithRouter } from '../setupTests';

import '@testing-library/jest-dom/extend-expect';

import Header from './Header';

describe('<Header />', () => {
  const LOGO = 'AMONG';
  const HOME = 'HOME';
  const TRAVELS = 'TRAVELS';

  afterEach(cleanup);

  it('should render exact text', () => {
    const { getByText } = renderWithRouter(<Header />);

    expect(getByText(LOGO)).toBeInTheDocument();
    expect(getByText(HOME)).toBeInTheDocument();
    expect(getByText(TRAVELS)).toBeInTheDocument();
  });

  it('should redirect to correct Url', () => {
    const { getByText } = renderWithRouter(<Header />);

    expect(getByText(HOME).closest('a')).toHaveAttribute('href', '/');
    expect(getByText(TRAVELS).closest('a')).toHaveAttribute('href', '/travels');
  });
});
