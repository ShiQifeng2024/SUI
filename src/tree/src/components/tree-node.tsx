import { defineComponent, inject, toRefs, ref } from 'vue'
import { TreeNodeProps, treeNodeProps, TreeUtils } from './tree-node-types'
import { IInnerTreeNode } from '../tree-types'

const NODE_HEIGHT = 32
const NODE_INDENT = 24
export default defineComponent({
  name: 'STreeNode',
  props: treeNodeProps,
  setup(props: TreeNodeProps, { slots }) {
    const { checkable, treeNode, operable } = toRefs(props)
    //通过inject
    const {
      toogleNode,
      getChildren,
      toogleCheckNode,
      append,
      remove,
      getChildrenVisible
    } = inject<TreeUtils>('TREE_UTILS') as TreeUtils
    //创建一个开关变量
    const isShow = ref(false)
    const toogleOperate = () => {
      if (isShow.value) {
        isShow.value = false
      } else {
        isShow.value = true
      }
    }
    return () => {
      return (
        <div
          class="s-tree-node hover:bg-slate-300 relative leading-8"
          style={{
            paddingLeft: `${NODE_INDENT * (treeNode.value.level - 1)}px`
          }}
          //控制按钮行为
          onMouseenter={toogleOperate}
          onMouseleave={toogleOperate}
        >
          {/*连接线*/}
          {!treeNode.value.isLeaf && treeNode.value.expanded && (
            <span
              class="s-tree-node_vline absolute w-px bg-gray-300"
              style={{
                height: `${
                  NODE_HEIGHT * getChildrenVisible(treeNode.value).length
                }px`,
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
          {/* 节点增删操作 */}
          {operable.value && isShow.value && (
            <span class="inline-flex ml-1">
              <svg
                class="icon cursor-pointer"
                viewBox="0 0 1024 1024"
                width="14"
                height="14"
                onClick={() => {
                  append(treeNode.value, {
                    label: '新节点'
                  } as IInnerTreeNode)
                }}
              >
                <path
                  d="M472 864V552H176a7.936 7.936 0 0 1-7.36-4.928 7.936 7.936 0 0 1-0.64-3.072v-64a7.936 7.936 0 0 1 4.928-7.36 7.936 7.936 0 0 1 3.072-0.64h296V160a7.936 7.936 0 0 1 4.928-7.36 7.936 7.936 0 0 1 3.072-0.64h64a7.936 7.936 0 0 1 7.424 4.928c0.384 0.96 0.576 1.984 0.576 3.072v312h296a7.936 7.936 0 0 1 7.424 4.928c0.384 0.96 0.576 1.984 0.576 3.072v64a7.936 7.936 0 0 1-4.928 7.424 7.936 7.936 0 0 1-3.072 0.576H552V864a7.936 7.936 0 0 1-4.928 7.424 7.936 7.936 0 0 1-3.072 0.576h-64a7.936 7.936 0 0 1-7.36-4.928 7.936 7.936 0 0 1-0.64-3.072z"
                  fill="#333333"
                  p-id="1152"
                ></path>
              </svg>
              <svg
                class="icon cursor-pointer"
                viewBox="0 0 1024 1024"
                width="14"
                height="14"
                onClick={() => {
                  remove(treeNode.value)
                }}
              >
                <path
                  d="M214.72 271.104a5.312 5.312 0 0 1-1.92-4.096 8.576 8.576 0 0 1 0-4.608 10.88 10.88 0 0 1 3.2-3.584 7.616 7.616 0 0 1 4.48-1.344h87.04a16.64 16.64 0 0 1 11.52 4.672l193.28 193.28 193.28-193.28a14.528 14.528 0 0 1 10.88-4.672h87.68c0.832 0 1.728 0.192 2.56 0.576 1.28 0.448 2.112 1.024 2.56 1.792a7.104 7.104 0 0 1 2.56 5.632 7.296 7.296 0 0 1-2.56 5.632L568.64 512l240.64 240.896a7.744 7.744 0 0 1 2.56 5.632 7.872 7.872 0 0 1-0.64 3.072 7.744 7.744 0 0 1-1.92 2.624c-1.28 1.6-3.2 2.368-5.76 2.304h-87.04a14.528 14.528 0 0 1-10.88-4.672l-193.28-193.28-193.28 193.28a16.64 16.64 0 0 1-11.52 4.672h-87.04a7.168 7.168 0 0 1-3.2-0.64 10.048 10.048 0 0 1-2.56-1.728 7.104 7.104 0 0 1-2.56-5.632c0-2.24 0.832-4.096 2.56-5.632L455.36 512l-240.64-240.896z"
                  fill="#333333"
                  p-id="1152"
                ></path>
              </svg>
            </span>
          )}
          {/*loading状态*/}
          {treeNode.value.loading && slots.loading!()}
        </div>
      )
    }
  }
})
