import React from 'react';
import { render } from '@testing-library/react'
import IconRemove from './IconRemove';

describe('IconRemove', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <IconRemove/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});