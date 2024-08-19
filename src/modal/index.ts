import Modal from './src/modal'
import { App } from 'vue'

//具名导出
export { Modal }

//导出插件
export default {
  install(app: App) {
    app.component(Modal.name as string, Modal)
  }
}
