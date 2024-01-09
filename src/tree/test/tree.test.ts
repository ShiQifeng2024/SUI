import { render } from '@testing-library/vue'
import Tree from '../src/tree'
test('tree test', () => {
  const { getByRole } = render(Tree)
  getByRole('tree')
})
