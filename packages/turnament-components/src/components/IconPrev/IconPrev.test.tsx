import { render } from '@testing-library/react'
import IconPrev from './IconPrev';

describe('IconPrev', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <IconPrev/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});