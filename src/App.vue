<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test'
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" />  -->
  <!-- <Test>
    <template v-slot:title="scope"><h3 style="color:red">我是title {{ scope }}</h3></template>
  </Test> -->
  <SButton type="primary">确定</SButton>
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
