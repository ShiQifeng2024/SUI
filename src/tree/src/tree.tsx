import { defineComponent, provide, toRefs } from 'vue'
import { TreeProps, treeProps } from './tree-types'
import '../style/tree.scss'
import { useTree } from './composables/useTree'
import STreeNode from './components/tree-node'
import STreeNodeToogle from './components/tree-node-toggle'
export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps, { slots }) {
    const { data } = toRefs(props)
    const treeData = useTree(data)
    provide('TREE_UTILS', {
      toogleNode: treeData.toogleNode,
      toogleCheckNode: treeData.toogleCheckNode,
      getChildren: treeData.getChildren
    })
    return () => {
      return (
        <div class="s-tree">
          {treeData.expandedTree?.value?.map(treeNode => (
            <STreeNode {...props} treeNode={treeNode}>
              {{
                content: () => {
                  return slots.content
                    ? slots.content(treeNode)
                    : treeNode.label
                },
                icon: () => {
                  return slots.icon ? (
                    slots.icon({
                      nodeData: treeNode,
                      toogleNode: treeData.toogleNode
                    })
                  ) : (
                    <STreeNodeToogle
                      expanded={!!treeNode.expanded}
                      onClick={() => {
                        treeData.toogleNode(treeNode)
                      }}
                    ></STreeNodeToogle>
                  )
                }
              }}
            </STreeNode>
          ))}
        </div>
      )
    }
  }
})
