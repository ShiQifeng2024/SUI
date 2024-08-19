//入口文件
//1.引入实现组件 批量导出

import type { App } from 'vue'
import ButtonPlugin, { Button } from '../src/button'
import ModalPlugin, { Modal } from '../src/modal'
//2.导出一个vue插件

export { Button }

const plugins = [ButtonPlugin, ModalPlugin]

export default {
  install(app: App) {
    plugins.forEach(plugin => {
      app.use(plugin)
    })
  }
}
//3.
