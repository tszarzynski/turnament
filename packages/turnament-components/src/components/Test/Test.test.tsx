import React from 'react';
import { render } from '@testing-library/react'
import Test from './Test';

describe('Test', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <Test/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});