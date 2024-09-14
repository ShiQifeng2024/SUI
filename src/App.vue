<script setup lang="ts">
import virtualList from './components/virtualList.vue'
import SbaseModal from './modal/src/base-modal.tsx'
import SPopover from './popover/popover.tsx'
import { ref } from 'vue'
import { Table, Column } from './table'
import { Button } from './button'
// const open = () => {
//   modelVisible.value = !modelVisible.value
// }
// const host = ref()
// const modelVisible = ref(false)
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    checked: true
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])
const editRow = (row: any) => {
  console.log('rowData', row)
}
const handleSelectionChange = (rows: any) => {
  console.log('rows', rows)
}
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
  <!-- <button @click="open">打开</button>
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
  </SbaseModal> -->
  <!-- <div ref="host" style="width: 50px; margin: 0 auto" @click="open">打开</div>
  <SPopover
    v-model="modelVisible"
    :host="host"
    show-arrow
  >
    Overlay
  </SPopover> -->
  <div style="padding: 10px">
    <Table :data="tableData" @selection-change="handleSelectionChange">
      <Column type="selection"></Column>
      <Column field="date" header="Date"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="address" header="Address"></Column>
      <Column header="edit">
        <template #default="scope">
          <Button @click="editRow(scope)">编辑</Button>
          <Button>新增</Button>
        </template>
      </Column>
    </Table>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
