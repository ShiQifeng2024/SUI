import { defineComponent, toRefs } from 'vue'
import { IInnerTreeNode, TreeProps, treeProps } from './tree-types'
import '../style/tree.scss'
import { useTree } from './composables/useTree'
const NODE_HEIGHT = 32
const NODE_INDENT = 24

export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps, { slots }) {
    const { data, checkable } = toRefs(props)
    const { toogleNode, expandedTree, getChildren, toogleCheckNode } =
      useTree(data)
    return () => {
      return (
        <div class="s-tree">
          {expandedTree?.value?.map(treeNode => (
            <div
              class="s-tree-node hover:bg-slate-300 relative leading-8"
              style={{
                paddingLeft: `${NODE_INDENT * (treeNode.level - 1)}px`
              }}
            >
              {/*连接线*/}
              {!treeNode.isLeaf && treeNode.expanded && (
                <span
                  class="s-tree-node_vline absolute w-px bg-gray-300"
                  style={{
                    height: `${NODE_HEIGHT * getChildren(treeNode).length}px`,
                    left: `${
                      NODE_INDENT * (treeNode.level - 1) +
                      Math.ceil(NODE_INDENT / 2)
                    }px`,
                    top: `${NODE_HEIGHT}px`
                  }}
                ></span>
              )}

              {/*关闭折叠的标签*/}
              {/*判断是否是叶子节点*/}
              {treeNode.isLeaf ? (
                <span style={{ display: 'inline-block', width: '25px' }}></span>
              ) : slots.icon ? (
                slots.icon({ nodeData: treeNode, toogleNode })
              ) : (
                <svg
                  style={{
                    transform: `${treeNode.expanded ? '' : 'rotate(-90deg)'}`,
                    display: 'inline-block'
                  }}
                  onClick={() => toogleNode(treeNode)}
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4383"
                  width="26"
                  height="18px"
                >
                  <path
                    fill="#3C405D"
                    d="M676.394667 432.896a21.333333 21.333333 0 0 0-30.165334 0l-135.168 135.125333-133.333333-133.376a21.333333 21.333333 0 0 0-30.165333 30.165334l148.394666 148.48a21.418667 21.418667 0 0 0 30.208 0l150.229334-150.186667a21.333333 21.333333 0 0 0 0-30.208"
                    p-id="4384"
                  ></path>
                </svg>
              )}
              {/*复选框*/}
              {checkable.value && (
                <input
                  type="checkbox"
                  v-model={treeNode.checked}
                  onClick={() => {
                    toogleCheckNode(treeNode)
                  }}
                />
              )}
              {/*标签*/}
              {slots.content ? slots.content(treeNode) : treeNode.label}
            </div>
          ))}
        </div>
      )
    }
  }
})
