// src/components/Weather.test.js
import { render, fireEvent } from '@testing-library/react';
import Weather from './Weather';

test('fetches and displays weather data', async () => {
  // Mock API response
  const mockSuccessResponse = {
    data: {
      name: 'London',
      main: { temp: 20 },
      weather: [{ description: 'clear sky' }],
    },
  };
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockSuccessResponse),
    })
  );

  const { getByPlaceholderText, getByText, findByText } = render(<Weather />);
  const input = getByPlaceholderText('Enter city name');
  const button = getByText('Get Weather');

  fireEvent.change(input, { target: { value: 'London' } });
  fireEvent.click(button);

  expect(await findByText('Weather in London')).toBeInTheDocument();
  expect(await findByText('Temperature: 20°C')).toBeInTheDocument();
  expect(await findByText('Condition: clear sky')).toBeInTheDocument();
});
