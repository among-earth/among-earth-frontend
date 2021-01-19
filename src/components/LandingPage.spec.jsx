import React from 'react';
import { cleanup, render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import LandingPage from './LandingPage';

describe('<LandingPage />', () => {
  afterEach(cleanup);

  Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
    set: () => {},
  });

  it('should render exact text', () => {
    const TITLE = 'AMONG';
    const { getByText } = render(<LandingPage />);

    expect(getByText(TITLE)).toBeInTheDocument();
  });

  it('renders image button', () => {
    const { getByAltText } = render(<LandingPage />);
    const image = getByAltText('rotationButton');

    expect(image).toHaveAttribute('src', 'spinAirplane.png');
  });
});
