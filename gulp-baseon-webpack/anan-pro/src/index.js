// 1 引入react和react-dom   必须如此命名
import React from "react"//专门用于创建组件和虚拟dom，同时组件的声明周期都在这个包中
import ReactDom from "react-dom"//用于进行dom操作，最主要的应用场景 ReactDOM.render()

// import "./classExtend"
// 3 使用reactdom将虚拟dom渲染到页面上
// 参数1 需要渲染的那个dom元素
// 参数2 指定页面上一个容器











ReactDom.render(<div>
app
</div>,window.document.getElementById("app"))
