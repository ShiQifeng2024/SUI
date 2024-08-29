import { defineComponent, toRefs } from 'vue'
import BaseModal from './base-modal'
import { modalProps, ModalProps } from './modal-type'
import './modal.scss'

export default defineComponent({
  name: 'SModal',
  props: modalProps,
  emits: ['update:modelValue'],
  setup(props: ModalProps, { slots, emit }) {
    const { modelValue, title, showClose, width, center, alignCenter } =
      toRefs(props)
    //动态设置居中
    const alignCenterStyle = alignCenter.value
      ? { 'margin-top': 0, top: '50%', transform: 'translateY(-50%)' }
      : null
    return () => (
      <BaseModal
        class="s-modal"
        modelValue={modelValue.value}
        onUpdate:modelValue={() => {
          emit('update:modelValue')
        }}
      >
        <div
          class="s-modal__container"
          style={{ width: width.value, ...alignCenterStyle }}
        >
          {/* 标题区 */}
          {slots.header ? (
            slots.header?.({
              close: () => {
                emit('update:modelValue', false)
              }
            })
          ) : (
            <div
              class="s-modal__header"
              style={{ 'text-align': center.value ? 'center' : 'left' }}
            >
              {title.value}
              {/* 增加关闭按钮 */}
              {showClose.value && (
                <svg
                  onClick={() => {
                    emit('update:modelValue', false)
                  }}
                  class="s-modal__close"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1037"
                  width="16"
                >
                  <path
                    d="M163.4 92.6c-19.5-19.5-51.2-19.5-70.7 0s-19.5 51.2 0 70.7L441.3 512 92.6 860.6c-19.5 19.5-19.5 51.2 0 70.7s51.2 19.5 70.7 0L512 582.7l348.6 348.6c19.5 19.5 51.2 19.5 70.7 0s19.5-51.2 0-70.7L582.7 512l348.6-348.6c19.5-19.5 19.5-51.2 0-70.7s-51.2-19.5-70.7 0L512 441.3 163.4 92.6z"
                    fill="#33363F"
                    p-id="1038"
                  ></path>
                </svg>
              )}
            </div>
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
