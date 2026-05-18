import { render } from '@testing-library/react'
import IconUpload from './IconUpload';

describe('IconUpload', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <IconUpload/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});