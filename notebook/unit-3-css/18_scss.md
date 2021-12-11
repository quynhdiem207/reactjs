## 1. SCSS

Project được tạo bởi create-react-app đã được cấu hình hỗ trợ cả CSS & SCSS.  

Do browser không hiểu SCSS, nên cần cài **sass** library để webpack có thể compile SCSS thành CSS.  

*Ví dụ*:  

```scss
// Button.module.scss
.btn {
    padding: 4px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    user-select: none;

    &:hover {
        opacity: 0.9;
        cursor: pointer;
    }
}
```


## 2. Ví dụ

**Bài toán**: Tạo nút disabled

- Cấu trúc thư mục:  
    >- components
    >   - Button
    >       - index.js
    >       - Button.module.scss
    >- App.js

- Style cho button:  
    ```scss
    /* Button.module.scss */
    .btn {
        padding: 4px 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .primary {
        color: #fff;
        background-color: #0d6efd;
    }

    .disabled {
        opacity: 0.5;
        pointer-events: none; 
    }
    ```  

- Button component:  
    ```jsx
    // components/Button
    import clsx from 'clsx'
    import styles from './Button.module.scss'

    function Button({ primary, disabled }) {

        const classes = clsx(styles.btn, { 
            [styles.primary]: primary, 
            [styles.disabled]: disabled, 
        })

        return (
            <button className={classes}>
                Click me!
            </button >
        )
    }

    export default Button
    ```

- App component:  
    ```jsx
    // App.js
    import Button from './components/Button'
    import GlobalStyles from './components/GlobalStyles'

    function App() {
        return (
            <GlobalStyles>
                <div style={{ padding: '10px 32px' }}>
                    <Button />
                    <Button primary disabled />
                </div>
            </GlobalStyles>
        )
    }

    export default App
    ```  
