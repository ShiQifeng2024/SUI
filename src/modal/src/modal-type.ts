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
    type: Number,
    default: 500
  },
  height: {
    type: Number,
    default: 300
  },
  showClose: {
    type: Boolean,
    default: true
  }
} as const

export type ModalProps = ExtractPropTypes<typeof modalProps>
