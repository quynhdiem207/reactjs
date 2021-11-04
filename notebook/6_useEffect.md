## 1. Mounted / Unmounted

- Mounted (gắn vào) là thời điểm đưa component vào sử dụng.  
- Unmounted (gỡ ra) là thời điểm gỡ component ra không sử dụng nữa.  

**Ví dụ**: Có 2 component Content & App, khi ấn toggle button thì Content sẽ được mounted vào App hoặc unmounted khỏi App.  

```jsx
// Content.js
function Content() {
    return <h1>Welcom to F8</h1>
}

export default Content

// App.js
import { useState } from 'react'
import Content from './Content'

function App() {
    const [show, setShow] = useState(false)

    return (
        <div className="App" style={{ padding: 20 }}>
            <button onClick={() => setShow(!show)}>Toggle</button>
            {show && <Content />}
        </div>
    )
}

export default App
```


## 2. useEffect() hook

1. **Sử dụng**:  Khi muốn thực hiện các Side effect.  
    *Side effect* đề cập đến tác động xảy ra với một chương trình phần mềm dẫn tới dữ liệu của chương trình bị thay đổi.  

    > useEffect giúp:  
    >   - Update DOM  
    >   - Call API  
    >   - Listen DOM event / Subcribe  
    >   - Cleanup:  
    >       - Remove listener / Unsubcribe 
    >       - Clear timer

    Tại sao phải sử dụng useEffect()?  
        -> Đưa logic xử lý vào callback của useEffect, tránh những logic đồng bộ phức tạp làm chậm quá trình render tăng thời gian tải trang -> ưu tiên xử lý tạo UI cho người dùng.  
        
2. **Đầu vào**: useEffect() nhận 2 đối số: callback & dependences.  
    ```jsx
    useEffect(callback, [dependences])
    ```  
    - *callback* arg là bắt buộc, được sử dụng để thực hiện các side effect.  
    - *dependences* là optional, là array chứa những sự phụ thuộc về mặt dữ liệu.  

    **Note**: 

    - callback luôn được gọi sau khi component mounted.  
    - Gọi callback sau khi render UI (return element đã được add vào DOM).  
        -> Tránh làm chậm quá trình render.  
    - Cleanup function:  
        - Là function được return bởi callback của useEffect().  
        - Luôn được gọi trước khi component unmounted.  
        - Luôn được gọi trước mỗi lần callback được gọi (trừ lần mounted).  
            Trước khi thực hiện một lần gọi callback mới thì cleanup function sẽ đi dọn dẹp bộ nhớ của lần gọi callback trước đó.  
        - Sử dụng để dọn dẹp bộ nhớ của lần chạy logic trước đó trước khi logic chạy lần mới tránh gây memory leak.  
    - **useEffect(callback)**  
        - Gọi callback mỗi khi component được re-render.  
            -> *Vấn đề*: setState() trong callback có thể sẽ tạo nên vòng lặp thực thi callback vô hạn -> làm giảm hiệu năng của web.  
        -> **Sử dụng**: Khi muốn thực hiện logic nào đó lặp lại mỗi khi component bị re-render.  
    - **useEffect(callback, [])**  
        - Chỉ gọi callback 1 lần sau khi component mounted.  
            -> Giải quyết vấn đề setState() tạo vòng lặp thực thi callback vô hạn.  
        -> **Sử dụng**: khi muốn thực hiện logic nào đó 1 lần sau khi component được mounted & không muốn lặp lại mỗi khi component bị re-render.  
    - **useEffect(callback, dependences)**  
        - Gọi callback mỗi khi các phần tử trong dependences thay đổi giá trị.  
            Khi component bị re-render, useEffect sẽ kiểm tra dependences trước & sau re-render có khác nhau không, nếu khác nhau sẽ gọi callback.  
        -> **Sử dụng**: khi muốn thực hiện logic nào đó lặp lại mỗi khi component bị re-render & parameter phụ thuộc thay đổi giá trị.  

**Note**: Khi thực hiện 1 logic mới thì viết một useEffect() mới.  


## 2. Update DOM with useEffect() 

**Bài toán**: sửa title của trang mỗi khi input thay đổi -> **useEffect(callback)**

```jsx
// Content.js
import { useState, useEffect } from 'react'

function Content() {
    const [title, setTitle] = useState('')

    // Luôn logger Render -> Mounted
    useEffect(() => {
        document.title = title
        console.log('Mounted');
    })

    return (
        <div>
            <label htmlFor="title">Title</label>
            <input
                id="title"
                onChange={e => setTitle(e.target.value)}
            />
            {console.log('Render')}
        </div>
    )
}

export default Content
```


