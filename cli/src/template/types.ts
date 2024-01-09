import { upperFirst } from './util'

export function genTypesTemplate(name: string) {
  const propsTypeName = upperFirst(name) + 'Props'
  const propsName = name + 'Props'

  return `import { ExtractPropTypes, PropType } from 'vue'
  export const ${propsName} = {

  } as const
  
  export type ${propsTypeName} = ExtractPropTypes<typeof ${propsName}>
  
  `
}
