//export default () => <div>test</div>

//2 defineComponents

import { defineComponent, withModifiers, ref } from 'vue'

// export default defineComponent({
//     render(){
//         return <div>test</div>
//     }
// })
//对于ts访问友好
//babel-plugin-jsx
//修饰符 插槽 指令
export default defineComponent({
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  },
  setup(props, { slots }) {
    const count = ref(0)
    const increseMent = () => {
      count.value++
      //console.log(count.value)
      condition.value = !condition.value
    }
    const condition = ref(true)
    const list = ref<number[]>(new Array(10).fill(0))
    return () => {
      const arr = list.value.map((item, index) => {
        return <li>{index}</li>
      })
      return (
        <div>
          <div>{slots.title && slots.title(count.value)}</div>
          <div onClick={withModifiers(increseMent, ['self'])}>
            test:{count.value}
          </div>
          <form>
            取值系统:
            <input v-model={count.value} type="text" v-focus />
          </form>
          <div>{condition.value ? <span>A</span> : <span>B</span>}</div>
          <ul>{arr}</ul>
          <div>{slots.default && slots.default()}</div>
        </div>
      )
    }
  }
})
