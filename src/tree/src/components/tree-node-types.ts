import { ExtractPropTypes, PropType } from 'vue'
import { IInnerTreeNode, treeProps } from '../tree-types'
export const treeNodeProps = {
  ...treeProps,
  treeNode: {
    type: Object as PropType<IInnerTreeNode>,
    required: true
  }
} as const

export type TreeUtils = {
  toogleNode: (treeNode: IInnerTreeNode) => void
  getChildren: (treeNode: IInnerTreeNode) => IInnerTreeNode[]
  getChildrenVisible: (treeNode: IInnerTreeNode) => IInnerTreeNode[]
  toogleCheckNode: (treeNode: IInnerTreeNode) => void
  append: (parent: IInnerTreeNode, node: IInnerTreeNode) => void
  remove: (treeNode: IInnerTreeNode) => void
}

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>
