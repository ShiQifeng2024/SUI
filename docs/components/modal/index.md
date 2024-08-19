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
   <s-modal v-model="visible" title="标题">
     <div >内容</div>
     <template #footer>
       <div class="dialog-footer">
         <s-button style="margin-right:12px;" @click="visible=false">取消</s-button>
         <s-button type="primary" @click="visible=false">确定</s-button>
       </div>
     </template>
   </s-modal>


<script setup>
    import {ref} from 'vue'
    const visible=ref(false)
    const open=()=>{
        visible.value=true
    }
</script> 
