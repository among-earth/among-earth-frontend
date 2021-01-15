import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Recommends from './Recommends';

describe('<Recommends />', () => {
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
  ];

  const setup = (props = {}) => {
    const mockFn = jest.fn();
    const utils = render(
      <Recommends
        {...props}
        addLandmark={mockFn}
        recommendList={sampleList}
        landmarkList={sampleList}
      />,
    );

    return utils;
  };

  afterEach(cleanup);

  it('renders recommends properly', () => {
    const { getByText } = setup();

    getByText('경유지를 선택하세요.');
    getByText(sampleList[0].name);
    getByText(sampleList[1].name);
  });

  it('runs event when recommends clicked', () => {
    const { getByText } = setup();
    const button = getByText(sampleList[0].name);

    fireEvent.click(button);
  });

  it('renders alert when all landmark selected', () => {
    sampleList.push({
      id: 2,
      name: '추천2',
      coordinates: {
        lat: 111,
        lng: 222,
      },
    });

    const { getByText } = setup();

    getByText('모든 경유지를 선택했습니다.');
  });
});
