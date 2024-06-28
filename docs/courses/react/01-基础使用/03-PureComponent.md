---
title: PureComponent
date: 2024/05/14 16:54
categories:
  - React
tags:
---
# PureComponent

在React中创建一个类组件，要么继承React.Component，要么继承React.Component

## 浅比较

```JS
let obj = {a:110} // obj指向了{a:110}这个堆 obj是一个地址：0x123

let objA = {x:1,y:obj,arr:[1,2,3]}
let objB = {x:1,y:obj,arr:[1,2,3]}

//浅比较objA和objB, 只会比较第一层

objA        objB
x           x           一样
y:0x123     y:0x123     一样
arr:0x456   arr:0x489   不一样

// 如果objA和objB 中的成员个数不一样，两个对象肯定不一致

```

```TSX
// 如果继承了 Component，那么是可以实现添加span
// 如果继承了PureComponent，那么不可以添加

export default class One extends Component {
    state={
        arr:[1,2,3]
    }
    render(){
        let { arr } = this.state;
        return (
            <>
            {
                arr.map((item,index)=>{
                    return <span key={index} style={{
                        display:'inline-block',
                        width:"100px",
                        height:"100px",
                        background:'gold',
                        marginRight:10
                    }}>
                        {item}
                    </span>
                })
            }
            <hr/>
            <button onClick={()=>{
                arr.push(4);
                this.setState({
                    arr
                })
            }}>添加</button>
            </>
        )
    }
}
```

PureComponent和Component的区别
* PureComponent 会给类组件添加一个 shouldComponentUpdate 生命周期函数，在其中默认实现了新老属性状态的浅比较
* 如果经过浅比较，发现属性或状态并没有改变，则返回false，也就意味着不更新组件组件了

解决方法
```TSX
export default class One extends Component {
    state={
        arr:[1,2,3]
    }
    render(){
        let { arr } = this.state;
        return (
            <>
            {
                arr.map((item,index)=>{
                    return <span key={index} style={{
                        display:'inline-block',
                        width:"100px",
                        height:"100px",
                        background:'gold',
                        marginRight:10
                    }}>
                        {item}
                    </span>
                })
            }
            <hr/>
            <button onClick={()=>{
	            arr=[...arr] // 数组指向新引用地址
	            arr.push(4)
	            
                this.setState({
                    arr
                })
            }}>添加</button>
            </>
        )
    }
}
```

