## 1. React.useMemo() hook

1. **Sử dụng**: Giúp tránh thực hiện lại một logic nào đó không cần thiết làm ảnh hưởng performance.  
2. **Đầu vào**: useMemo() nhận 2 đối số: callback & dependencies.  
    - *callback* thực hiện tính toán & return giá trị muốn ghi nhớ.  
    - *dependencies* là một array chứa sự phụ thuộc về mặt dữ liệu, tức là các biến tham chiếu được sử dụng trong callback có khả năng bị thay đổi sau mỗi lần re-render.  
    ```jsx
    useCallback(callback, [])
    useCallback(callback, dependencies)
    ```  
3. **Đầu ra**: Giá trị muốn memo được trả về bởi callback.  
4. Nguyên lý hoạt động:  
    - Lần đầu tiên khi component được mounted, useMemo() nhận callback, thực thi & return lại kết quả tính toán.  
    - Khi component bị re-render:  
        - **useMemo(callback, [])**: return kết quả đã tính toán khi component mounted.  
        - **useMemo(callback, dependencies)**: nếu các phần tử trong dependencies không thay đổi thì sẽ return kết quả đã tính toán trước đó thay vì thực thi callback & return kết quả tính toán lại.  


## 2. Ví dụ

**Bài toán**: Khi ấn "Add" sẽ thêm 1 product, đồng thời clear & focus input, rồi hiển thị danh sách products & đưa ra tổng tiền.  

```jsx
import { useState, useMemo, useRef } from 'react'

function App() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [products, setProducts] = useState([])

    const nameRef = useRef()

    const handleSubmit = () => {
        setProducts([...products, {
            name,
            price: +price
        }])
        setName('')
        setPrice('')
        nameRef.current.focus()
    }

    const total = useMemo(() => (
        products.reduce((result, prod) => result + prod.price, 0)
    ), [products])

    return (
        <div className="App" style={{ padding: '10px 32px' }}>
            <input
                ref={nameRef}
                value={name}
                placeholder="Enter name..."
                onChange={e => setName(e.target.value)}
            />
            <input
                value={price}
                placeholder="Enter price..."
                onChange={e => setPrice(e.target.value)}
            />
            <button onClick={handleSubmit}>Add</button>
            Total: {total}
            <ul>
                {products.map((product, index) => (
                    <li key={index}>{product.name} - {product.price}</li>
                ))}
            </ul>
        </div>
    )
}

export default App;
```