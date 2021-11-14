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


## 7. React element types  

React hỗ trợ các element types: string (HTML tag name), function/class.  

Một số element types khác như: React.Fragment, React.StricMode  

React hỗ trợ element type function / class nhằm chia components, bóc tách ứng dụng lớn thành nhiều thành phần nhỏ, rồi sau đó ráp lại thành ứng dụng hoàn chỉnh. -> Code sẽ clean hơn, ngắn gọn hơn, logic nghiệp vụ cũng được chia rõ ràng hơn & tái sử dụng được code.  

#### ==== Component ====

Component gồm: function component & class component.  
Component cũng có thể là string đại diện HTML tag name.  

```jsx
// function component
function Header() {
    return <div className="header">Header</div>
}

// class component
class Content extends React.Component {
    render() {
        return <div className="content">Content</div>
    }
}

// string component
const Component = "div"

// JS
const _app = React.createElement(
    "div",
    { className: "wrapper" },
    React.createElement(Header, null),  // element type: function
    React.createElement(Content, null), // element type: class
    React.createElement(
        Component,                      // element type: string
        { className: "footer" },
        "Footer"
    )
);

// JSX
const app = (
    <div className="wrapper">
        <Header />
        <Content />
        <Component className="footer">Footer</Component>
    </div>
)

ReactDOM.render(app, document.getElementById('root'))
```  

**Note**: Một số built-in component mà React hỗ trợ:  

- **React.Fragment**: Component giúp wrap nhiều element bên trong mà không tạo ra container dư thừa trong DOM nhưng vẫn đúng cấu trúc.  
- **React.StricMode**: Component chỉ hoạt động ở môi trường development giúp verify code đưa ra cảnh báo cho những tình huống code xấu (về performence hay cách triển khai) nên sẽ luôn render 2 lần.  

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


## 8. props  

**props** là object chứa những attributes & children (content) mô tả React element tạo ra.  

### 1,  === Truyền props === 

- **attribute props**: Giống như attribute của HTML tag.  
    - Dạng chuỗi:  
        ```jsx
        <Component propName="string literals" /> 
        ```  
    - Dạng expression:  
        ```jsx
        <Component propName={expression} />
        ```
    - Không gán giá trị: Mặc định prop sẽ mang giá trị Boolean **true**.  
        ```jsx
        <Component propName />
        ```

    **Các quy ước đặt prop name**:  

    - Built-in HTML tag elements:  
        - Prop name phải tuân theo các quy ước có sẵn: id, alt, ...  
        - Các props khác biệt: class => className, for (\<label\>) => htmlFor.  
    - Custom component:  
        - Prop name có thể đặt tự do.  
    
    **Note**:  

    - **key** là prop đặc biệt, chỉ truyền cho các react element đặt trong array được render vào DOM.  
    - **ref** là prop đặc biệt, được React thiết kế với mục đích:  
        - Khi truyền ref cho element có thể tham chiếu đến element đó trong DOM.  
        - khi truyền ref cho function component có thể forward (chuyển tiếp) đến component đó (không thể nhận ref qua props).  
    - Prop có thể là bất cứ kiểu dữ liệu nào.  

- **children prop**: Giống như content của HTML tag.    
    - Dạng chuỗi:  
        ```jsx
        <Component>string literals</Component> 
        ```  
    - Dạng expression:  
        ```jsx
        <Component>{expression}</Component>
        ```  
        - Expression có giá trị Boolean, undefined & null sẽ không được render, nhằm kết hợp toán tử logic để render theo điều kiện.  

### 2,  === Nhận props ===  

- props là argument thứ 1 của Component.  
    ```jsx
    function Component(props) {
        ... props.propName ...
        ... props.children ...
        return ...
    }
    ```  
- Sử dụng destructuring để có thể đặt default value.  
    ```jsx
    function Component ({propName = defaultValue, children}) {
        ... props.propName ...
        ... props.children ...
        return ...
    }
    ```

#### ==== Truyền attribute props ====

```jsx
function Input({ label, ...inputProps }) {
    return (
        <div>
            <label htmlFor={inputProps.id}>{label}</label>
            <input {...inputProps} />
        </div>
    )
}

function App() {
    return (
        <div id="wrapper">
            <Input
                label="Fullname"
                type="checkbox"
                id="fullname"
                name="fullname"
                placeholder="Enter name ..."
            />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
```  

**Bài toán**: Hiển thị danh sách bài posts**.  

