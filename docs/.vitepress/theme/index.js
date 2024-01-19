import DefaultTheme from 'vitepress/theme'
import HelloWorld from '../../../src/components/HelloWorld.vue'
import Button from '../../../src/button/src/button'
import Tree from '../../../src/tree/src/tree'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
export default {
  ...DefaultTheme,
  //扩展应用程序实例
  enhanceApp({ app }) {
    //注册组件
    app.component('HelloWorld', HelloWorld)
    app.component('SButton',Button)
    app.component("STree",Tree)

    
  }
}
