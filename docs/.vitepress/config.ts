import { DefaultTheme, defineConfig } from 'vitepress'
const sidebar:DefaultTheme.Sidebar={
    "/":[
        {text:"快速开始",link:"/"},
        {
            text:'通用',
            items:[
                {text:'Button 按钮',link:'/components/button'}
            ]
        },
        {
            text:"导航"
        },
        {
            text:'反馈'
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
    }
  })
