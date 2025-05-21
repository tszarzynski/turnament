import React from 'react';
import { render } from '@testing-library/react'
import IconLoading from './IconLoading';

describe('IconLoading', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <IconLoading/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});