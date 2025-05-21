import React from 'react';
import { render } from '@testing-library/react'
import IconDrag from './IconDrag';

describe('IconDrag', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <IconDrag/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});