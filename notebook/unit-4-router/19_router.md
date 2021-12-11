## 1. react-router-dom library

react-router-dom là thư viện tạo nên cơ chế định tuyến nội bộ cho những ứng dụng được viết bởi ReactJS, cho phép di chuyển giữa các trang nằm trong 1 website.  


## 2. BrowserRouter component

**BrowserRouter** component của react-router-dom bao bọc toàn bộ ứng dụng để tạo nên cơ chế routing cho toàn bộ website.  

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
```


## 3. Route component

**Route** component của react-router-dom giúp định nghĩa 1 route của website.  

```jsx
import { Route } from 'react-router-dom'
```

**Route** component nhận các props:  
>- path: Định nghĩa route path.  
>- element: chứa react element của page.  

Khi truy cập URL khớp với route path sẽ render ra element.  

```jsx
<Route path="/" element={<Page />} />
```


## 4. Routes component

**Routes** component của react-router-dom bao lại tất cả các route trong ứng dụng.  

```jsx
import { Routes } from 'react-router-dom'
```

Khi truy cập 1 page, nó sẽ đọc path trên browser & đối chiếu với các route paths, khớp với path nào sẽ render ra element tương ứng.  

```jsx
<Routes>
    <Route path="/" element={<Page />} />
    ...
</Routes>
```


## 5. Link component

**Link** component của react-router-dom giúp tạo các liên kết để di chuyển sang 1 page nội bộ khác của website.  

```jsx
import { Link } from 'react-router-dom'
```

**Link** component nhận các props:  
>- to: Định nghĩa target path muốn điều hướng đến.  

```jsx
<Link to="/">Page</Link>
```

Các liên kết được tạo bởi **Link** component khi được đưa vào DOM là các thẻ \<a\> đã được loại bỏ các hành vi mặc định & thực thi logic chuyển trang riêng của nó tạo nên sự mượt mà của SPA.  

**Note**: Nếu muốn điều hướng đến 1 page nằm ngoài website, sẽ dùng \<a\> tag thay vì dùng **Link** component.  

```jsx
<a href="https://..." />
```


## === Ví dụ ===

Cấu trúc thư mục:  
>- pages
>   - Home.js
>   - News.js
>   - Contact.js
>- App.js
>- index.js

1, Định nghĩa content của các Pages trong website:  

```jsx
// Home.js
function Home() {
    return (
        <h1>Home Page</h1>
    )
}

export default Home

// News.js
function News() {
    return (
        <h1>News Page</h1>
    )
}

export default News

// Contact.js
function Contact() {
    return (
        <h1>Contact Page</h1>
    )
}

export default Contact
```

2, App component:  

```jsx
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/Home'
import NewsPage from './pages/News'
import ContactPage from './pages/Contact'

function App() {
    return (
        <div className="app">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/news">News</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </div>
    )
}

export default App
```

3, Entry point index.js:  

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
```