## 1. React.createContext()

*Đặt vấn đề*: Trong thực tế các component có thể lồng nhau nhiều cấp, việc truyền dữ liệu qua props từ Parent component sang các Grandchild component sẽ gặp khó khăn.  

React đã cung cấp sẵn một methed **React.createContext()** để tạo Context, giúp đơn giản hóa việc truyền dữ liệu từ Parent component sang Child components mà không cần sử dụng props, không cần truyền props qua component trung gian nếu component trung gian không sử dụng props này.  

*Ví dụ*: A -> B -> C : Khi muốn truyền dữ liệu từ component A sang component C mà component B không cần dữ liệu này, có thể sử dụng context -> Không cần truyền props trung gian qua component B.  

1. **Sử dụng**: Tạo context (ngữ cảnh - phạm vi để có thể truyền data trong phạm vi đó).  
    *Ví dụ*: Tạo context ở component A, wrap lại cả component A, lúc này có thể truyền data từ component A xuống bất cứ Descendant component nào của A.  
    ```jsx
    import { createContext } from 'react'
    ```  

    **Note**: Để có thể truyền dữ liệu Context sử dụng Provider để cung cấp dữ liệu từ Parent Component, & Consumer để Child component có thể nhận dữ liệu.  

2. **Đầu ra**: createContext() trả về một object có Provider & Consumer là các React components.  
    ```jsx
    const ContextName = createContext()

    function Component() {
        return (
            <ContextName.Provider value={data}>
                ... <ChildComponent />
            </ContextName.Provider>
        )
    }
    ```  


## 2. React.useContext() hook  

1. **Sử dụng**: Nhận dữ liệu được truyền từ Parent component sử dụng context.  
    ```jsx
    import { useContext } from 'react'
    ```
2. **Đầu vào**: useContext() nhận 1 đối số là context sử dụng trong Parent component.  
3. **Đầu ra**: useContext() trả về dữ liệu truyền từ Parent component.  
    ```jsx
    function ChildComponent() {
        const data = useContext(ContextName)
        return ...
    }
    ```


## 3. Ví dụ

**Bài toán**: Tạo theme cho phép chuyển chế độ Dark / light.  

1. Cấu trúc thư mục:  
    >- contexts
    >   - ThemeContext.js
    >- components
    >   - Paragraph.js
    >   - Content.js
    >   - App.js  
    >   - App.css
    >- index.js  

2. Viết CSS cho theme dark:  
    ```css
    /* --- components/App.css --- */
    .dark {
        color: #fff;
        background-color: #333;
    }
    ```

3. Tạo context & Provider truyền data:  
    ```jsx
    // contexts/ThemeContext.js
    import { useState, createContext } from 'react'

    const ThemeContext = createContext()

    function ThemeProvider({children}) {
        const [theme, setTheme] = useState('dark')

        const toggleTheme = () => {
            setTheme(theme === 'dark' ? 'light' : 'dark')
        }

        return (
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        )
    }

    export { ThemeContext, ThemeProvider }
    ```

4. Child components nhận data truyền từ parent component:  
    ```jsx
    // components/Paragraph.js
    import { useContext } from 'react'
    import { ThemeContext } from '../Contexts/ThemeContext'

    function Paragraph() {
        const themeContext = useContext(ThemeContext)

        return (
            <p className={themeContext.theme}>
                Context provides a way to pass data through the component tree without having to pass props down manually every level.
            </p>
        )
    }

    export default Paragraph

    // components/Content.js
    import Paragraph from './Paragraph'

    function Content() {
        return (
            <div>
                <Paragraph />
            </div>
        )
    }

    export default Content
    ```

5. Parent component:  
    ```jsx
    // components/App.js
    import { useContext } from 'react'
    import { ThemeContext } from '../contexts/ThemeContext'
    import Content from './Content'
    import './App.css'

    function App() {
        const themeContext = useContext(ThemeContext)

        return (
            <div style={{ padding: 20 }}>
                <button onClick={themeContext.toggleTheme}>Toggle theme</button>
                <Content />
            </div>
        )
    }

    export default App
    ```

6. index.js (entry point):
    ```jsx
    // index.js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/App';
    import { ThemeProvider } from './contexts/ThemeContext'

    ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
    );
    ```