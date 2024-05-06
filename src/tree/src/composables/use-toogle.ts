import { Ref } from 'vue'
import { IUseCore, IUseToogle } from './use-tree-type'
import { IInnerTreeNode } from '../tree-types'

export function useToogle(
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore
): IUseToogle {
  const toogleNode = (node: IInnerTreeNode) => {
    //还要影响子节点
    const cur = innerData.value.find(item => item.id == node.id)
    if (cur) {
      cur.expanded = !cur.expanded
    }
  }

  return {
    toogleNode
  }
}
