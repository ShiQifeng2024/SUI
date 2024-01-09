//创建组件核心文件模版
import { upperFirst } from './util'
export default function genCoreTemplate(name: string) {
  const className = `s-` + name
  const compName = `S` + upperFirst(name)
  const propsTypeName = upperFirst(name) + 'Props'
  const propsName = name + 'Props'
  const propsFileName = name + '-type'

  return `import { defineComponent, toRefs } from 'vue'
import { ${propsTypeName}, ${propsName} } from './${name}-types'
export default defineComponent({
  name: '${compName}',
  props: ${propsName},
  setup(props: ${propsTypeName}) {
    return () => {
      return (
        <div class="${className}">
        </div>
      )
    }
  }
})
`
}
