import React from 'react';
import { render } from '@testing-library/react'
import ReadonlyRoundCard from './ReadonlyRoundCard';

describe('ReadonlyRoundCard', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <ReadonlyRoundCard/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});