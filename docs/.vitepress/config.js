import {  defineConfig } from 'vitepress'
// import { demoblockPlugin, demoblockVitePlugin } from "vitepress-theme-demoblock"
import vueJsx from '@vitejs/plugin-vue-jsx'
const sidebar={
    "/":[
        {
            text:'通用',
            items:[
                {text:'Button 按钮',link:'/components/button.md'},
                {text:'树形结构',link:'/components/tree/index.md'}
            ]
        },
        {
            text:"导航",
           
        },
        {
            text:'反馈',
            items:[
                {text:'Modal 模态',link:'/components/modal/index.md'},
            ]
        },
        {
            text:'数据录入'
        },
        {
            text:'数据展示'
        },
        {
            text:'布局'
        }
    ],
   
}
const config={
    themeConfig:{
        sidebar
    }
}


export default defineConfig({



    // title: '浏览器标题',
    // description: '浏览器描述',
    // lang: 'cn-ZH',
    // base: '/',
    // lastUpdated: true,
    themeConfig: {
      sidebar
    },
    markdown:{
        config:(md)=>{
            //使用markdown插件做扩展
        },
    },
    vite: {
        plugins: [vueJsx()]
    }
  })
