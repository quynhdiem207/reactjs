# --- SASS ---

Sass là ngôn ngữ mở rộng của CSS.  

## 1. Syntax

Sass hỗ trợ 2 dạng cú pháp:  
>- SCSS syntax (.scss extension)
>   - block statement được định nghĩa bằng cách sử dụng cặp ngoặc "{}".  
>   - các statements được ngăn cách nhau bằng dấu ";".  
>   ```scss
>   // filename.scss
>   .test {
>       color: red;
>   }
>   ```
>- Indented syntax (.sass extension)
>   - Thay vì sử dụng cặp ngoặc "{}" thì sẽ sử dụng xuống dòng & thụt lề.  
>   - Thay vì sử dụng dấu ";"  thì sẽ sử dụng xuống dòng.  
>   ```scss
>   // filename.sass
>   .test
>       color: red
>   ```


## 2. Cấu trúc của stylesheet

1. Statements:  
    - *Universal statement*: Có thể sử dụng ở bất cứ đâu trong stylesheet.  
        - Khai báo biến **$var: value**  
        - Kiểm soát luồng at-rules **@if**...**@else**, **@each**, **@for**, **@white**  
        - Các rules **@debug**, **@error**, **@warn**  

    - *CSS statements*: Các lệnh tạo ra CSS, có thể sử dụng ở bất cứ đâu ngoại trừ trong **@function**.  
        - Style rules **h1 { ... }**  
        - CSS at-rules **@media**, **@font-face**, ...  
        - Rule **@at-root**  
        - Use mixin với **@includes**  

    - *Top-level statements*: Chỉ có thể sử dụng ở top-level của stylesheet hoặc được lồng bên trong *CSS statements* ở top-level.  
        - Load module sử dụng **@use** or **@forwaed**  
        - Import file với **@import**  
        - Define mixin **@mixin**  
        - Define function **@function**  
    
    - *Other statements*:  
        - Khai báo property: Chỉ có thể được sử dụng bên trong "Style rules" hoặc một vài "CSS at-rules", eg: **width: 100px;**.  
        - Rule **@extends** chỉ có thể sử dụng bên trong "Style rules".  

2. Expressions:  
    - *Literals*:  
        - Number: Có hoặc không có đơn vị như 12 hay 12px  
        - String: Có hoặc không trích dẫn như bold hay "Helvetica Neue"  
        - Boolean: true hoặc false  
        - Singleton: null  
        - Color: hex hoặc name như #fff hay white  
        - Map: kết hợp key & value như ("background": red, "foreground": pink)  
        - List of values: ngăn cách bởi space hay dấu "," hay đặt trong cặp ngoặc "[]" hay không ngoặc  

    - *Operator*:  
        - !=, ==  
        - \>, <, \>=, <=  
        - +, -, *, /, %  
        - and, or, not (mọi giá trị đều là truthy ngoại trừ false & null)  
        - +, -, / có thể sử dụng nối chuỗi  
        - () sử dụng kiểm soát thứ tự ưu tiên của các operators  

    - *Other expressions*:  
        - Parent selector: **&**  
        - Value **!important**  
        - Variables như **$var**  
        - Function calls (user-defined, built-in, Plain CSS function) như **nth($list, 1)** hay **var(--bgColor)**  
        - Special functions như **calc()** hay **url()**  


## 3. Comments  

1, Gồm các loại comments:  

- Single-line comment **//**: Là silent comment.  
    - SCSS syntax: sẽ bị xóa khỏi output css khi compile.  
    - Indented syntax: sẽ KHÔNG bị xóa khỏi output css khi compile.  

- Multi-line comment **/* */**: Là loud comment, sẽ bị xóa khỏi output css khi compile ở compressed mode.  
    - **/*! */**: sẽ KHÔNG bị xóa khỏi output css.  
    - Có thể sử dụng interpolation #{} trong comment.  

- Documentation comment **///**: Là silent comment.  


## 4. Special functions

- url()  
- calc()  
- element()  
- progid:...()  
- expression()  
