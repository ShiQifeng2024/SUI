import { IInnerTreeNode, ITreeNode } from './tree-types'
export function generateInnerTree(
  tree: IInnerTreeNode[],
  level = 0,
  path = [] as IInnerTreeNode[]
): IInnerTreeNode[] {
  return tree.reduce((prev, cur) => {
    const o = { ...cur } as IInnerTreeNode
    if (path.length) {
      o.parentId = path[path.length - 1].id
    }
    o.level = level + 1
    if (cur.children) {
      delete o.children
      o.isLeaf = false
      path.push(o)
      const arr = prev.concat(
        o,
        generateInnerTree(cur.children, level + 1, path)
      )
      path.pop()
      return arr
    } else {
      if (o.isLeaf === undefined) {
        o.isLeaf = true
      }

      return prev.concat(o)
    }
  }, [] as IInnerTreeNode[])
}
