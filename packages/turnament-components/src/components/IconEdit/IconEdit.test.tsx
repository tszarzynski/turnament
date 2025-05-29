import { render } from '@testing-library/react'
import IconEdit from './IconEdit';

describe('IconEdit', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <IconEdit/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});