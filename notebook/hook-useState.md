## 1. useState() hook  

useState đề cập tới trạng thái của dữ liệu, tức là sự thay đổi của dữ liệu.  

useState() ra đời giúp đơn giản hóa việc thể hiện trạng thái của dữ liệu ra UI, Nói đơn giản là dữ liệu thay đổi gì thì giao diện thay đổi đó.  

Sử dụng useState() khi đang có dữ liệu được hiển thị trên UI, rồi muốn khi dữ liệu được thay đổi thì UI tự động được cập nhật lại (render lại theo dữ liệu).  

```jsx
import { useState } from 'react'

function Component() {
    const [state, setState] = useState(initState)
}
```

**Note**:  

1. useState() có một parameter initState là initial value cho state với default value là undefined:  
    - Khi không truyền argument thì initState là undefined.  
      ```jsx
      const [state, setState] = useState()
      ```  
    - Khi truyền argument là một value thì nó sẽ lấy value này làm initState.  
      ```jsx
      const [state, setState] = useState(value)
      ```  
    - Khi truyền argument là callback thì nó sẽ lấy return value của callback làm initState.  
      ```jsx
      const [state, setState] = useState(() => {
          return [20, 30, 50].reduce((total, cur) => total + cur)
      })
      ```
2. useState() return array gồm 2 phần tử: state & setState.  
3. setState() là function có một parameter với default value là undefined, được sử dụng để set lại state, khi muốn sửa giá trị của state thì gọi function này & truyền argument cho nó.  
    - Khi không truyền argument thì nó sẽ gán undefined cho state.  
      ```jsx
      setState()
      ```  
    - Khi argument là một value thì nó sẽ gán value cho state.  
      ```jsx
      setState(value)
      ```  
    - Khi argument là callback, nó sẽ truyền giá trị trước đó của state làm đối số cho callback & gán return value của callback cho state.  
      ```jsx
      setState(prevState => { return ... })
      ```  
4. Nguyên lý hoạt động của useState():  
    - Trong lần đầu tiên render, nó lấy initState gán cho state. Từ lần 2 trở đi nó lấy giá trị trước đó của state gán cho state.  
    - Sau khi setState, React sẽ lên lịch trình & đưa vào hàng đợi chờ  re-render Component bằng cách gọi lại function component đó để nhận được React element mới, xử lý & update UI.  
      **Note**: Do được React lên lịch chờ re-render nên dù gọi setState() nhiều lần vẫn sẽ chỉ re-render một lần.  
5. setState() thay thế state bằng giá trị mới.  
    ```jsx
    import { useState } from 'react'

    function App() {
      const [info, setInfo] = useState({
        name: "Diêm Quỳnh"
      })

      const handleUpdate = () => {
        setInfo({ ...info, age: 26 })
      }

    // {"name":"Diêm Quỳnh"} -> {"name":"Diêm Quỳnh","age":26}
      return (
        <div className="App" style={{ padding: 20 }}>
          <h1>{JSON.stringify(info)}</h1>
          <button onClick={handleUpdate}>Update</button>
        </div>
      );
    }

    export default App;
    ```  


## 2. Một số ví dụ  

**Bài toán**: Ứng dụng đếm số với giá trị bắt đầu từ 1, mỗi khi ấn button giá trị sẽ tăng lên 1.  

```jsx
import { useState } from 'react'

function App() {
  const [counter, setCounter] = useState(1)

  // Mỗi lần click giá trị render ra sẽ tăng 1
  const handleIncrease = () => {
    setCounter(counter + 1)
  }

  // Mỗi lần click chỉ re-render 1 lần, giá trị render ra vẫn chỉ tăng 1
  const handleIncrease = () => {
    setCounter(counter + 1)
    setCounter(counter + 1)
  }

  // Mỗi lần click chỉ re-render 1 lần, giá trị render ra sẽ tăng 2
  const handleIncrease = () => {
    setCounter(prevState => prevState + 1)
    setCounter(prevState => prevState + 1)
  }

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>{counter}</h1>
      <button onClick={handleIncrease}>Increase</button>
    </div>
  );
}

export default App;
```

**Bài toán**: Random gifts.  

```jsx
import { useState } from 'react'

const gifts = ['CPU 19', 'RAM 32GB RGB', 'RGB Keyboard']

function App() {
  const [gift, setGift] = useState()

  const randomGift = () => {
    const index = Math.floor(Math.random() * gifts.length)
    setGift(gifts[index])
  }

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>{gift || "Chưa có phần thưởng"}</h1>
      <button onClick={randomGift}>Lấy thưởng</button>
    </div>
  );
}

export default App;
```  


## 3. One-way binding & Two-way binding  