## 3. Call API with useEffect()  

**Bài toán**: Call API lấy & hiển thị data -> **useEffect(callback, [])**   

```jsx
// Content.js
import { useState, useEffect } from 'react'

function Content() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(posts => {
                setPosts(posts)
            })
            .catch(err => { console.log(err); })
    }, [])

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    )
}

export default Content
```

**Bài toán**: Chọn tab thực hiện call API khác nhau để lấy & hiển thị data -> **useEffect(callback, dependences)**  

```jsx
// Content.js
import { useState, useEffect } from 'react'

const tabs = ['posts', 'todos', 'albums']

function Content() {
    const [type, setType] = useState('posts')
    const [list, setList] = useState([])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(list => {
                setList(list)
            })
            .catch(err => { console.log(err); })
    }, [type])

    return (
        <div>
            {tabs.map(tab => (
                <button
                    key={tab}
                    style={type === tab ? {
                        color: '#fff',
                        backgroundColor: '#555'
                    } : {}}
                    onClick={() => setType(tab)}
                >
                    {tab}
                </button>
            ))}

            <ul>
                {list.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Content
```  


## 4. Listen DOM events with useEffect()

**Vấn đề khi xử lý DOM events**: Khi component được mounted một object được tạo ra đại diện cho component này, khi component bị unmounted thì những listener mà object đại diện component đã add trên window không hề bị remove mà vẫn tồn tại. Khi component được mounted lại một object đại diện mới sẽ được tạo ra & lại add listener mới, khi event được kích hoạt cả listener mới & cũ chưa remove đều sẽ hoạt động, điều này gây nên vấn đề memory leak. -> Cần remove listener khi component unmounted với **cleanup function**.  

**Bài toán**: Khi cuộn xuống khoảng cách >= 200px thì hiển thị một nút "Go to top" nằm cố định ở góc phải bên dưới, còn khi cuộn ngược lại < 200px thì ẩn nút đó đi. -> **Scrool** DOM event -> **useEffect(callback, [])**  

```jsx
// Content.js
import { useState, useEffect } from 'react'

const tabs = ['posts', 'todos', 'albums']

function Content() {
    const [type, setType] = useState('posts')
    const [list, setList] = useState([])
    const [showBtnTop, setShowBtnTop] = useState(false)

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(list => {
                setList(list)
            })
            .catch(err => { console.log(err); })
    }, [type])

    useEffect(() => {
        const handleScrool = () => {
            setShowBtnTop(window.scrollY >= 200)
        }
        window.addEventListener('scroll', handleScrool)

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScrool)
        }
    }, [])

    return (
        <div>
            {tabs.map(tab => (
                <button
                    key={tab}
                    style={type === tab ? {
                        color: '#fff',
                        backgroundColor: '#555'
                    } : {}}
                    onClick={() => setType(tab)}
                >
                    {tab}
                </button>
            ))}
            <ul>
                {list.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
            {showBtnTop && (
                <button
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20
                    }}
                    onClick={() => window.scrollTo({ top: 0 })}
                >
                    Go to top
                </button>
            )}
        </div>
    )
}

export default Content
```  

**Bài toán**: Hiển thị kích thước chiều ngang của cửa sổ browser.  

```jsx
// Content.js
import { useState, useEffect } from 'react'

function Content() {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        // cleanup function
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return <h1>{width}</h1>
}

export default Content
```


## 5. Timer function with useEffect()

**Vấn đề khi xử lý timer**: Thực chất khi các timer được thực thi sẽ add một listener lên window, vì vậy khi unmounted component cần remove listener bằng cách clear timer để tránh memory leak với **cleanup function**.  

**Bài toán**: Đếm ngược thời gian từ 180 giây.  

*Cách 1*: timer **setInterval()** + **useEffect(callback, [])**  

*Vấn đề*: callback của useEffect() chỉ được gọi 1 lần sau khi component mounted, lúc này countdown = 180, nên closure function setInterval() dù gọi callback của nó nhiều lần nhưng countdown tham chiếu tới scope của callback useEffect luôn có giá trị 180. -> truyền callback cho setCountdown()  

```jsx
// Content.js
import { useState, useEffect } from 'react'

function Content() {
    const [countdown, setCountdown] = useState(180)

    useEffect(() => {
        const timerId = setInterval(() => {
            setCountdown(prevState => prevState - 1)
        }, 1000)

        // cleanup function
        return () => clearInterval(timerId)
    }, [])

    return <h1>{countdown}</h1>
}

export default Content
```

