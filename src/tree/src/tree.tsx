import { defineComponent, toRefs, ref, computed } from 'vue'
import { IInnerTreeNode, TreeProps, treeProps } from './tree-types'
import { generateInnerTree } from './utils'
import '../style/tree.scss'
const data = [
  {
    label: 'docs',
    id: 'node-1',
    level: 1
  },
  {
    label: 'packages',
    id: 'node-2',
    expanded: true,
    level: 1,
    children: [
      {
        label: 'vite',
        id: 'node-2-1',
        expanded: true,
        level: 2,
        children: [
          {
            label: 'README.md',
            id: 'node-2-1-1',
            expanded: true,
            level: 3
          }
        ]
      }
    ]
  },
  {
    label: 'ReadMe',
    id: 'node-3',
    level: 1
  }
]

export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps) {
    const { data } = toRefs(props)
    //console.log(generateInnerTree(data.value))
    const innerData = ref(generateInnerTree(data.value))
    const toogleNode = (node: IInnerTreeNode) => {
      //还要影响子节点
      //
      const cur = innerData.value.find(item => item.id == node.id)
      if (cur) {
        cur.expanded = !cur.expanded
      }
    }

    //展开的节点列表
    const expandedTree = computed(() => {
      let excludedNodes: IInnerTreeNode[] = []
      const result = []
      //循环列表，找出那些!expanded的节点
      const getChildren = (obj: IInnerTreeNode): any[] => {
        let result: any = []
        for (const item of innerData.value) {
          if (item.parentId == obj.id) {
            result.push(item)
            const sub = getChildren(item)
            result = result.concat(sub)
          }
        }
        return result
      }
      for (const item of innerData.value) {
        if (excludedNodes.includes(item)) continue
        if (item.expanded !== true) {
          excludedNodes = excludedNodes.concat(getChildren(item))
        }
        result.push(item)
      }

      return result
    })
    return () => {
      return (
        <div class="s-tree">
          {expandedTree?.value?.map(treeNode => (
            <div
              class="s-tree-node"
              style={{
                paddingLeft: `${24 * (treeNode.level - 1)}px`
              }}
            >
              {/*关闭折叠的标签*/}
              {/*判断是否是叶子节点*/}
              {treeNode.isLeaf ? (
                <span style={{ display: 'inline-block', width: '25px' }}></span>
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
              {treeNode.label}
            </div>
          ))}
        </div>
      )
    }
  }
})
