import React from 'react';
import { render } from '@testing-library/react'
import Button from './Button';

describe('Button', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <Button/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});