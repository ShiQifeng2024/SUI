import { defineComponent, inject, toRefs } from 'vue'
import { TreeNodeProps, treeNodeProps, TreeUtils } from './tree-node-types'

const NODE_HEIGHT = 32
const NODE_INDENT = 24
export default defineComponent({
  name: 'STreeNode',
  props: treeNodeProps,
  setup(props: TreeNodeProps, { slots }) {
    const { checkable, treeNode } = toRefs(props)
    //通过inject
    const { toogleNode, getChildren, toogleCheckNode } = inject<TreeUtils>(
      'TREE_UTILS'
    ) as TreeUtils
    return () => {
      return (
        <div
          class="s-tree-node hover:bg-slate-300 relative leading-8"
          style={{
            paddingLeft: `${NODE_INDENT * (treeNode.value.level - 1)}px`
          }}
        >
          {/*连接线*/}
          {!treeNode.value.isLeaf && treeNode.value.expanded && (
            <span
              class="s-tree-node_vline absolute w-px bg-gray-300"
              style={{
                height: `${NODE_HEIGHT * getChildren(treeNode.value).length}px`,
                left: `${
                  NODE_INDENT * (treeNode.value.level - 1) +
                  Math.ceil(NODE_INDENT / 2)
                }px`,
                top: `${NODE_HEIGHT}px`
              }}
            ></span>
          )}

          {/*关闭折叠的标签*/}
          {/*判断是否是叶子节点*/}
          {treeNode.value.isLeaf ? (
            <span style={{ display: 'inline-block', width: '25px' }}></span>
          ) : (
            slots.icon!()
          )}
          {/*复选框*/}
          {checkable.value && (
            <input
              type="checkbox"
              v-model={treeNode.value.checked}
              onClick={() => {
                toogleCheckNode(treeNode.value)
              }}
            />
          )}
          {/*标签*/}
          {slots.content!()}
        </div>
      )
    }
  }
})
