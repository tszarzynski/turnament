import React from 'react';
import { render } from '@testing-library/react'
import RankingTable from './RankingTable';

describe('RankingTable', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <RankingTable/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});