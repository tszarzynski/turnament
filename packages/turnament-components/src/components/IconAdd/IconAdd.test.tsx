import React from 'react';
import { render } from '@testing-library/react'
import IconAdd from './IconAdd';

describe('IconAdd', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <IconAdd/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});