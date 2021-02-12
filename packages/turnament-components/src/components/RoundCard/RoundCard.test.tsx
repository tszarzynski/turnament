import React from 'react';
import { render } from '@testing-library/react';
import RoundCard from './RoundCard';

describe('RoundCard', () => {
  it('renders without error', () => {
    const { asFragment } = render(<RoundCard />);
    expect(asFragment()).toMatchSnapshot();
  });
});
