import { ExtractPropTypes, PropType } from 'vue'
import { IDragdrop } from './composables/use-tree-type'
export const treeProps = {
  data: {
    type: Object as PropType<Array<IInnerTreeNode>>,
    required: true
  },
  checkable: {
    type: Boolean,
    default: false
  },
  operable: {
    type: Boolean,
    default: false
  },
  dragdrop: {
    type: [Boolean, Object] as PropType<IDragdrop>,
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
  loading?: boolean //节点显示是否加载中
  childNodeCount?: number //该节点子节点的数量
}

export type TreeProps = ExtractPropTypes<typeof treeProps>
