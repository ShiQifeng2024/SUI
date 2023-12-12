import Test from './Test'
import { render } from '@testing-library/vue'
test('should work', () => {
  expect(true).toBe(true)
  const { getByText } = render(Test)
  //assert
  getByText('test:0')
  //     const element = document.createElement('div')
  //   expect(element).not.toBeNull()
})
