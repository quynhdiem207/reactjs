# --- Interpolation ---

## 1. Interpolation #{} 

- Có thể sử dụng ở hầu hết mọi nơi trong stylesheet.  
- Nhằm nhúng kết quả của expression vào một đoạn CSS.  
- Hữu ích để đưa một giá trị vào một string.  
- Trả về unquoted string.  
- Hầu hết trường hợp không sử dụng #{\<number\>}, vì nó biến number thành unquoted string, không thể sử dụng cho tính toán.  
    eg: #{$width}px (bad) -> $width * 1px (good).  
- Syntax: **#{expression}**  
- Chỉ dùng #{} để wrap an expression ở các vị trí sau:  
    - Selectors in style rules  
    - Property names in declarations  
    - Custom property values  
    - CSS at-rules  
    - @extends  
    - Plain CSS @imports  
    - Quoted or unquoted strings  
    - Special functions  
    - Plain CSS function names  
    - Loud comments  

```scss
@mixin corner-icon($name, $top-or-bottom, $left-or-right) {
  .icon-#{$name} {
    background-image: url("/icons/#{$name}.svg");
    position: absolute;
    #{$top-or-bottom}: 0;
    #{$left-or-right}: 0;
  }
}

@include corner-icon("mail", top, left);
```


## 2. Quoted string

Interpolation #{} luôn trả về unquoted string, nếu chỉ muốn bỏ trích dẫn thay vì sử dụng **#{}** thì nên sử dụng **string.unquote()**.  

```scss
@use "sass:string"
selector {
    property: string.unquote(value);
}
```