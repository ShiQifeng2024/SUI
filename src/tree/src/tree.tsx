import { defineComponent, toRefs } from 'vue'
import { TreeProps, treeProps } from './tree-types'
export default defineComponent({
  name: 'STree',
  props: treeProps,
  setup(props: TreeProps) {
    return () => {
      return <div class="s-tree"></div>
    }
  }
})
