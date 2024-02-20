import { defineComponent } from 'vue'

export default defineComponent({
  name: 'STreeNodeToogle',
  emits: ['click'],
  setup(props: { expanded: boolean }, { emit }) {
    return () => {
      return (
        <svg
          style={{
            transform: `${props.expanded ? '' : 'rotate(-90deg)'}`,
            display: 'inline-block'
          }}
          onClick={() => emit('click')}
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4383"
          width="26"
          height="18px"
        >
          <path
            fill="#3C405D"
            d="M676.394667 432.896a21.333333 21.333333 0 0 0-30.165334 0l-135.168 135.125333-133.333333-133.376a21.333333 21.333333 0 0 0-30.165333 30.165334l148.394666 148.48a21.418667 21.418667 0 0 0 30.208 0l150.229334-150.186667a21.333333 21.333333 0 0 0 0-30.208"
            p-id="4384"
          ></path>
        </svg>
      )
    }
  }
})
