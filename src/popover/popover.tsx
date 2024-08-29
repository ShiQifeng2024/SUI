import {
  defineComponent,
  ref,
  onMounted,
  PropType,
  toRefs,
  watch,
  nextTick
} from 'vue'
import './popover.scss'
import BasePopover from './base-popover'

export default defineComponent({
  name: 'SPopover',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    host: {
      type: Object as PropType<HTMLElement>,
      default: () => null
    },
    title: {
      type: String,
      default: ''
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom'
    }
  },
  emits: ['update:modelValue'],

  setup(props: any, { slots }) {
    const { modelValue, title } = toRefs(props)

    return () => (
      <>
        {modelValue.value && (
          <BasePopover class="s-popover" {...props}>
            <h4 class="s-popover__title">{title.value}</h4>
            {/* 弹窗内容 */}
            {slots.default?.()}
          </BasePopover>
        )}
      </>
    )
  }
})