Ở đây đề cập đến việc xử lý dữ liệu, thường là xử lý form.  
> Gồm có 2 chiều:  
>- chiều mà chúng ta tương tác trên giao diện,  
>- chiều dữ liệu trong component.  

- One-way binding là ràng buộc một chiều.  
    **Note**: Khi dữ liệu chiều này thay đổi thì dữ liệu chiều kia cũng thay đổi theo, nhưng khi dữ liệu chiều kia thay đổi thì dữ liệu chiều này không hề thay đổi.  

    *Ví dụ*: Khi sửa dữ liệu trong input trên UI thì state trong component sẽ được thay đổi giá trị tương ứng, nhưng khi state trong coponent thay đổi giá trị thì dữ liệu trong input trên UI sẽ không thay đổi theo.  
- Two-way binding là ràng buộc hai chiều.  
    **Note**: Khi dữ liệu một trong hai chiều thay đổi thì dữ liệu chiều còn lại cũng thay đổi tương ứng.  

Mặc định ReactJS là one-way binding, VueJS là two-way binding.  

```jsx
import { useState } from 'react'

function App() {
    const [name, setName] = useState('')

    // name được thay đổi giá trị mỗi khi giá trị của input thay đổi
    const handleChange = e => setName(e.target.value)

    // Giá trị của input không hề thay đổi khi name thay đổi
    // Đây là one-way binding
    const handleClick = e => setName('Diêm Mai')

    // Để trở thành two-way binding thêm value / checked attribue cho input element
    return (
        <div className="App" style={{ padding: 20 }}>
            <input 
                value={name} 
                onChange={handleChange} 
            />
            <button onClick={handleClick}>Change</button>
        </div>
    );
}

export default App;
```  

### ================ Input ================  

```jsx
import { useState } from 'react'

function App() {
    const [name, setName] = useState('')

    const handleSubmit = () => console.log({ name })

    return (
        <div className="App" style={{ padding: 20 }}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}

export default App;
```

### ============ Radio button =============

```jsx
import { useState } from 'react'

// Response from API
const courses = [
    { id: 1, name: 'HTML - CSS' },
    { id: 2, name: 'Javascript' }
]

function App() {
    const [checked, setChecked] = useState()

    const handleSubmit = () => console.log({ course: checked })

    return (
        <div className="App" style={{ padding: 20 }}>
            {courses.map(course => (
                <div key={course.id}>
                    <input
                        type="radio"
                        id={`course-${course.id}`}
                        checked={checked === course.id}
                        onChange={() => setChecked(course.id)}
                    />
                    <label htmlFor={`course-${course.id}`}>{course.name}</label>
                </div>
            ))}
            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}

export default App;
```

### ============== Checkbox ==============

```jsx
import { useState } from 'react'

// Response from API
const courses = [
    { id: 1, name: 'HTML - CSS' },
    { id: 2, name: 'Javascript' }
]

function App() {
    const [checked, setChecked] = useState([])

    const isChecked = (id) => checked.includes(id)
    const handleCheck = (id) => {
        setChecked(prevState => isChecked(id) ?
            prevState.filter(item => item !== id) :
            [...prevState, id]
        )
    }
    const handleSubmit = () => console.log({ courses: checked })

    return (
        <div className="App" style={{ padding: 20 }}>
            {courses.map(course => (
                <div key={course.id}>
                    <input
                        type="checkbox"
                        id={`course-${course.id}`}
                        checked={isChecked(course.id)}
                        onChange={() => handleCheck(course.id)}
                    />
                    <label htmlFor={`course-${course.id}`}>{course.name}</label>
                </div>
            ))}
            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}

export default App;
```  

**Bài toán**: TodoList

```jsx
import { useState } from 'react'

function App() {
    const [job, setJob] = useState('')
    const [jobs, setJobs] = useState(() => (
        JSON.parse(localStorage.getItem('jobs')) ?? []
    ))

    const handleSubmit = () => {
        setJobs(prevState => {
            const newJobs = [...prevState, job]
            // save to local storage
            const jsonJobs = JSON.stringify(newJobs)
            localStorage.setItem('jobs', jsonJobs)
            return newJobs
        })
        setJob('')
    }

    return (
        <div className="App" style={{ padding: 20 }}>
            <div>
                <label htmlFor="job">Job</label>
                <input
                    id="job"
                    value={job}
                    onChange={e => setJob(e.target.value)}
                />
                <button onClick={handleSubmit}>Add</button>
            </div>
            <ul>
                {jobs.map((job, index) => (
                    <li key={index}>{job}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
```

## 4. Mounted / Unmounted

- Mounted (gắn vào) là thời điểm đưa component vào sử dụng.  
- Unmounted (gỡ ra) là thời điểm gỡ component ra không sử dụng nữa.  

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