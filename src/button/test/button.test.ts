import { render } from '@testing-library/vue'
import Button from '../src/button'

test('should work', () => {
  const { getByRole } = render(Button)
  getByRole('button')
})
test('default slot should be ANniu', () => {
  const { getByText } = render(Button)
  getByText('按钮')
})

test('slots should work', () => {
  const { getByText } = render(Button, {
    slots: {
      default: () => {
        return 'confirm'
      }
    }
  })
  getByText('confirm')
})

test('default type should work', () => {
  const { getByRole } = render(Button)
  const button = getByRole('button')

  expect(button.classList.contains('s-btn--secondary'))
})

test('prop type should work', () => {
  const { getByRole } = render(Button, {
    props: {
      type: 'primary'
    }
  })
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--primary'))
})
