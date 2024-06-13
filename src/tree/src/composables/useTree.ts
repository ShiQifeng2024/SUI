import { IInnerTreeNode } from '../tree-types'
import { ref, Ref, unref, SetupContext } from 'vue'
import { generateInnerTree } from '../utils'
// import { randomId } from '../../../shared/utils'
import { useCore } from './use-core'
import { useToogle } from './use-toogle'
import { useCheck } from './use-check'
import { useOperate } from './use-operate'
import { TreeUtils } from './use-tree-type'
import { useLazyLoad } from './use-lazy-load'
// import {randomId} from '@/shared/utils'
export function useTree(
  node: Ref<IInnerTreeNode[]> | IInnerTreeNode[],
  context: SetupContext
): TreeUtils {
  const innerData = ref(generateInnerTree(unref(node)))
  const core = useCore(innerData)
  const plugins = [useToogle, useCheck, useOperate]

  const lazyLoad = useLazyLoad(innerData, core, context)
  //聚合
  const pluginMethods = plugins.reduce((pre, plugin) => {
    return {
      ...pre,
      ...plugin(innerData, core, context, lazyLoad)
    }
  }, {})
  // console.log(pluginMethods, 'plugMethods')

  return {
    ...pluginMethods,
    ...core,
    treeData: innerData
  } as TreeUtils
}
