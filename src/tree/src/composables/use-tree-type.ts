import { ComputedRef, Ref } from 'vue'
import { IInnerTreeNode } from '../tree-types'
//和树相关的方法
export type IUseCore = {
  getChildren: (
    treeNode: IInnerTreeNode,
    recurecursive?: boolean
  ) => IInnerTreeNode[]
  getIndex: (treeNode: IInnerTreeNode) => number
  expandedTree: ComputedRef<IInnerTreeNode[]>
  getChildrenExpanded: (treeNode: IInnerTreeNode) => IInnerTreeNode[]
}
//展开移除相关
export type IUseToogle = {
  toogleNode: (treeNode: IInnerTreeNode) => void
}

export type IUseCheck = {
  toogleCheckNode: (node: IInnerTreeNode) => void
}
export type IUseOperate = {
  append: (parent: IInnerTreeNode, node: IInnerTreeNode) => void
  remove: (node: IInnerTreeNode) => void
}

export type TreeUtils = {
  treeData: Ref<IInnerTreeNode[]>
} & IUseCore &
  IUseToogle &
  IUseCheck &
  IUseOperate
