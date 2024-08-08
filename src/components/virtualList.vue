<template>
  <div class="s-virtual-list_continer" @scroll="scrollEvent">
    <!-- 数据最终高度 ,用于展示滚动条高度-->
    <div
      class="s-virtual-list_blank"
      :style="{ height: `${totalCount * itemCount}px` }"
    ></div>
    <!-- 真正的数据列表 -->
    <div
      class="s-virtual-list"
      :style="{ transform: `translate3d(0,${offsetY}px,0)` }"
    >
      <div
        v-for="(item, index) in visibleData"
        :key="index"
        class="item"
        :style="{ height: `${itemHeight}px` }"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
const containerHeight = 300
const itemHeight = 30 //列表项高度
const visibleCount = Math.ceil(containerHeight / itemHeight) //可视区的条目
const totalCount = 400
const data = ref(
  Array.from({ length: totalCount }, (_, i) => ({
    value: i
  }))
)
console.log(data.value)
//
const startIndx = ref(0)
//可是区域的数据 计算属性
const visibleData = computed(() => {
  return data.value.slice(startIndx.value, startIndx.value + visibleCount)
})
//列表在Y轴方向的偏移量
const offsetY = ref(0)

const scrollEvent = (e: MouseEvent) => {
  const { scrollTop } = e.target as HTMLElement

  //计算可视区开始索引
  startIndx.value = Math.floor(scrollTop / itemHeight)
  //计算偏移量
  offsetY.value = scrollTop
}
</script>

<style lang="scss" scoped>
.s-virtual-list {
  &_continer {
    height: 300px;
    overflow: auto;
    position: relative;
  }

  &_blank {
    border: 3px solid purple;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  & {
    border: 3px solid green;
    transform: translate3d(0, 0, 0);
  }
}

.item {
  // height: 24px;
  background-color: antiquewhite;
}
</style>
