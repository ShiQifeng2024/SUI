import Table from './src/table.tsx'
import Column from './src/column.tsx'
import { App } from 'vue'

//具名导出
export { Table, Column }

//导出插件
export default {
  install(app: App) {
    app.component(Table.name as string, Table)
    app.component(Column.name as string, Column)
  }
}
