## 1. Hook  

Hook thực chất là những function / method được cung cấp bởi **react** library, mỗi function này có một tính năng & một trường hợp cụ thể để sử dụng.  

Khi làm việc với function component mà cần thêm các tính năng hook cung cấp thì sẽ lấy ra các hook tương ứng, thêm vào & dùng nó trong function component này.  

Do vậy các function này được gọi là Hook bởi cách dùng của nó là gắn móc vào component, bổ sung tính năng cho component.  

Hook bao gồm: Built-in hook do react cung cấp & Custom hook.  

Quy ước đặt tên hook: **useName()**.  

Cần nhớ **sử dụng khi nào**, **đầu vào** & **đầu ra** của các hooks khác nhau.  

**Sử dụng built-in function / class của React library**:  
```jsx
// Cách 1
import React from 'react'
React.useName()

// Cách 2
import { useName } from 'react'
useName
```

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
