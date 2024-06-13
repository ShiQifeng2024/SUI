import { Ref, SetupContext, ref } from 'vue'
import { IUseCore, IUseLazyLoad, LazyNodeResult } from './use-tree-type'
import { IInnerTreeNode } from '../tree-types'
import { generateInnerTree } from '../utils'

export function useLazyLoad(
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore,
  { emit }: SetupContext
): IUseLazyLoad {
  //接受父节点，派发事件，外部调用异步方法获取数据，传入回调函数
  const lazyLoadNodes = (node: IInnerTreeNode) => {
    const innerNode = core.getNode(node)
    //判断是否需要懒加载节点
    const children = core.getChildren(node)
    if (children && children.length > 0) {
      return
    }
    if (innerNode && !innerNode.isLeaf && !innerNode.childNodeCount) {
      innerNode.loading = true
      emit('lazy-load', innerNode, handleChildrenNodes)
    }
  }

  function handleChildrenNodes(result: LazyNodeResult) {
    //获取父节点
    const node = core.getNode(result.node)
    if (node) {
      //结束加载状态
      node.loading = false
      //排平操作
      const childNodes = ref<IInnerTreeNode[]>(
        generateInnerTree(result.treeItems as IInnerTreeNode[], node.level)
      )

      //处理子节点和父节点的关系
      setParent(node, childNodes)
      insertChildren(node, childNodes)

      //更新父节点的childNodeCount
      const newChildren = core.getChildren(node)
      node.childNodeCount = newChildren.length
    }
  }
  //设置子节点的parentId
  function setParent(node: IInnerTreeNode, childNodes: Ref<IInnerTreeNode[]>) {
    childNodes.value.forEach(childNode => {
      if (childNode.level - 1 == node.level && !childNode.parentId) {
        childNode.parentId = node.id
      }
    })
  }

  //追加异步获取的节点到原始数组中
  function insertChildren(
    node: IInnerTreeNode,
    childNodes: Ref<IInnerTreeNode[]>
  ) {
    //获取父节点索引值
    const parentIndx = core.getIndex(node)
    if (parentIndx > -1) {
      innerData.value.splice(parentIndx + 1, 0, ...childNodes.value)
    }
  }

  return {
    lazyLoadNodes
  }
}
