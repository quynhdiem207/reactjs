## 1. React.memo() HOC  

memo() là một Higher Order Component (HOC) - component bậc cao wrap lại component.  

**Tình huống**: Parent Component bị re-render mỗi khi setState, nhưng Child Component không hề phụ thuộc vào state bị thay đổi của Parent Component mà vẫn re-render mỗi khi Parent Component re-render, điều này làm giảm performance -> Sử dụng memo() cho Child Component.  

1. **Sử dụng**: Xử lý component để tránh re-render không cần thiết nhằm tối ưu performance.  
    ```jsx
    import { memo } from 'react'
    ```
2. **Đầu vào**: memo() nhận argument là một component, *eg*: memo(App).  
    ```jsx
    memo(Component)
    ```  
3. Nguyên lý hoạt động: memo() dùng toán tử === để check các props của component được truyền làm argument sau mỗi lần re-render để quyết định có re-render hay không, nếu ít nhất một props thay đổi sẽ re-render, nếu không có props nào thay đổi sẽ không re-render.  
    ```jsx
    // Parent component
    import Child from './Child'
    
    function Parent() {
        return (
            ...
            <Child />
            ...
        )
    }

    // Child component
    import { memo } from 'react'

    function Child() {
        return ...
    }

    export default memo(Child)
    ```

**Note**: Tránh lạm dụng memo(), chỉ sử dụng khi Parent component quá phức tạp mới sử dụng để tránh mỗi lần re-render sẽ re-render tất cả các Chilren Component làm giảm performance.  

**Ví dụ**:  
```jsx
// Content.js
import { memo } from 'react'

function Content() {
    return <h1>Hello!</h1>
}

export default memo(Content)

// App.js
import { useState } from 'react'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App" style={{ padding: 20 }}>
            <h1>{count}</h1>
            <Content />
            <button onClick={() => setCount(count + 1)}>Start</button>
        </div>
    )
}

export default App;
```