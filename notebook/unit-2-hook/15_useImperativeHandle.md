## 1. React.forwardRef() HOC

1. **Sử dụng**: Là một Higher Order Component của React giúp chuyển tiếp ref xuống cho Child component.  
    ```jsx
    import { forwardRef } from 'react'
    ```

2. **Đầu vào**: forwardRef() nhận argument là một Component.  
    ```jsx
    forward(ChildComponent)
    ```  

3. Nguyên lý hoạt động:  
    forwardRef nhận prop **ref** do Parent component truyền, xử lý & khi nó gọi Child Component sẽ truyền ref đã nhận làm argument thứ 2. Khi Child được mounted vào DOM sẽ lấy element được tham chiếu lưu vào biến ref.  

    ```jsx
    // Parent component
    import { useRef } from 'react'
    import Child from './Child'

    function Parent() {
        const ref = useRef()

        return (
            ...
            <Child ref={ref} />
            ...
        )
    }

    // Child component
    import { forwardRef } from 'react'

    function Child(props, ref) {
        return (
            ...
            <tagName ref={ref} />
            ...
        )
    }

    export default forwardRef(Child)
    ```


## 2. React.useImperativeHandle() hook

*Đặt vấn đề*: Sử dụng *forwardRef* để tham chiếu đến element của child component từ bên ngoài làm mất đi tính đóng gói (private) của component & có thể phá hỏng child component (eg: xóa element).  

-> Sử dụng useImperativeHandle() trong Child component để giới hạn những thao tác mà parent component có thể làm với element được tham chiếu của child component.  

1. **Sử dụng**: Giúp tùy chỉnh ref của một function component.  
    ```jsx
    import { useImperativeHandle } from 'react'
    ```  

2. **Đầu vào**: useImperativeHandle() nhận 2 đối số: ref & callback.  
    - *ref*: Tham chiếu được forward từ Parent component.  
    - *callback*: Return object mà sẽ được tham chiếu đến bởi ref.  
    **Note**: Sẽ không trực tiếp tham chiếu đến elementmà gián tiếp qua object trả về bởi callback.  
    ```jsx
    useImperativeHandle(ref, callback)
    ```

## 3. Ví dụ

**Bài toán**: Trình phát video.  

```jsx
// Video.js
import { forwardRef, useImperativeHandle, useRef } from 'react'
import video1 from './videos/video-1.mp4'

function Video(props, ref) {
    const videoRef = useRef()

    useImperativeHandle(ref, () => ({
        play() {
            videoRef.current.play()
        },
        pause() {
            videoRef.current.pause()
        }
    }))

    return (
        <video
            ref={videoRef}
            src={video1}
            style={{ maxHeight: 500 }}
        />
    )
}

export default forwardRef(Video)

// App.js
import { useRef } from 'react'
import Video from './Video'

function App() {
    const videoRef = useRef()

    const handlePlay = () => {
        videoRef.current.play()
    }

    const handlePause = () => {
        videoRef.current.pause()
    }

    return (
        <div style={{ padding: "0 20px" }}>
            <Video ref={videoRef} />
            <button onClick={handlePlay}>Play</button>
            <button onClick={handlePause}>Pause</button>
        </div>
    )
}

export default App
```