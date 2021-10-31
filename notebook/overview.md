## 1. SPA & MPA

Là các phương pháp triển khai website:  

- SPA (single-page application) hay CSR.  
    - Không yêu cầu tải lại trang trong quá trình sử dụng.  
    - Phần lớn tài nguyên được tải trong lần đầu.  
    - Chỉ tải dữ liệu mới khi cần.  
- MPA (multi-page application) hay SSR.  
    - Yêu cầu tải lại trang trong quá trình sử dụng (eg: click vào các link).  
    - Luôn tải lại toàn bộ trang khi truy cập & chuyển hướng.  

**Tốc độ**: SPA có tốc độ nhanh hơn MPA, nhưng lần đầu tải sẽ chậm hơn.  
**SEO**: SPA không thân thiện với SEO (Search engine optimization) bằng MPA.  
**UX**: SPA cho trải nghiệm tốt hơn MPA nhất là trên mobile.  
**Phát triển**: SPA dễ dàng tái sd code (component) hơn MPA. SPA bóc tách code FE & BE.  
**Performance**: SPA giúp giảm tải cho server.  


## 2. ReactJS  

ReactJS là thư viện JS sử dụng để xây dựng user interface.  

ReactJS là một trong những thư viện tạo ra SPA.  

**Note**: React sử dụng các DOM method xây dựng sẵn của JS.  

React's office document: https://reactjs.org/.  

**Github** là nơi lưu trữ mã nguồn gốc (mã nguồn gốc build ra sản phẩm).  
**NPM** là nơi lưu trữ thư viện được xây dựng từ mã nguồn gốc.  
**UNPKG** giúp lấy thư viện lưu trữ tại NPM dưới dạng CDN.  


## 3. Thêm React CDN vào website

```html
<script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
```

Sau khi thêm library sẽ có một biến global là obj **React** gồm các property & method làm việc với React.  


## 4. createElement()  

*document.createElement()*: Tạo mới một DOM element node (node là thành phần nhỏ nhất trong DOM).  

*React.createElement()*: Tạo mới một React element là thành phần nhỏ nhất khi làm việc với React.  

> **React.createElement(type, props, ...childrens)** trong đó:  
> - *type*: kiểu element.  
> - *props*: các attributes của element.
> - *childrens*: các content bên trong element; có thể là:
>   string (child text node), object (child element node), array (array of child node), ...
>
> Method return React element đã tạo là một object có các property:  
> - *type* (element type), 
> - *props* (object chứa element *attributes* & có *children* property chứa element content [string, object or array]), 
> - ...

**Note**: https://jsfiddle.net hoặc https://codepen.io hoặc https://codesandbox.io viết code online.  

```js
// ======== Ví dụ: <h1 title="Hello" class="heading">Hello Guys</h1> ========
// Tạo DOM element
const h1 = document.createElement('h1')
h1.title = 'Hello'
h1.className = 'heading'
h1.innerText = 'Hello Guys'
document.body.appendChild(h1)

// Tạo React element -> render React-DOM
// React.createElement(type, props, ...childrens)
const h1React = React.createElement(
    'h1', 
    {title: 'Hello', className: 'heading'}, 
    'Hello Guys'
)

// ======== Ví dụ =======
/**
 * <ul>
 *    <li>Javascript</li>
 *    <li>ReactJS</li>
 * </ul>
 */
const ulReact = React.createElement(
    'ul',
    null,
    React.createElement('li', null, 'Javascript'),
    React.createElement('li', null, 'ReactJS')
)
```  


## 5. React-DOM  

React-DOM là thư viện làm cầu nối giữa React & DOM, giúp React render React element vào DOM.  

**Additional**: React-Native là thư viện làm cầu nối giữa React & Native, dùng để build các ứng dụng iOS & android.  

Thêm CDN react-dom vào website:  
```html
<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
```

Sau khi thêm library sẽ có một biến global là obj **ReactDOM** gồm các property & method làm việc với React-DOM.  

**ReactDOM.render(reactElement, container, callback)**: giúp render react element vào DOM.  

Render UI:  
```js
// React
const postItem = React.createElement(
    'div',
    {className: 'post-item'},
    React.createElement('h2', {title: "Học React tại F8"}, 'Học React'),
    React.createElement('p', null, 'Học React từ cơ bản tới nâng cao')
)

// Get root element
const root = document.getElementById('root')

// React-DOM -> Render UI vào #root element
ReactDOM.render(postItem, root)
```
