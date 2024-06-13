import { Ref, SetupContext } from 'vue'
import { IUseCore, IUseLazyLoad, IUseToogle } from './use-tree-type'
import { IInnerTreeNode } from '../tree-types'

export function useToogle(
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore,
  context: SetupContext,
  Ilazyload: IUseLazyLoad
): IUseToogle {
  const { lazyLoadNodes } = Ilazyload
  const toogleNode = (node: IInnerTreeNode) => {
    //还要影响子节点
    const cur = innerData.value.find(item => item.id == node.id)
    if (cur) {
      cur.expanded = !cur.expanded
      if (cur.expanded) {
        lazyLoadNodes(cur)
      }
    }
  }

  return {
    toogleNode
  }
}
