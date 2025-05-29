import { render } from '@testing-library/react'
import Tooltip from './Tooltip';

describe('Tooltip', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <Tooltip/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});