```jsx
// API
const items = [
    {
        id: "1",
        title: "C#(.NET) - Tương tác với file Excel",
        image: "https://cdn.fullstack.edu.vn/f8-learning/blog_posts/311/6147eea9cef9c.png",
        description: "Bạn có kiến thức ngôn ngữ C#! Bạn muốn thực hiện tương tác với file excel.",
        publishedAt: "Một ngày trước - 5 phút đọc"
    },
    {
        id: "2",
        title: "Xin chào những thành viên của F8 ạ",
        image: "https://cdn.fullstack.edu.vn/f8-learning/blog_posts/1103/617cd56a23685.png",
        description: "Gánh nặng tuổi 18.",
        publishedAt: "11 giờ trước - 1 phút đọc"
    }
]

// PostItem.js
function PostItem ({ item = {} }) {
    return (
        <div className="post-item">
            <img src={item.image} alt={item.title} style={{ maxWidth: "400px" }} />
            <h2 className="post-title">{item.title}</h2>
            <p className="post-desc">{item.description}</p>
            <p className="post-published">{item.publishedAt}</p>
        </div>
    )
}

// App.js
const App = () => (
    <div id="wrapper">
        {items.map(item => (
            <PostItem
                key={item.id}
                item={item}
            />
        ))}
    </div>
)

// index.js
ReactDOM.render(<App />, document.getElementById('root'))
```  

#### ==== Truyền attribute prop mà không gán giá trị ====

```jsx
function Span({ display }) {
    return <span>{display && "Hello!"}</span>
}

function App() {
    // prop display mặc định mang giá trị Boolean true
    return (
        <div id="wrapper">
            <Span display />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
```  

#### ==== Truyền children props ====

```jsx
function Span({ children }) {
    return <span>{children}</span>
}

function App() {
    return (
        <div id="wrapper">
            <Span>Hello!</Span>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
```  

**Bài toán**: Render prop - children prop là function  

```jsx
function List({ data, children }) {
    return (
        <ul>
            {data.map(children)}
            {data.map((...args) => children(...args))}
        </ul>
    )
}

function App() {
    const cars = ['BMW', 'Honda', 'Mazda']
    return (
        <div id="wrapper">
            <List data={cars}>
                {(item, index) => <li key={index}>{item}</li>}
            </List>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
```  

**Bài toán**: In lời chào, Render theo điều kiện  

```jsx
function App() {
    let firstAccess = true

    // Render theo điều kiện
    return (
        <div id="wrapper">
            {firstAccess && <h1>Welcome to F8</h1>}
        </div>
    )
}

function App({title}) {
    // Render theo điều kiện
    return (
        <div id="wrapper">
            <h1>{title || 'Welcome to F8'}</h1>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
```  


## 9. DOM events  

Tên các event của React tuân thủ theo camel case như: onClick, onDoubleClick, ...  

```jsx
const App = () => (
    <div id="wrapper">
        <button 
            onClick={e => console.dir(e.target)}
        >
            Click me!
        </button>
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
```  

**Note**: Khi child component là UI component, KHÔNG viết code xử lý ở child component, mà sẽ nhận các function xử lý event đước truyền qua props.  

```jsx
// PostItem.js
function PostItem({ item = {}, onClick = () => {} }) {
    return (
        <div className="post-item">
            <img src={item.image} alt={item.title} style={{ maxWidth: "400px" }} />
            <h2
                className="post-title"
                onClick={() => onClick(item)}
            >
                {item.title}
            </h2>
            <p className="post-desc">{item.description}</p>
            <p className="post-published">{item.publishedAt}</p>
        </div>
    )
}

// App.js
const App = () => {

    // useCallback -> tối ưu performance
    const handleClick = (item) => {
        console.log(item)
    }

    return (
        <div id="wrapper">
            {items.map(item => (
                <PostItem
                    key={item.id}
                    item={item}
                    onClick={handleClick}
                />
            ))}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
```  


## 10. Quy ước đặt tên component  

Khi đặt tên component luôn viết hoa chữ cái đầu, nếu do nhiều từ tạo thành thì viết hoa tất cả các chữ cái đầu của các từ.  

**Bài toán**: Hiển thị input của form  
```jsx
const Form = {
    Input() {
        return <input />
    },
    Checkbox() {
        return <input type="checkbox" />
    }
}

const App = () => (
    <div id="wrapper">
        <Form.Checkbox />
    </div>
)

const App = () => {
    const type = 'Input'
    const Component = Form[type]
    return (
        <div id="wrapper">
            <Component />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
```  

**Note**: Component có thể là string HTML tag name.  

**Bài toán**: Xử lý event của button & link -> Sử dụng trong **thống kê**  

```jsx
function Button({ title, href, onClick }) {
    let Component = 'button'
    const props = {}

    if (href) {
        Component = 'a'
        props.href = href
    }

    if (onClick) {
        props.onClick = onClick
    }

    return (
        <Component {...props}>{title}</Component>
    )
}

const App = () => {
    const handleClick = () => {
        console.log(Math.floor(Math.random() * 100));
    }

    return (
        <div id="wrapper">
            <Button
                title="Click me!"
                href="https://fullstack.edu.vn"
                onClick={handleClick}
            />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
```   