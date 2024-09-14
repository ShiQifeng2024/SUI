import {
  defineComponent,
  ref,
  onMounted,
  PropType,
  toRefs,
  watch,
  nextTick
} from 'vue'
import {
  computePosition,
  arrow,
  offset,
  Middleware,
  autoPlacement
} from '@floating-ui/dom'
import './base-popover.scss'
export default defineComponent({
  name: 'SBasesPopover',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    host: {
      type: Object as PropType<HTMLElement>,
      default: () => null
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String
      // default:'bottom'
    }
  },
  emits: ['update:modelValue'],

  setup(props: any, { slots, emit, attrs }) {
    const { modelValue, host: hostRef, showArrow, placement } = toRefs(props)
    //宿主由外部传入
    //浮动元素
    const overLayRef = ref()

    //箭头
    const arrowRef = ref()
    const updatePosition = () => {
      // console.log('updatePosition', hostRef.value, overLayRef)
      const middleware = [] as Middleware[]
      middleware.push(offset(8))
      if (showArrow.value) {
        middleware.push(arrow({ element: arrowRef.value }))
      }

      //如果用户没有制定placement，则使用autoPlacement
      if (!placement.value) {
        middleware.push(autoPlacement())
      }

      computePosition(hostRef.value, overLayRef.value, {
        middleware: middleware,
        placement: placement.value || 'bottom'
      }).then(({ x, y, middlewareData, placement }) => {
        Object.assign(overLayRef.value.style, {
          left: x + 'px',
          top: y + 'px'
        })
        console.log(placement, middlewareData.arrow, arrowRef.value)

        if (showArrow.value) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow!
          //首先获取当前所在边 e.g. top-end
          const currentSide = placement.split('-')[0]
          const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right'
          }[currentSide]
          const SIDE = ['top', 'right', 'bottom', 'left']
          const prevIdx = SIDE.indexOf(currentSide) - 1
          const nextSide = SIDE[prevIdx >= 0 ? prevIdx : SIDE.length - 1]

          // console.log(arrowX, arrowY, '123', {
          //   left: arrowX + 'px',
          //   top: arrowY + 'px',
          //   [staticSide!]: '-4px',
          //   [`border-${currentSide}-color`]: 'transparent',
          //   [`border-${nextSide}-color`]: 'transparent'
          // })
          // 箭头位置
          Object.assign(arrowRef.value.style, {
            left: arrowX + 'px',
            top: arrowY + 'px',
            [staticSide!]: '-4px',
            [`border-${currentSide}-color`]: 'transparent',
            [`border-${nextSide}-color`]: 'transparent'
          })
        }
      })
    }
    //创建 MutationObserver 监听宿主元素的变化
    const mutationObserver = new MutationObserver(entries => updatePosition)
    const wrapfn = () => {
      updatePosition()
    }
    watch(
      modelValue,
      newValue => {
        // console.log('newValue',newValue)

        if (newValue) {
          nextTick(() => {
            updatePosition()
            //监听两个事件和宿主元素
            hostRef.value &&
              mutationObserver.observe(hostRef.value, { attributes: true })
            window.addEventListener('resize', wrapfn)
            window.addEventListener('scroll', wrapfn)
          })
        } else {
          mutationObserver.disconnect()
          window.removeEventListener('resize', wrapfn)
          window.removeEventListener('scroll', wrapfn)
        }
      },
      {
        immediate: true
      }
    )
    onMounted(() => {
      // console.log('onMounted')
      mutationObserver.disconnect()
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
    })
    return () => (
      <>
        {modelValue.value && (
          <div class="s-base-popover" {...attrs} ref={overLayRef}>
            {/* 弹窗内容 */}
            {slots.default?.()}
            {/* 显示箭头元素 */}
            {showArrow.value && (
              <div class="s-base-popover__arrow" ref={arrowRef}></div>
            )}
          </div>
        )}
      </>
    )
  }
})
