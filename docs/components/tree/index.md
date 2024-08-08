# 这是一棵树

```vue
<template>
  <STree :data="data"></STree>
</template>

<script setup>
const data = [
  {
    label: 'docs',
    id: 'node-1',
    expanded: true,
    children: [
      {
        id: 'node-1-1',
        label: 'vitepress',
        expanded: true
      },
      {
        label: 'components',
        id: 'node-1-2',
        expanded: true,
        children: [
          {
            id: 'node-1-2-1',
            label: 'tree'
          }
        ]
      }
    ]
  },
  {
    label: 'packages',
    id: 'node-2',
    expanded: true,
    children: [
      {
        label: 'vite',
        id: 'node-2-1',
        expanded: true,
        children: [
          {
            label: 'README.md',
            id: 'node-2-1-1',
            expanded: true
          }
        ]
      }
    ]
  },
  {
    label: 'ReadMe',
    id: 'node-3'
  }
]
</script>
```

<!-- <STree :data="data" checkable></STree> -->

<!-- <script setup> -->
<!--
// import {ref} from 'vue'
// const data=ref([
// {
// label:'docs',
// id:'node-1',
// expanded:true,
// checked:true,
// children:[
// {
// id:'node-1-1',
// label:'vitepress',
// expanded:true
// },
// {
// label:'components',
// id:'node-1-2',
// expanded:true,
// children:[
// {
// id:'node-1-2-1',
// label:'tree'
// }
// ]
// }
// ]
// },
// {
// label:'packages',
// id:'node-2',
// expanded:true,
// children:[
// {
// label:'vite',
// id:'node-2-1',
// expanded:true,
// children:[
// {
// label:'README.md',
// id:'node-2-1-1',
// expanded:true,
// }
// ]
// },
// ]
// },
// {
// label:'ReadMe',
// id:'node-3',
// }

// ]) -->

<!-- </script> -->

<!-- <STree :data="data" checkable operable>
  <template v-slot:content="treeNode">
     <span>{{treeNode.label}}</span>
  </template>
</STree>

<script setup>
import {ref} from 'vue'
const data=ref(
[
  {
      label:'docs',
      id:'node-1',
      expanded:true,
      children:[
        {
            id:'node-1-1',
            label:'vitepress',
            expanded:true
        },
        {
            label:'components',
            id:'node-1-2',
            expanded:true,
            children:[
                {
                    id:'node-1-2-1',
                    label:'tree'
                }
            ]
        }
      ]
  },
  {
      label:'packages',
      id:'node-2',
      expanded:true,
      children:[
          {
              label:'vite',
              id:'node-2-1',
              expanded:true,
              children:[
                  {
                      label:'README.md',
                      id:'node-2-1-1',
                      expanded:true,
                  }
              ]
          },
      ]
  },
  {
      label:'ReadMe',
      id:'node-3',
      expanded:true
  }
]
)
</script> -->

<!-- <STree :data="data" @lazy-load="lazyLoad">
</STree>

<script setup>
import {ref} from 'vue'


   
const data=ref([
  {
  id:'node-1',
  label:'node-1',
  children:[
    {
      id:'node-1-1',
      label:'node1-1-dynamicloading',
      isLeaf:false,
    },
    {
      id:'node1-2',
      label:'node1-2',
    },
  ],
  },
  {
    id:'node-2',
    label:'node2-dynamicloading',
    isLeaf:false
  },
]);

const lazyLoad = (node, cb) => {
  setTimeout(() => {
    const data=[
      {
        label:'lazy node 1',
        id:'lazy node 1',
        expanded:true,
        children:[
          {
            id:'lazy node 1-1',
            label:'lazy node 1-1'
          },
          {
            id:'lazy node 1-2',
            label:'lazy node 1-2'
          }
        ]
      }
    ];

    cb({
      treeItems:data,
      node,
    }
      
)

  },1000)
}
</script> -->



<STree :data="data" :height="300">
</STree>



<script setup>
import {ref} from 'vue'
   
// const data=ref(
// [
//   {
//       label:'docs',
//       id:'node-1',
//       expanded:true,
//       children:[
//         {
//             id:'node-1-1',
//             label:'vitepress',
//             expanded:true
//         },
//         {
//             label:'components',
//             id:'node-1-2',
//             expanded:true,
//             children:[
//                 {
//                     id:'node-1-2-1',
//                     label:'tree'
//                 }
//             ]
//         }
//       ]
//   },
//   {
//       label:'packages',
//       id:'node-2',
//       expanded:true,
//       children:[
//           {
//               label:'vite',
//               id:'node-2-1',
//               expanded:true,
//               children:[
//                   {
//                       label:'README.md',
//                       id:'node-2-1-1',
//                       expanded:true,
//                   }
//               ]
//           },
//       ]
//   },
//   {
//       label:'ReadMe',
//       id:'node-3',
//       expanded:true
//   }
// ]
// )
const data=ref(
  [...Array.from({length:100}).map((_,index)=>{
   return {
     id:'node'+index,
     label:'node'+index
    }
  })]
)
</script>
