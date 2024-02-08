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

  const toogleCheckNode = (node: IInnerTreeNode) => {
    //避免初始化的时候node中没有checked设置
    node.checked = !node.checked
    //父到子之前的联动效果
    //获取子节点，并听不他们的选中状态和父亲节点一致
    getChildren(node).forEach((child: IInnerTreeNode) => {
      child.checked = node.checked
    })

    //还有子到父的联动
    //获取父节点 可以根据父节获取兄弟节点，判断是否全部选中，如果全部选中，父节点应当选中，判断是否全部不选中
    //向上递归的过程

    //子-父联动
    const parentNode = innerData.value.find(item => {
      return item.id === node.parentId
    })
    if (!parentNode) {
      return
    }

    //获取兄弟节点，相当于获取 parenetNode 的直接子节点
    const siblingNodes = getChildren(parentNode, false)
    //作一次过滤，过滤出所有选中的节点
    const checkedSilblingNodes = siblingNodes.filter(item => {
      return item.checked
    })

    if (siblingNodes.length == checkedSilblingNodes.length) {
      //说明是全选状态，父节点应该被选中
      parentNode.checked = true
    } else {
      parentNode.checked = false
    }
  }

  return { toogleNode, expandedTree, innerData, getChildren, toogleCheckNode }
}
