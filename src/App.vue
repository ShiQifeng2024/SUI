<script setup lang="ts">
import virtualList from './components/virtualList.vue'
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
  <virtualList></virtualList>
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
