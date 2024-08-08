import { reactive, computed, Ref } from 'vue'
import {
  DragState,
  IDragdrop,
  IDropType,
  IUseCore,
  IUseDragdrop
} from './use-tree-type'
import { IInnerTreeNode } from '../tree-types'

const dropTypeMap = {
  dropPrev: 's-tree-node--drop-prev',
  dropNext: 's-tree-node--drop-next',
  dropInner: 's-tree-node--drop-inner'
}

export function useDragDrop(
  dragDrop: IDragdrop,
  data: Ref<IInnerTreeNode[]>,
  { getChildren, getParent }: IUseCore
): IUseDragdrop {
  const dragState = reactive<DragState>({
    dropType: undefined,
    draggingNode: undefined,
    draggingTreeNode: undefined
  })

  const treeIdMapValue = computed<Record<string | number, IInnerTreeNode>>(
    () => {
      return data.value.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.id!]: cur
        }),
        {}
      )
    }
  )
  const removeDraggingStyle = (target: HTMLElement | null) => {
    target?.classList.remove(...Object.values(dropTypeMap))
  }
  const resetDragState = () => {
    console.log('resetDragState')
  }
  const onDragstart = (event: DragEvent, treeNode: IInnerTreeNode): void => {
    // console.log('in23')
    event.stopPropagation()
    dragState.draggingNode = event.target as HTMLElement | null
    dragState.draggingTreeNode = treeNode
    event.dataTransfer?.setData('dragNodeId', treeNode.id!)
  }
  const checkIsParent = (
    childNodeId: number | string,
    parentNodeId: number | string
  ): boolean => {
    const realParentId = treeIdMapValue.value[childNodeId]?.parentId
    if (realParentId === parentNodeId) {
      return true
    } else if (realParentId !== undefined) {
      return checkIsParent(realParentId, parentNodeId)
    } else {
      return false
    }
  }

  const onDrop = (event: DragEvent, dropNode: IInnerTreeNode): void => {
    event.preventDefault()
    event.stopPropagation()
    // removeDraggingStyle(event.currentTargetasHTMLElement | null)
    // console.log('in')
    if (!dragState.draggingNode || !dragDrop) return

    const dragNodeId = event.dataTransfer?.getData('dragNodeId')
    if (dragNodeId) {
      const isParent = checkIsParent(dropNode.id!, dragNodeId)
      if (dragNodeId === dropNode.id || isParent) {
        return
      }
      if (dragState.dropType) {
        handleDrop(dragNodeId, dropNode)
      }

      resetDragState()
    }
  }

  function handleDrop(dragNodeId: string, dropNode: IInnerTreeNode) {
    const dragNode = data.value.find(item => item.id === dragNodeId)

    if (dragNode) {
      let cloneDragNode: IInnerTreeNode
      const childrenOfDragNode = getChildren(dragNode)
      const parentOfDragNode = getParent(dragNode)
      if (dragState.dropType === 'dropInner') {
        cloneDragNode = {
          ...dragNode,
          parentId: dropNode.id,
          level: dropNode.level + 1
        }
        const dropNodeIndex = data.value.indexOf(dropNode)
        data.value.splice(dropNodeIndex + 1, 0, cloneDragNode)
        dropNode.isLeaf = undefined
        const dragNodeIndex = data.value.indexOf(dragNode)
        data.value.splice(dragNodeIndex, 1)
      } else if (dragState.dropType === 'dropNext') {
        cloneDragNode = {
          ...dragNode,
          parentId: dropNode.parentId,
          level: dropNode.level
        }
        const dropNodeIndex = data.value.indexOf(dropNode)
        const dropNodeChildrenLength = getChildren(dropNode, true).length
        data.value.splice(
          dropNodeIndex + dropNodeChildrenLength + 1,
          0,
          cloneDragNode
        )
        const dragNodeIndex = data.value.indexOf(dragNode)
        data.value.splice(dragNodeIndex, 1)
      } else if (dragState.dropType === 'dropPrev') {
        cloneDragNode = {
          ...dragNode,
          parentId: dropNode.parentId,
          level: dropNode.level
        }
        const dropNodeIndex = data.value.indexOf(dropNode)
        data.value.splice(dropNodeIndex, 0, cloneDragNode)
        const dragNodeIndex = data.value.indexOf(dragNode)
        data.value.splice(dragNodeIndex, 1)
      }

      dragState.dropType = 'dropInner'
      childrenOfDragNode.forEach(child => handleDrop(child.id!, cloneDragNode))

      if (parentOfDragNode) {
        if (getChildren(parentOfDragNode).length === 0) {
          parentOfDragNode.isLeaf = true
        }
      }
    }
  }

  const onDragover = (event: DragEvent): void => {
    event.preventDefault()
    event.stopPropagation()
    if (!dragState.draggingNode) {
      return
    }

    if (dragDrop) {
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }

      if (!data) {
        return
      }
      let curDropType: IDropType = {}
      if (typeof dragDrop === 'object') {
        curDropType = dragDrop
      } else if (dragDrop === true) {
        curDropType = { dropInner: true }
      }
      const { dropPrev, dropNext, dropInner } = curDropType

      let innerDropType: DragState['dropType']

      const prevPercent = dropPrev
        ? dropInner
          ? 0.25
          : dropNext
          ? 0.45
          : 1
        : -1
      const nextPercent = dropNext
        ? dropInner
          ? 0.75
          : dropPrev
          ? 0.55
          : 0
        : 1
      const currentTarget = event.currentTarget as HTMLElement | null
      const targetPosition = currentTarget?.getBoundingClientRect()
      const distance = event.clientY - (targetPosition?.top || 0)

      if (distance < (targetPosition?.height || 0) * prevPercent) {
        innerDropType = 'dropPrev'
      } else if (distance > (targetPosition?.height || 0) * nextPercent) {
        innerDropType = 'dropNext'
      } else if (dropInner) {
        innerDropType = 'dropInner'
      } else {
        innerDropType = undefined
      }
      if (innerDropType) {
        const classList = currentTarget?.classList
        if (classList) {
          if (!classList.contains(dropTypeMap[innerDropType])) {
            removeDraggingStyle(currentTarget)
            classList.add(dropTypeMap[innerDropType])
          }
        }
      } else {
        removeDraggingStyle(currentTarget)
      }
      dragState.dropType = innerDropType
    }
  }

  const onDragleave = (event: DragEvent) => {
    event.stopPropagation()
    if (!dragState.draggingNode) {
      return
    }
    removeDraggingStyle(event.currentTarget as HTMLElement | null)
  }

  const onDragend = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    resetDragState()
  }

  return {
    onDragstart,
    onDragover,
    onDragleave,
    onDrop,
    onDragend
  }
}
