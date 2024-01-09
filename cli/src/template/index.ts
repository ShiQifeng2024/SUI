import { upperFirst } from './util'

export function genIndexTemplate(name) {
  const compName = upperFirst(name)
  return `\
import ${compName} from './src/${name}'
import { App } from 'vue'
//具名导出
export { ${compName} }

//导出插件
export default {
    install(app: App) {
    app.component(${compName}.name, ${compName})
    }
}
    `
}
