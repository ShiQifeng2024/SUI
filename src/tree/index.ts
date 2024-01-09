import Tree from './src/tree'
import { App } from 'vue'
//具名导出
export { Tree }

//导出插件
export default {
  install(app: App) {
    app.component(Tree.name, Tree)
  }
}
