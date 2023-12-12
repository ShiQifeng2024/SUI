import { defineComponent, toRefs } from 'vue'
import { buttonProps, ButtonProps } from './button-types'
import '../style/button.scss'
export default defineComponent({
  name: 'SButton',
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    const { type, size, disabled, block } = toRefs(props)
    return () => {
      const defaultSlot = slots.default ? slots.default() : '按钮'
      const blockCls = block.value ? `s-btn--block` : ``
      return (
        <button
          class={`s-btn s-btn--${type.value} s-btn--${size.value} ${blockCls}`}
          disabled={disabled.value}
        >
          {defaultSlot}
        </button>
      )
    }
  }
})