*Cách 2*: timer **setTimeout()** + **useEffect(callback, dependences)**  

```jsx
// Content.js
import { useState, useEffect } from 'react'

function Content() {
    const [countdown, setCountdown] = useState(180)

    useEffect(() => {
        const timerId = setTimeout(() => {
            setCountdown(countdown - 1)
        }, 1000)

        // cleanup function
        return () => clearTimeout(timerId)
    }, [countdown])

    return <h1>{countdown}</h1>
}

export default Content
```


## 6. Choose file with useEffect()

**Vấn đề**: Khi chọn file khác, không thể sử dụng file cũ đã chọn nhưng nó vẫn tồn tại trong bộ nhớ, gây nên memory leak -> Sử dụng **Cleanup function**.  

**Bài toán**: Chọn & hiển thị avatar preview.  

```jsx
import { useState, useEffect } from 'react'

function Content() {
    const [avatar, setAvatar] = useState()

    useEffect(() => {
        // cleanup funcion
        return () => {
            avatar && URL.revokeObjectURL(avatar.previewUrl)
        }
    }, [avatar])

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0]
        file.previewUrl = URL.createObjectURL(file)
        setAvatar(file)
    }

    return (
        <div>
            <label htmlFor="avatar">Choose avatar</label>
            <input
                id="avatar"
                type="file"
                onChange={handleChangeAvatar}
            />
            {avatar && (
                <img
                    src={avatar.previewUrl}
                    alt={avatar.name}
                    style={{ maxWidth: 400 }}
                />
            )}
        </div>
    )
}

export default Content
```

## 7. Real-time subcribe / unsubcribe with useEffect() 

*Ví dụ*: Chat app, comment, ...  

**Cơ chế**: Dựa trên **subcribe** & **unsubcribe**. 

**Ví dụ**: Mỗi bài học sẽ tạo một kênh (chat hoặc bình luận), bất cứ ai truy cập một bài học cũng sẽ phải subcribe kênh của bài học đó, khi một người đang theo dõi kênh này comment thì tất cả những người theo dõi còn lại cũng sẽ đều nhận được.

**Vấn đề**:  

- Khi truy cập bài học khác, cần unsubcribe kênh của bài học đã truy cập trước đó, nếu không khi comment thì sẽ xuất hiện cả ở kênh hiện tai & kênh đã truy cập trước đó.  
- Khi component unmounted, cần unsubcribe kênh của bài học vừa rồi để tránh việc subcribe âm thầm gây memory leak.  

-> Sử dụng **Cleanup function**.  

**Bài toán**: Chat app.  

Giả sử cứ 2 giây sẽ có người comment 1 lần, chúng ta sẽ gửi đi các event ở phạm vi global 2 giây 1 lần.  

```jsx
// index.js (entry point file)

// Fake comments
function emitComment(id) {
    setInterval(() => {
        window.dispatchEvent(
            // new CustomEvent(eventName, objEvent)
            new CustomEvent(`lesson-${id}`, {
                detail: `Nội dung comment của lesson ${id}`
            })
        )
    }, 2000);
}

emitComment(1)
emitComment(2)
emitComment(3)
```

- **Note**:  
    - Khi add một event, thì khi event xảy ra trong DOM thì DOM sẽ tự động phát ra event đó.
    - dispatchEvent(event) để chủ động phát đi một event, tương tự listen event trong DOM.  

```jsx
// Content.js
import { useState, useEffect } from 'react'

const lessons = [
    { id: 1, name: 'ReactJS là gì?' },
    { id: 2, name: 'SPA/MPA là gì?' },
    { id: 3, name: 'JSX là gì?' }
]

function Content() {
    const [lessonId, setLessonId] = useState(1)

    useEffect(() => {
        const handleComment = ({ detail }) => {
            console.log(detail);
        }

        window.addEventListener(`lesson-${lessonId}`, handleComment)

        // cleanup funcion
        return () => {
            window.removeEventListener(`lesson-${lessonId}`, handleComment)
        }
    }, [lessonId])

    return (
        <div>
            <ul>
                {lessons.map(lesson => (
                    <li
                        key={lesson.id}
                        style={{ color: lesson.id === lessonId ? '#f00' : '#333' }}
                        onClick={() => setLessonId(lesson.id)}
                    >
                        {lesson.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Content
```