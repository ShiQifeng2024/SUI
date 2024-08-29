import type { ExtractPropTypes } from 'vue'

export const modalProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '30%'
  },
  height: {
    type: Number,
    default: 300
  },
  center: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: true
  },
  alignCenter: {
    type: Boolean,
    default: false
  }
} as const

export type ModalProps = ExtractPropTypes<typeof modalProps>
