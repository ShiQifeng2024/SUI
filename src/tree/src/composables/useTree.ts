import { IInnerTreeNode } from '../tree-types'
import { ref, computed, Ref, unref } from 'vue'
import { generateInnerTree } from '../utils'
export function useTree(node: Ref<IInnerTreeNode[]> | IInnerTreeNode[]) {
  const innerData = ref(generateInnerTree(unref(node)))
  const toogleNode = (node: IInnerTreeNode) => {
    //还要影响子节点
    const cur = innerData.value.find(item => item.id == node.id)
    if (cur) {
      cur.expanded = !cur.expanded
    }
  }
  const getChildren = (obj: IInnerTreeNode) => {
    let result: IInnerTreeNode[] = []
    for (const item of innerData.value) {
      if (item.parentId == obj.id) {
        result.push(item)
        const sub = getChildren(item)
        result = result.concat(sub)
      }
    }
    return result
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

  return { toogleNode, expandedTree, innerData, getChildren }
}
