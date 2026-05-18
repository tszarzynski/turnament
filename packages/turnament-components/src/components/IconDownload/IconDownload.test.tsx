import { render } from '@testing-library/react'
import IconDownload from './IconDownload';

describe('IconDownload', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <IconDownload/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});