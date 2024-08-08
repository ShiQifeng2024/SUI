import VirtualList from './src/virtual-list'
import { App } from 'vue'
//具名导出
export { VirtualList }

//导出插件
export default {
  install(app: App) {
    app.component('VirtualList', VirtualList.name as string)
  }
}
