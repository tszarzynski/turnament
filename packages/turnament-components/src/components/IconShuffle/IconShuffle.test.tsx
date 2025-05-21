import React from 'react';
import { render } from '@testing-library/react'
import IconShuffle from './IconShuffle';

describe('IconShuffle', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <IconShuffle/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});