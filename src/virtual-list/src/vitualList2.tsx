// import { useThrottleFn,useMemoizedFn } from "ahooks@3.7.8";
// import React, { useState, useRef, useMemo,useEffect,useLayoutEffect,FC } from 'react@18';
// import { createRoot } from 'react-dom@18/client';

// export const ELEMENT_TO_NODE = new WeakMap<Element, Node>();

// type NodeProps = {
//   id: number;
//   content: React.JSX.Element;
//   observer: IntersectionObserver;
// };

// type NodeState = {
//   mode: "loading" | "placeholder" | "viewport";
//   height: number;
// };

// export class Node extends React.PureComponent<NodeProps, NodeState> {
//   public state: NodeState;
//   private ref: React.RefObject<HTMLDivElement>;
//   private observer: IntersectionObserver;
//   props: any;

//   constructor(props: NodeProps) {
//     super(props);
//     this.state = {
//       mode: "loading",
//       height: 60, // 高度未知 未实际渲染时占位
//     };
//     this.ref = React.createRef();
//     this.observer = props.observer;
//   }

//   componentDidMount(): void {
//     const el = this.ref.current;
//     if (!el) return void 0;
//     ELEMENT_TO_NODE.set(el, this);
//     this.observer.observe(el);
//   }

//   componentWillUnmount(): void {
//     const el = this.ref.current;
//     if (!el) return void 0;
//     ELEMENT_TO_NODE.delete(el);
//     this.observer.unobserve(el);
//   }

//   public changeStatus = (mode: NodeState["mode"], height: number): void => {
//     // @ts-ignore
//     this.setState({ mode, height: height || this.state.height });
//   };

//   render() {
//     return (
//       <div ref={this.ref} data-state={this.state.mode}>
//         {this.state.mode === "loading" && (
//           <div style={{ height: this.state.height }}>loading...</div>
//         )}
//         {this.state.mode === "placeholder" && <div style={{ height: this.state.height }}></div>}
//         {this.state.mode === "viewport" && this.props.content}
//       </div>
//     );
//   }
// }

// export const PlaceholderMode: FC<{
//   list: { id: number; content: React.JSX.Element }[];
// }> = props => {
//   const [scroll, setScroll] = useState<HTMLDivElement | null>(null);
//   const [observer, setObserver] = useState<IntersectionObserver | null>(null);

//   const onIntersect = useMemoizedFn((entries: IntersectionObserverEntry[]) => {
//     entries.forEach(entry => {
//       const node = ELEMENT_TO_NODE.get(entry.target);
//       if (!node) {
//         console.warn("Node Not Found", entry.target);
//         return void 0;
//       }
//       const rect = entry.boundingClientRect;
//       if (entry.isIntersecting || entry.intersectionRatio > 0) {
//         // 进入视口
//         node.changeStatus("viewport", rect.height);
//       } else {
//         // 脱离视口
//         if (node.state.mode !== "loading") {
//           node.changeStatus("placeholder", rect.height);
//         }
//       }
//     });
//   });

//   useLayoutEffect(() => {
//     if (!scroll) return void 0;
//     // 视口阈值 取滚动容器高度的一半
//     const margin = scroll.clientHeight / 2;
//     const current = new IntersectionObserver(onIntersect, {
//       root: scroll,
//       rootMargin: `${margin}px 0px`,
//     });
//     setObserver(current);
//     return () => {
//       current.disconnect();
//     };
//   }, [onIntersect, scroll]);

//   return (
//     <div
//       ref={setScroll}
//       style={{ height: 500, border: "1px solid #aaa", overflow: "auto", overflowAnchor: "none" }}
//     >
//       {observer && (
//         <div>
//           {props.list.map(item => (
//             <Node key={item.id} id={item.id} content={item.content} observer={observer}></Node>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const LIST = Array.from({ length: 1000 }, (_, i) => {
//   const height = Math.floor(Math.random() * 30) + 60;
//   return {
//     id: i,
//     content: (
//       <div style={{ height }}>
//         {i}-高度:{height}
//       </div>
//     ),
//   };
// });

// const app = document.getElementById('app');
// const root = createRoot(app!)
// root.render(<PlaceholderMode list={LIST} />,);
