import { defineComponent, inject, toRefs, Ref, ref, nextTick, watch } from 'vue'

export interface ColumnText {
  field?: string
  header?: string
  type?: string
}
export default defineComponent({
  name: 'SColumn',
  props: {
    field: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '' //selection
    }
  },
  setup(props) {
    const { field, header, type } = toRefs(props)
    //将列的数据
    const columnData = inject<Ref<ColumnText[]>>('columnData')
    columnData!.value.push({
      field: field.value,
      header: header.value,
      type: type.value
    })
    //定义一个响应式变量，它的值来自父组件
    const allchecked = inject<Ref<boolean>>('allchecked')

    //定义一个半选变量，来自父组件
    const halfchecked = inject<Ref<boolean>>('halfchecked')
    const checkboxRef = ref()

    nextTick(() => {
      if (checkboxRef.value) {
        checkboxRef.value.indeterminate = halfchecked?.value
      }
    })

    watch(
      halfchecked!,
      newValue => {
        if (checkboxRef.value) {
          checkboxRef.value.indeterminate = newValue
        }
      },
      {
        immediate: true
      }
    )

    return () => (
      <th>
        {type.value == 'selection' ? (
          <input
            type="checkbox"
            ref={checkboxRef}
            v-model={allchecked!.value}
          ></input>
        ) : (
          header.value
        )}
      </th>
    )
  }
})
