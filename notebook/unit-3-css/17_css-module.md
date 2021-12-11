## 1. Vấn đề bài toán

- **Vấn đề**: CSS cho một component nhưng lại ảnh hưởng cả đến component khác.  

- **Giải pháp**:  
    - Cách 1: CSS module  
    - Cách 2: **styled** component (library)  


## 2. CSS module

1, **Sử dụng**: Giúp các css file hoạt động độc lập, không bị ảnh hưởng đến nhau.  

-> Khi có nhiều components & css file đi kèm dù đặt trùng CSS selector (id & class) nhưng không bị ảnh hưởng đến nhau.  

2, **Nguyên lý hoạt động**:  

- Project tạo bởi create-react-app đã được tích hợp sẵn webpack & được cấu hình để hỗ trợ CSS module, nó sẽ nhận diện các file '*.module.css*' tiến hành xử lý & export ra một object.  
    - Thực tế là đặt lại selector (id & class) = filename_selector__base64 để không bị trùng selector với components khác.  
    - Các element selector (HTML tag name), universal selector (*) & attribute selector (\[attr=value\]) không thể module hóa, nên vẫn sẽ ảnh hưởng đến component khác -> không sử dụng khi style độc lập cho component.  
- Object được export ra có property là css selector (id & class), chứa selector được đặt lại.  

```jsx
import name from './filename.module.css'

function Component() {
    return <div className={name.selector}>...</div>
}

export default Component
```

3, **Note**:  

- CSS module không có tính kế thừa.  
- Đặt tên css selector theo camel case, không thể chứa ký tự '-' vì khi code JS dấu '-' sẽ bị lỗi.  
- Để style global theo cấu trúc đồng nhất cho toàn bộ ứng dụng, tạo component wrap toàn bộ ứng dụng & style cho component này:  
    >- GlobalStyles  
    >   - index.js
    >   - GlobalStyles.css
    >- App.js

    ```jsx
    // GlobalStyles/index.js
    import './GlobalStyles.css'

    function GlobalStyles({ children }) {
        return children
    }

    export default GlobalStyles

    // App.js
    import GlobalStyles from './components/GlobalStyles'

    function App() {
        return (
            <GlobalStyles>
                <div className="selector">...</div>
            </GlobalStyles>
        )
    }

    export default App
    ```


#### ==== Bài toán ====

- Cấu trúc thư mục:  
    >- components  
    >   - Heading  
    >       - index.js  
    >       - Heading.module.css  
    >   - Paragraph  
    >       - index.js  
    >       - Paragraph.module.css  
    >   - GlobalStyles
    >       - index.js
    >       - GlobalStyles.css
    >- App.js  

- CSS cho child components:  
    ```css
    /* Heading.module.css */
    .heading {
        color: green;
    }

    #test {
        text-decoration: underline;
    }

    /* Paragraph.module.css */
    .paragraph {
        color: red;
    }
    ```

- Child components:  
    ```jsx
    import styles from './Heading.module.css'

    function Heading() {
        return (
            <h1
                className={styles.heading}
                id={styles.test}
            >
                Hello everybody!
            </h1>
        )
    }

    export default Heading

    // components/Paragraph/index.js
    import styles from './Paragraph.module.css'

    function Paragraph() {
        return (
            <p className={styles.paragraph}>
                Waiting for update signal from WDS...
            </p>
        )
    }

    export default Paragraph
    ```
    
- Style cho toàn bộ ứng dụng:  
    - CSS file:  
        ```css
        /* GlobalStyles.css */
        .d-flex {
            display: flex;
        }
        ```  
    - Global component:  
        ```jsx
        import './Global-Styles.css'

        function GlobalStyles({ children }) {
            return children
        }

        export default GlobalStyles
        ```  

- Parent component:  
    ```jsx
    // App.js
    import Heading from './components/Heading'
    import Paragraph from './components/Paragraph'

    function App() {
        return (
            <GlobalStyles>
                <div style={{padding: '0 32px'}}>
                    <Heading />
                    <Paragraph />
                </div>
                <div className="d-flex">
                    <div>Item 1</div>
                    <div>Item 2</div>
                </div>
            </GlobalStyles>
        )
    }

    export default App
    ```  


## 3. Sử dụng nhiều class

Giá trị của thuộc tính className phải là một string:  

```jsx
import name from './filename.module.css'

function Component() {
    return (
        <div className={
            `${name.className1} ${name.className2} ...`
        }>
            ...
        </div>
        
        <div className={
            [name.className1, name.className2, ...].join(' ')
        }>
            ...
        </div>
    )
}

export default Component
```

Sử dụng libraries hỗ trợ giúp code rõ ràng hơn & dễ dàng xử lý class động (dynamic - thêm class tùy thuộc vào điều kiện logic): **classnames** hoặc **clsx**.  


## 4. clsx library  

clsx là một function component:  
```jsx
clsx(...args)
```

1, **Đầu vào**: clsx() nhận các đối số:  

- là string nếu thêm class cố định.  
    ```jsx
    clsx(className1, className2, ...)
    ```
- là object có các property là string className & mang giá trị boolean quyết định có thêm className hay không tùy vào logic.  
    ```jsx
    clsx({
        className1: boolean, 
        className2: boolean, 
        ...
    })
    ```

2, **Sử dụng**:  

- Giúp sử dụng nhiều class:  
    ```jsx
    import clsx from 'clsx'
    import name from './filename.module.css'

    function Component() {
        return (
            <div className={clsx(
                name.className1, 
                name.className2, 
                ...
            )}>
                ...
            </div>
        )
    }
    
    export default Component
    ```

- Giúp xử lý dynamic class tùy vào logic condition:  
    ```jsx
    import clsx from 'clsx'
    import name from './filename.module.css'

    function Component() {
        return (
            <div className={clsx(name.className1, {
                [name.className2]: boolean,
                ...
            }, ...)}>
                ...
            </div>
        )
    }
    
    export default Component
    ```

#### ==== Bài toán ====

**Ví dụ**: Nút hiển thị với màu primary, danger, ... tùy thuộc vào prop truyền sang.  

1, Cấu trúc thư mục:  

>- components
>   - Button
>       - index.js
>       - Button.module.css
>- App.js

2, Style cho button:  

```css
/* Button.module.css */
.btn {
    padding: 4px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.primary {
    color: #fff;
    background-color: #0d6efd;
}
```  

3, Button component:  

```jsx
// components/Button
import clsx from 'clsx'
import styles from './Button.module.css'

function Button({ primary }) {

    const classes = clsx(styles.btn, { [styles.primary]: primary })

    return (
        <button className={classes}>
            Click me!
        </button >
    )
}

export default Button
```

4, App component:  

```jsx
// App.js
import Button from './components/Button'
import GlobalStyles from './components/GlobalStyles'

function App() {
    return (
        <GlobalStyles>
            <div style={{ padding: '10px 32px' }}>
                <Button />
                <Button primary />
            </div>
        </GlobalStyles>
    )
}

export default App
```  

5, **Kết hợp global style**:  

```jsx
// components/Button
import clsx from 'clsx'
import styles from './Button.module.css'

function Button({ primary }) {

    const classes = clsx(
        styles.btn, 
        'd-flex', 
        { [styles.primary]: primary }
    )

    const classes = clsx(styles.btn, { 
        [styles.primary]: primary,
        'd-flex': true 
    })

    return (
        <button className={classes}>
            Click me!
        </button >
    )
}

export default Button
```
