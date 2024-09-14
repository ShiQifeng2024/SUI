import { defineComponent, toRefs, ref, provide, watch } from 'vue'
import './table.scss'
import { ColumnText } from './column'

export default defineComponent({
  name: 'STable',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  emits: ['selection-change'],

  setup(props: any, { slots, emit }) {
    const { data } = toRefs(props)
    console.log(data.value, 'data', props)
    //获取column 组件中的列数据
    const columnData = ref([])
    provide('columnData', columnData)
    //check 变化事件处理
    watch(
      data,
      (newValue, oldValue) => {
        const checkedRows = newValue.filter((row: any) => row.checked)
        if (checkedRows.length == data.value.length) {
          allchecked.value = true
          halfchecked.value = false
        } else if (checkedRows.length == 0) {
          allchecked.value = false
          halfchecked.value = false
        } else {
          console.log('half', halfchecked.value)
          halfchecked.value = true
        }
        emit('selection-change', checkedRows)
      },
      { deep: true }
    )

    const allchecked = ref(data.value.every((row: any) => row.checked))
    provide('allchecked', allchecked)
    watch(allchecked, newValue => {
      data.value.forEach((row: any) => (row.checked = newValue))
    })

    const halfchecked = ref(
      data.value.some((row: any) => row.checked) && !allchecked.value
    )
    provide('halfchecked', halfchecked)

    return () => (
      <table class="s-table">
        <thead>
          <tr>{slots.default?.()}</tr>
        </thead>
        <tbody>
          {data.value.map((row: any, index: number) => (
            <tr key={index}>
              {columnData.value.map((column: ColumnText, index: number) => {
                //如果存在默认插槽内容，优先渲染
                const columntSlot = slots.default?.()[index]
                if (columntSlot?.children) {
                  return (
                    <td>{(columntSlot?.children as any).default?.(row)}</td>
                  )
                }
                return (
                  <td>
                    {column.field ? (
                      row[column.field as string]
                    ) : column.type === 'selection' ? (
                      <input type="checkbox" v-model={row.checked}></input>
                    ) : (
                      ''
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
})
