import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from '../Display';

import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

test('renders display without props', () => {
  render(<Display />);
});

const testShow = {
  name: 'test show',
  summary: 'this is a test show',
  seasons: [
    {
      id: 1,
      name: 'season 1',
      episodes: [],
    },
    {
      id: 2,
      name: 'season 2',
      episodes: [],
    },
    {
      id: 3,
      name: 'season 3',
      episodes: [],
    },
  ],
};

test('show component is displayed when fetch button is pressed', async () => {
  fetchShow.mockResolvedValue(testShow);
  render(<Display />);
  const button = screen.getByRole('button');
  userEvent.click(button);
  const show = await screen.findAllByTestId('show-container');
  expect(show.length).toBe(1);
});

test('renders amount of select options equal to test data when fetch button is pressed', async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  render(<Display />);
  const button = screen.getByRole('button');
  userEvent.click(button);
  const options = await screen.findAllByTestId('season-option');
  expect(options.length).toEqual(testShow.seasons.length);
});

test('displayFunc is called when fetch button is pressed', async () => {
  const displayFunc = jest.fn();
  fetchShow.mockResolvedValueOnce(testShow);
  render(<Display displayFunc={displayFunc} />);
  const button = screen.getByRole('button');
  userEvent.click(button);
  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled();
  });
});

///Tasks:
//1. Add in necessary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
