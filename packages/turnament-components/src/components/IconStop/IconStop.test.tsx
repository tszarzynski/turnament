import React from 'react';
import { render } from '@testing-library/react'
import IconStop from './IconStop';

describe('IconStop', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <IconStop/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});