## 1. SPA & MPA

Là các phương pháp triển khai website:  

- SPA (single-page application) hay CSR.  
    - Không yêu cầu tải lại trang trong quá trình sử dụng.  
    - Phần lớn tài nguyên được tải trong lần đầu.  
    - Chỉ tải dữ liệu mới khi cần.  
- MPA (multi-page application) hay SSR.  
    - Yêu cầu tải lại trang trong quá trình sử dụng (eg: click vào các link).  
    - Luôn tải lại toàn bộ trang khi truy cập & chuyển hướng.  

Tốc độ: SPA có tốc độ nhanh hơn MPA, nhưng lần đầu tải sẽ chậm hơn.  
SEO: SPA không thân thiện với SEO (Search engine optimization) bằng MPA.  
UX: SPA cho trải nghiệm tốt hơn MPA nhất là trên mobile.  
Phát triển: SPA dễ dàng tái sd code (component) hơn MPA. SPA bóc tách code FE & BE.  
Performance: SPA giúp giảm tải cho server.  


## 2. ReactJS  

Là thư viện JS sử dụng để xây dựng user interface.  

ReactJS là một trong những thư viện tạo ra SPA.  

**Note**: React sử dụng các DOM method xây dựng sẵn của JS.  

React's office document: https://reactjs.org/.  

Github là nơi lưu trữ mã nguồn gốc (mã nguồn gốc build ra sản phẩm).  
NPM là nơi lưu trữ thư viện được xây dựng từ mã nguồn gốc.  
UNPKG giúp lấy thư viện lưu trữ tại NPM dưới dạng CDN.  


## 3. Thêm React CDN vào website

```html
<script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
```

Sau khi thêm library sẽ có một biến global là obj **React** gồm các property & method làm việc với React.  


## 4. createElement()  

**document.createElement()**: Tạo mới một DOM element node (node là thành phần nhỏ nhất trong DOM).  

**React.createElement()**: Tạo mới một React element là thành phần nhỏ nhất khi làm việc với React.  

> **React.createElement(type, props, ...childrens)** trong đó:  
> - type: kiểu element.  
> - props: các attributes của element.
> - childrens: các content bên trong element; có thể là:
>   string (child text node), object (child element node), array (array of child node), ...
>
> Method return object có các property:  
> - type, 
> - props (object có properties gồm các attributes & children chứa content [string or object or array]), 
> - ...

**Note**: https://jsfiddle.net hoặc https://codepen.io viết code online.  

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

// React-DOM -> Render UI
ReactDOM.render(postItem, root)
```


## 6. JSX  

JSX là Javascript XML; hỗ trợ viết XML, HTML trong file JS.  

ReactDOM.render() chỉ có thể render react element vào DOM, không thể render JSX. Vì vậy cần sử dụng **babel** JS library để phân tích & chuyển đổi cú pháp JSX thành JS.  

Thêm CDN babel vào website:  
```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<script type="text/babel">
    // JSX code
</script>
```  

Mặc định **script** tag có **type="text/javascript"** sẽ thực thi JS, nên sẽ gây lỗi khi thực thi JSX, cần đổi **type="text/babel"** để có thể thực thi JSX.  

Nguyên tắc hoạt động của Babel: Khi Babel CDN được nhúng vào thì khi DOM load xong, sẽ tìm trong DOM các script tag type="text/babel", phân tích content & chuyển đổi cú pháp babel hỗ trợ, rồi đẩy code đã chuyển đổi cho browser.  

**Note**: Khi muốn viết bất cứ JS code xen lẫn vào JSX, sử dụng **{}** gói lại JS code.  

**Note**: Thường gặp khi sử dụng **Babel** để chuyển đổi cú pháp JS ES6+ trong project thành ES5 nhằm hỗ trợ browser phiên bản cũ chạy JS không hỗ trợ JS ES6+.  

```jsx
const reactCourse = 'ReactJS'

// JS
const ulReact = React.createElement(
    'ul',
    {className: "courses-list"},
    React.createElement('li', { style: {color: "#f00"} }, 'Javascript'),
    React.createElement('li', { style: "color: #0f0;" }, reactCourse)
)

// JSX
const ul = <ul className="courses-list">
    <li style={ {color: "#f00"} }>Javascript</li>
    <li style="color: #0f0;">{reactCourse}</li>
</ul>

// ========= Ví dụ: Render array =========
const courses = [
    { name: "HTML & CSS" },
    { name: "Responsive web design" },
    { name: "ReactJS" }
]

// JS
const _coursesList = React.createElement(
    'ul', 
    null, 
    courses.map(course => React.createElement('li', null, course.name))
)

// JSX
const coursesList = (
    <ul>
        {courses.map((course, index) => <li key={index}>{course.name}</li>)}
    </ul>
)

// React-DOM
ReactDOM.render(coursesList, document.getElementById('root'))
```

**<React.Fragment>** giúp wrap nhiều element bên trong mà không tạo ra div container dư thừa trong DOM mà vẫn đúng cấu trúc.  
```jsx
// JS
const js = React.createElement(
    React.Flagment,
    null,
    React.createElement('h1', null, 'Heading 1'),
    React.createElement('h2', null, 'Heading 2')
)

// JSX
const jsx = (
    <React.Fragment>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
    </React.Fragment>
)
```  


## 7. React element types  

React hỗ trợ các element types: string (HTML tag name), function / class.  

React hỗ trợ function / class nhằm chia components, bóc tách ứng dụng lớn thành nhiều thành phần nhỏ, rồi sau đó ráp lại thành ứng dụng hoàn chỉnh. -> Code sẽ clean hơn, ngắn gọn hơn, logic nghiệp vụ cũng được chia rõ ràng hơn & tái sử dụng được code.  

Sử dụng function / Class để tạo component, các component này sẽ được gọi là function component hay class component.  

Hooks ra đời hỗ trợ function component với nhiều tính năng vượt trội, nhưng class component vẫn có những ưu điểm như tính kế thừa của class ES6.  