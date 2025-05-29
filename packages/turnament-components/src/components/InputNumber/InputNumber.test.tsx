import { render } from '@testing-library/react'
import InputNumber from './InputNumber';

describe('InputNumber', () => {
   it('renders without error', () => {
      const { asFragment } = render(
         <InputNumber/>
       )
      expect(asFragment()).toMatchSnapshot()
   });
});