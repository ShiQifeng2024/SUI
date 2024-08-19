<script setup lang="ts">
import virtualList from './components/virtualList.vue'
import SbaseModal from './modal/src/base-modal.tsx'
import { ref } from 'vue'
const open = () => {
  modelVisible.value = true
}
const modelVisible = ref(false)
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" />  -->
  <!-- <Test>
    <template v-slot:title="scope"><h3 style="color:red">我是title {{ scope }}</h3></template>
</Test> -->
  <!-- <SButton type="primary" size="medium" block>确定</SButton>
  <SButton type="primary" size="large" disabled @click="handleConfirm">
    <span style="color: red">元旦快乐</span>
  </SButton> -->
  <!-- <virtualList></virtualList> -->
  <button @click="open">打开</button>
  <SbaseModal v-model="modelVisible">
    <div
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <img
        src="https://img0.baidu.com/it/u=2443551927,4024900749&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=748"
        alt=""
      />
    </div>
  </SbaseModal>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
