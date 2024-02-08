import { ExtractPropTypes, PropType } from 'vue'
export const treeProps = {
  data: {
    type: Object as PropType<Array<IInnerTreeNode>>,
    required: true
  },
  checkable: {
    type: Boolean,
    default: false
  }
} as const

export interface ITreeNode {
  label: string
  id?: string
  children?: IInnerTreeNode[]

  selected?: boolean
  checked?: boolean
  expanded?: boolean

  disabledSelect?: boolean
  disabledCheck?: boolean
  disabledToggle?: boolean
}

export interface IInnerTreeNode extends ITreeNode {
  parentId?: string
  level: number
  isLeaf?: boolean
}

export type TreeProps = ExtractPropTypes<typeof treeProps>
