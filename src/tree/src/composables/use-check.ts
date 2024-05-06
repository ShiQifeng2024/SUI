import { Ref } from 'vue'
import { IUseCore, IUseCheck } from './use-tree-type'
import { IInnerTreeNode } from '../tree-types'

export function useCheck(
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore
): IUseCheck {
  const toogleCheckNode = (node: IInnerTreeNode) => {
    //避免初始化的时候node中没有checked设置
    node.checked = !node.checked
    //父到子之前的联动效果
    //获取子节点，并听不他们的选中状态和父亲节点一致
    core.getChildren(node).forEach((child: IInnerTreeNode) => {
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
    const siblingNodes = core.getChildrenExpanded(parentNode)
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
  return {
    toogleCheckNode
  }
}
