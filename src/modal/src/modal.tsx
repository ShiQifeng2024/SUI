import { defineComponent, toRefs } from 'vue'
import BaseModal from './base-modal'
import { modalProps, ModalProps } from './modal-type'
import './modal.scss'

export default defineComponent({
  name: 'SModal',
  props: modalProps,
  emits: ['update:modelValue'],
  setup(props: ModalProps, { slots, emit }) {
    const { modelValue, title } = toRefs(props)
    return () => (
      <BaseModal
        class="s-modal"
        modelValue={modelValue.value}
        onUpdate:modelValue={() => {
          emit('update:modelValue')
        }}
      >
        <div class="s-modal__container">
          {/* 标题区 */}
          {slots.header ? (
            slots.header?.()
          ) : (
            <div class="s-modal__header">{title.value}</div>
          )}
          {/* 内容区 */}
          <div class="s-modal__body">{slots.default?.()}</div>
          {/* 操作区 */}
          <div class="s-modal__footer">{slots.footer?.()}</div>
        </div>
      </BaseModal>
    )
  }
})