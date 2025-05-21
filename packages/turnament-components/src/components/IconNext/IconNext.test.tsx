import React from 'react';
import { render } from '@testing-library/react'
import IconNext from './IconNext';

describe('IconNext', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <IconNext/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});