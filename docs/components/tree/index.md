
# 这是一棵树

```vue
<template>
  <STree :data="data"></STree>
</template>

<script setup>
const data=[
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
  }


]
</script>

```


<STree :data="data"></STree>


<script setup>
const data=[
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
  }


]
</script>