## 1. React.useCallback() hook

*Đặt vấn đề*: Khi khởi tạo function trong Parent component & truyền prop là function đó cho Child component thì khi Parent Component bị re-render, Child Component vẫn bị re-render khi không cần thiết dù đã áp dụng React.memo(), điều này xảy ra là do khi re-render một function mới được tạo không cần thiết & được truyền cho Child component. -> Cần sử dụng useCallback.  

1. **Sử dụng**: Giúp tránh tạo các funcion mới không cần thiết trong component khi component bị re-render.  
    - Sử dụng khi muốn truyền prop là một function cho Child Component có sử dụng React.memo().  
    ```jsx
    import { useCallback } from 'react'
    ```
2. **Đầu vào**: useCallback() nhận 2 đối số: callback & dependencies.  
    - *callback* là function mà chúng ta muốn tạo.  
    - *dependencies* là một array chứa sự phụ thuộc về mặt dữ liệu, tức là các biến tham chiếu được sử dụng trong callback có khả năng bị thay đổi sau mỗi lần re-render.  
    ```jsx
    useCallback(callback, [])
    useCallback(callback, dependencies)
    ```
3. **Đầu ra**: useCallback() return một tham chiếu đến function được tạo.  
    ```jsx
    const handleFunc = useCallback(callback, dependencies)
    ```
4. Nguyên lý hoạt động: 
    - Lần đầu tiên Parent Component được mounted, useCallback() nhận callback, khởi tạo function, nhận về tham chiếu & lưu ra ngoài scope của Parent component, return lại tham chiếu đó.  
    - Khi Parent component bị re-render:  
        - **useCallback(callback, [])**: return tham chiếu nhận được khi component mounted.  
        - **useCallback(callback, dependencies)**: nếu các phần tử trong dependencies không thay đổi thì sẽ return tham chiếu trước đó thay vì tạo function mới & return tham chiếu mới.  

**Ví dụ**:  

```jsx
// Content.js
import { memo } from 'react'

function Content({ onIncrease }) {
    return (
        <>
            <h1>Hello!</h1>
            <button onClick={onIncrease}>Start</button>
        </>
    )
}

export default memo(Content)

// App.js
import { useState } from 'react'

function App() {
    const [count, setCount] = useState(0)

    const handleIncrease = () => setCount(count + 1)

    return (
        <div className="App" style={{ padding: 20 }}>
            <h1>{count}</h1>
            <Content onIncrease={handleIncrease} />
        </div>
    )
}

export default App;
```