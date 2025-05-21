import React from 'react';
import { render } from '@testing-library/react'
import ToggleButton from './ToggleButton';

describe('ToggleButton', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <ToggleButton/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});