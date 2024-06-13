import { ComputedRef, Ref } from 'vue'
import { IInnerTreeNode, ITreeNode } from '../tree-types'
//和树相关的方法
export type IUseCore = {
  getChildren: (
    treeNode: IInnerTreeNode,
    recurecursive?: boolean
  ) => IInnerTreeNode[]
  getIndex: (treeNode: IInnerTreeNode) => number
  expandedTree: ComputedRef<IInnerTreeNode[]>
  getChildrenExpanded: (treeNode: IInnerTreeNode) => IInnerTreeNode[]
  getNode: (node: IInnerTreeNode) => IInnerTreeNode | undefined
  getChildrenVisible: (
    treeNode: IInnerTreeNode,
    recurecursive?: boolean
  ) => IInnerTreeNode[]
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

export type IUseLazyLoad = {
  lazyLoadNodes: (node: IInnerTreeNode) => void
}

export type LazyNodeResult = {
  node: IInnerTreeNode
  treeItems: ITreeNode[]
}

export type TreeUtils = {
  treeData: Ref<IInnerTreeNode[]>
} & IUseCore &
  IUseToogle &
  IUseCheck &
  IUseOperate
