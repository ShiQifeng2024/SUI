import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './index.scss'

// import Button from './button'
//使用权量导出
import sheepUI from '../build'
import '../build/style.css'
// import Button from '../build/button'
// import '../build/button/style.css'
createApp(App).use(sheepUI).mount('#app')
