## 1. Hook  

Hook thực chất là những function / method được cung cấp bởi **react** library, mỗi function này có một tính năng & một trường hợp cụ thể để sử dụng.  

Khi làm việc với function component mà cần thêm các tính năng hook cung cấp thì sẽ lấy ra các hook tương ứng, thêm vào & dùng nó trong function component này.  

Do vậy các function này được gọi là Hook bởi cách dùng của nó là gắn móc vào component, bổ sung tính năng cho component.  

Hook bao gồm: Built-in hook do react cung cấp & Custom hook.  

Quy ước đặt tên hook: **useName()**.  

**Note**:  

1. Hook chỉ dùng cho function component.  
2. Hook giúp component trở nên đơn giản & dễ hiểu mà vẫn đầy đủ tính năng:  
    - Không bị chia logic ra như method trong lifecycle của Class Component (Hook giúp viết logic xảy ra ở khác thời điểm nhưng lại viết ở ngay cạnh nhau).  
    - Không cần sử dụng this.  
3. Sử dụng hooks khi nào?  
    - Dự án mới => Function component + Hooks  
    - Dự án cũ:  
        - Component mới => Function component + Hooks  
        - Component cũ => Giữ nguyên, sẽ tối ưu khi có thời gian  
    - Logic nghiệp vụ cần sử dụng các tính chất của OOP => Class Component.  
4. Có thể sử dụng phối hợp Function component & Class Component.  

**Lifecycle** của component là từ khi nó được thêm vào DOM đến khi nó thay đổi về mặt dữ liệu & đến khi bị gỡ khỏi DOM, lifecycle đánh dấu thời điểm xảy ra những event trên.  


## 2. useState() hook  

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
  - Khi không truyền argument thì initState là undeffined.  
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

**Bài toán**: Ứng dụng đếm số với giá trị bắt đầu từ 1, mỗi khi ấn button giá trị sẽ tăng lên 1  

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

**Bài toán**: Random gifts  
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