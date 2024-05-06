import { Ref, computed } from 'vue'
import { IUseCore } from './use-tree-type'
import { IInnerTreeNode } from '../tree-types'

export function useCore(innerData: Ref<IInnerTreeNode[]>): IUseCore {
  const getChildren = (obj: IInnerTreeNode, flag = true) => {
    let result: IInnerTreeNode[] = []
    for (const item of innerData.value) {
      if (item.parentId == obj.id) {
        result.push(item)
        //是否要递归
        if (flag) {
          //
          const sub = getChildren(item, flag)
          result = result.concat(sub)
        }
      }
    }
    return result
  }
  const getChildrenExpanded = (obj: IInnerTreeNode) => {
    return getChildren(obj, false)
  }
  //展开的节点列表
  const expandedTree = computed(() => {
    let excludedNodes: IInnerTreeNode[] = []
    const result = []
    //循环列表，找出那些!expanded的节点
    for (const item of innerData.value) {
      if (excludedNodes.includes(item)) continue
      if (item.expanded !== true) {
        excludedNodes = excludedNodes.concat(getChildren(item))
      }
      result.push(item)
    }

    return result
  })
  const getIndex = (node: IInnerTreeNode) => {
    if (!node) return -1
    return innerData.value.findIndex(item => item.id === node.id)
  }

  return {
    getChildren,
    expandedTree,
    getIndex,
    getChildrenExpanded
  }
}
