import { defineComponent, provide, toRefs, SetupContext } from 'vue'
import './base-modal.scss'
export default defineComponent({
  name: 'SBaseModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props: any, { slots, emit }) {
    const { modelValue } = toRefs(props)
    return () => (
      <div>
        {modelValue.value && (
          <div class="s-base-modal">
            {/* 透明遮罩 */}
            <div
              class="s-base-modal__mask"
              onClick={() => {
                emit('update:modelValue', false)
              }}
            ></div>
            {/* 具体内容 */}
            {slots.default?.()}
          </div>
        )}
      </div>
    )
  }
})
