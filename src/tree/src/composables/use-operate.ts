import { Ref, ref } from 'vue'
import { IUseCore, IUseOperate } from './use-tree-type'
import { IInnerTreeNode } from '../tree-types'
import { randomId } from '../../../shared/utils'

export function useOperate(
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore
): IUseOperate {
  const append = (parent: IInnerTreeNode, node: IInnerTreeNode) => {
    console.log('node-operae append', parent, node)
    const children = core.getChildren(parent, false)
    const lastChild = children[children.length - 1]
    //确定未来插入新节点的逻辑索引
    //默认在parent后面
    let insertIndex = core.getIndex(parent) + 1
    if (lastChild) {
      insertIndex = core.getIndex(lastChild) + 1
      //lastChild 的子元素
      const children2 = core.getChildren(lastChild)
      const lChild = children2[children2.length - 1]
      if (lChild) {
        insertIndex = core.getIndex(lChild) + 1
      }
    }

    //确保parent，非叶子节点的状态
    parent.expanded = true
    parent.isLeaf = false

    //新增节点初始化
    const currentNode = ref({
      ...node,
      level: parent.level + 1,
      parentId: parent.id,
      isLeaf: true
    })
    //设置新增节点id
    if (!currentNode.value.id) currentNode.value.id = randomId()

    //插入新节点
    innerData.value.splice(insertIndex, 0, currentNode.value)
  }
  const remove = (node: IInnerTreeNode) => {
    console.log('node-operate remove', node)
    const index = core.getIndex(node)
    const children = core.getChildren(node)
    innerData.value.splice(index, 1 + children.length)
  }
  return {
    append,
    remove
  }
}
