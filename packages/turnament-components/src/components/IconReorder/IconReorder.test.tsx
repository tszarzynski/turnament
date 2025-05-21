import React from 'react';
import { render } from '@testing-library/react'
import IconReorder from './IconReorder';

describe('IconReorder', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <IconReorder/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});