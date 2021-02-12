import React from 'react';
import { render } from '@testing-library/react'
import MatchCard from './MatchCard';

describe('MatchCard', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <MatchCard/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});