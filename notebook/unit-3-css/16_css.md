## 1. CSS inline

```jsx
function App() {
    return (
        <div style={{padding: '0 32px'}}>
            <h1>CSS</h1>
        </div>
    )
}
```


## 2. CSS internal & external

1. CSS file:  
    ```css
    /* App.css */
    .heading {
        color: green;
    }
    ```  

2. Import CSS file áp dụng style cho component:  
    ```jsx
    // App.js
    import './App.css'

    function App() {
        return (
            <div>
                <h1 className="heading">CSS</h1>
            </div>
        )
    }
    ```  

3. Nguyên lý hoạt động:  
    Project được tạo bởi create-react-app đã được tích hợp & cấu hình cho webpack, khi import css file nó sẽ tự hiểu đây là file style & nạp nội dung vào website khi chạy trên browser.  

**Note**:  

- *Development* (npm start / yarn start): Sử dụng CSS dạng internal.  
    CSS được chia nhỏ thành nhiều file để dễ dàng quản lý, khi chạy trên browser mỗi css file được import sẽ thêm 1 \<style\> tag vào \<head\>.  
- *Production* (npm run build / yarn build): Sử dụng CSS dạng external.  
    Tất cả các css file chia nhỏ đều được webpack gom thành 1 file duy nhất, biến file này thành mini file & \<link\> vào index.html nhằm tối ưu performance.  
