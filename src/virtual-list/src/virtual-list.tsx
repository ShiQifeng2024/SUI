import {
  defineComponent,
  provide,
  toRefs,
  SetupContext,
  ref,
  computed,
  onMounted
} from 'vue'
import '../style/virtual-list.scss'
import { VirtualListProps, virtualListProps } from './virtual-list-types'
import { sortedUniq } from 'pdf-lib'

// data 传入
// containerHeight自适应
//itemHeight 传入
export default defineComponent({
  name: 'VirtualList',
  props: virtualListProps,
  emits: ['lazy-load'],
  setup(props: VirtualListProps, { slots }) {
    const { data, itemHeight, component: Component } = toRefs(props)
    const containerHeight = ref(0)
    const containerRef = ref()
    // const itemHeight = 30;//列表项高度
    const startIndx = ref(0)
    // const visibleCount = Math.ceil(containerHeight.value / itemHeight.value);
    //可视区的条目
    // const visibleCount = computed(() => {
    //     return Math.ceil(containerHeight.value / itemHeight.value)
    // })

    //可是区域的数据 计算属性
    const visibleData = computed(() => {
      const visibleCount = Math.ceil(containerHeight.value / itemHeight.value)
      const result = data.value.slice(
        startIndx.value,
        Math.min(startIndx.value + visibleCount, data.value.length)
      )
      return result
    })
    //容器高度自适应
    onMounted(() => {
      containerHeight.value = containerRef.value.clientHeight
    })

    //列表在Y轴方向的偏移量
    const offsetY = ref(0)

    const scrollEvent = (e: MouseEvent) => {
      const { scrollTop } = e.target as HTMLElement
      //计算可视区开始索引
      startIndx.value = Math.floor(scrollTop / itemHeight.value)
      //计算偏移量
      offsetY.value = scrollTop - (scrollTop % itemHeight.value)
      console.log('scrollTop', scrollTop, '偏移距离', offsetY.value)
      // offsetY.value=scrollTop
    }
    console.log(visibleData.value, 'visibleData.value')

    return () => {
      return (
        <Component.value
          class="s-virtual-list_continer"
          ref={containerRef}
          onScroll={scrollEvent}
        >
          {/* 数据最终高度 ,用于展示滚动条高度 */}
          <div
            class="s-virtual-list_blank"
            style={{ height: `${data.value.length * itemHeight.value}px` }}
          ></div>
          {/* 真正的数据列表  */}
          <div
            class="s-virtual-list"
            style={{ transform: `translate3d(0,${offsetY.value}px,0)` }}
          >
            {visibleData.value.map((item, index) => {
              return slots.default && slots.default(item, index)
            })}
          </div>
        </Component.value>
      )
    }
  }
})
