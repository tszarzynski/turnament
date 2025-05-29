import { render } from '@testing-library/react'
import IconInfo from './IconInfo';

describe('IconInfo', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <IconInfo/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});