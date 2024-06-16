import { defineComponent, provide, toRefs, SetupContext } from 'vue'
import { TreeProps, treeProps } from './tree-types'
import '../style/tree.scss'
import { useTree } from './composables/useTree'
import STreeNode from './components/tree-node'
import STreeNodeToogle from './components/tree-node-toggle'
export default defineComponent({
  name: 'STree',
  props: treeProps,
  emits: ['lazy-load'],
  setup(props: TreeProps, context: SetupContext) {
    const { data } = toRefs(props)
    const slots = context.slots
    const treeData = useTree(data.value, props, context)
    provide('TREE_UTILS', {
      toogleNode: treeData.toogleNode,
      toogleCheckNode: treeData.toogleCheckNode,
      getChildren: treeData.getChildren,
      append: treeData.append,
      remove: treeData.remove,
      getChildrenVisible: treeData.getChildrenVisible,
      onDragstart: treeData.onDragstart,
      onDragover: treeData.onDragover,
      onDrop: treeData.onDrop,
      onDragleave: treeData.onDragleave,
      onDragend: treeData.onDragend
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
                },
                loading: () => {
                  return slots.loading ? (
                    slots.loading({ nodeData: treeNode })
                  ) : (
                    <span class="ml-1">loading...</span>
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
