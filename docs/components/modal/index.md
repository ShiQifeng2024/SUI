<!-- <STree :data="data" :height="300">
</STree>



<script setup>
import {ref} from 'vue'
   

const data=ref(
  [...Array.from({length:100}).map((_,index)=>{
   return {
     id:'node'+index,
     label:'node'+index
    }
  })]
)
</script> -->
   <s-button @click="open">打开</s-button>
   <s-modal v-model="visible" title="标题" alignCenter>
      <!-- <template #header="{close}">
        <div class="my-header">
            <s-button type="secondary" @click="close">Close</s-button>
        </div>
      </template> -->
      this is content
   </s-modal>


<script setup>
    import {ref} from 'vue'
    const visible=ref(false)
    const open=()=>{
        visible.value=true
    }
</script> 
