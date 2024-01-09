import { upperFirst } from './util'
export function genTestTemplate(name) {
  return `\
import { render } from '@testing-library/vue'
import ${upperFirst(name)} from '../src/${name}'
test('${name} test', () => {
    const { getByRole } = render(${upperFirst(name)})
    getByRole('${name}')
  })
    `
}
