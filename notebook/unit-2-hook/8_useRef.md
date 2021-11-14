## 1. React.useRef() hook  

1. **Sử dụng**: tạo biến lưu các giá trị bất kỳ qua một tham chiếu bên ngoài phạm vi của function component để mỗi lần component re-render sẽ không set lại biến.  
    ```jsx
    import { useRef } from 'react'
    ```
2. **Đầu vào**: useRef() có một parameter initValue là initial value cho biến với default value là undefined, chỉ sử dụng trong lần đầu tiên component mounted.  
    - Khi không truyền argument, initValue là undefined.  
    - Khi truyền argument là có giá trị value, initValue là value.  
    ```jsx
    useRef() // biến được khởi tạo với giá trị undefined
    useRef(value) // biến được khởi tạo với giá trị value   
    ```  
3. **Đầu ra**: useRef() return object có current property giữ giá trị của biến.  
    ```jsx
    const varName = useRef(initValue)
    console.log(varName.current) // initValue

    // Gán lại giá trị cho biến
    varName.current = value
    console.log(varName.current) // value
    ```  

**Note**: 

- Khi muốn lấy giá trị state trước đó, sử dụng **useRef()** kết hợp với **useEffect(callback, \[state\])**.  
    ```jsx
    function App() {
        const [state, setState] = useState()
        const prevState = useRef()

        useEffect(() => {
            prevState.current = state
        }, [state])
    }
    ```  
- Khi muốn select react element trong DOM sử dụng **useRef()** & truyền attribute prop **ref** cho react element đó.  
    ```jsx
    function App() {
        const element = useRef()
        return <tag ref={element}>Text</tag>
    }
    ```


## 2. Môt số bài toán

**Bài toán**: Khi ấn nút start thì thời gian bắt đầu đếm ngược từ 60 giây. Khi ấn stop thì dừng lại, start thì tiếp tục.  

```jsx
import { useState, useRef } from 'react'

function App() {
    const [count, setCount] = useState(60)
    const timerId = useRef()

    const handleStart = () => {
        timerId.current = setInterval(() => {
            setCount(prevState => prevState - 1)
        }, 1000)
    }

    const handleStop = () => {
        clearInterval(timerId.current)
    }

    return (
        <div className="App" style={{ padding: 20 }}>
            <h1>{count}</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </div>
    )
}

export default App;
```

**Bài toán**: Lấy ra giá trị trước đó của state.  

```jsx
import { useState, useEffect, useRef } from 'react'

function App() {
    const [count, setCount] = useState(0)
    const prevCount = useRef()

    useEffect(() => {
        prevCount.current = count
    }, [count])

    console.log(prevCount.current);

    return (
        <div className="App" style={{ padding: 20 }}>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Start</button>
        </div>
    )
}

export default App;
```

**Bài toán**: Lấy ra element trong DOM & tọa độ của nó.  

```jsx
import { useState, useEffect, useRef } from 'react'

function App() {
    const [count, setCount] = useState(0)
    const h1 = useRef()

    useEffect(() => {
        // Lấy tọa độ của thẻ h1 lưu tại h1.current
        const rect = h1.current.getBoundingClientRect()
        console.log(rect);
    })

    return (
        <div className="App" style={{ padding: 20 }}>
            <h1 ref={h1}>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Start</button>
        </div>
    )
}

export default App;
```