## 1. useLayoutEffect() hook

1. **Sử dụng**: Khi muốn thực hiện các Side effect.  
2. **Đầu vào**: useEffect() nhận 2 đối số: callback & dependences.  
    ```jsx
    useEffect(callback, [dependences])
    ```  
    - *callback* arg là bắt buộc, được sử dụng để thực hiện các side effect.  
    - *dependences* là optional, là array chứa những sự phụ thuộc về mặt dữ liệu.  
3. So sánh **useEffect()** & **useLayoutEffect()**:  
    - Gần như tương tự nhau, chỉ khác về thứ tự thực hiện các thao tác.  
    - useEffect():  
        1. Cập nhật lại state.  
        2. Cập nhật DOM (mutated DOM).  
        3. Render UI.  
        4. Gọi cleanup nếu dependences thay đổi (async).  
        5. Gọi useEffect callback (async).  
    - useLayoutEffect():  
        1. Cập nhật lại state.  
        2. Cập nhật DOM (mutated DOM).  
        3. Gọi cleanup nếu dependences thay đổi (sync).  
        4. Gọi useEffect callback (sync).  
        5. Render UI.  
    - Tránh lạm dụng useLayoutEffect(), chỉ sử dụng nó trong một số trường hợp gặp vấn đề về Render UI (Khi setState -> check state -> setState), còn lại mặc định sử dụng useEffect().  

**Bài toán**: Ứng dụng đếm số với giá trị bắt đầu từ 0, nếu đếm đến 3 sẽ quay lại đếm từ 0.  

**Vấn đề khi sử dụng useEffect()**: Render UI được thực thi trước callback của useEffect() dẫn đến số 4 được hiển thị trong chớp nhoáng mới hiển thị  về 0 -> Sử dụng useLayoutEffect() để Render UI sau khi callback thực thi.  

```jsx
// Content.js
import { useState, useLayoutEffect } from 'react'

function Content() {
    const [count, setCount] = useState(0)

    useLayoutEffect(() => {
        count > 3 && setCount(0)
    }, [count])

    const handleRun = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={handleRun}>Run</button>
        </div>
    )
}

export default Content
```