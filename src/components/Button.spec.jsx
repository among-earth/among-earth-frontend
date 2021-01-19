import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Button from './Button';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('<Button />', () => {
  const path = '/user';
  const isLanding = false;

  afterEach(cleanup);

  it('Redirects to correct URL on click', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <Button isLanding={isLanding} path={path}>GO!</Button>
      </MemoryRouter>,
    );

    fireEvent.click(getByRole('button'));
    fireEvent.click(getByText('GO!'));
    expect(mockHistoryPush).toHaveBeenCalledWith(path);
  });

  it('shows the props correctly', () => {
    const children = 'button';
    const landingButton = render(<Button isLanding={true} path={path} onClick={() =>{}}>GO!</Button>);
    const styledButton = render(<Button isLanding={false} path={path} onClick={() =>{}}>{children}</Button>);

    expect(landingButton.getByText('GO!')).toBeInTheDocument();
    expect(styledButton.getByText(children)).toBeInTheDocument();
  });
});
