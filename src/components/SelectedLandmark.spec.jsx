import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import SelectedLandmark from './SelectedLandmark';

describe('<SelectedLandmark />', () => {
  const sampleList = [
    {
      id: 1,
      name: '추천1',
      coordinates: {
        lat: 111,
        lng: 222,
      },
    },
    {
      id: 2,
      name: '추천2',
      coordinates: {
        lat: 111,
        lng: 222,
      },
    },
    {
      id: 3,
      name: '추천3',
      coordinates: {
        lat: 111,
        lng: 222,
      },
    },
  ];

  const setup = (props = {}) => {
    const mockFn = jest.fn();
    const utils = render(
      <SelectedLandmark
        {...props}
        onDelete={mockFn}
        landmarkList={sampleList}
      />,
    );

    return utils;
  };

  afterEach(cleanup);

  it('renders recommends properly', () => {
    const { getByText } = setup();

    getByText(sampleList[0].name);
    getByText(sampleList[1].name);
  });

  it('runs delete event when button is clicked', () => {
    const { getByText } = setup();
    const button = getByText(sampleList[0].name);

    fireEvent.click(button);
  });
});
