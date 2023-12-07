import { defineComponent, toRefs } from 'vue'
import { buttonProps, ButtonProps } from './button-types'
import '../style/button.scss'
export default defineComponent({
  name: 'SButton',
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    const { type } = toRefs(props)
    return () => {
      const defaultSlot = slots.default ? slots.default() : '按钮'
      return <button class={`s-btn s-btn--${type.value}`}>{defaultSlot}</button>
    }
  }
})
