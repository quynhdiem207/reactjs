# --- Sass modules ---

## 1. Built-in modules

Sass hỗ trợ một số core modules chứa các functions & mixins hữu ích. Các modules này có thể được loaded bởi **@use** rule, Tất cả built-in module's URLs đều bắt đầu bằng **sass:**.  

- **sass:math** cung cấp các function giúp xử lý numbers.  
- **sass:string** giúp kết hợp, tìm kiếm hoặc phân tách strings.  
- **sass:color** giúp tạo new color dựa trên color khác.  
- **sass:list** cho phép truy xuất & sửa đổi values trong lists.  
- **sass:map** giúp truy xuất các cặp key/value của map.  
- **sass:selector** cung cấp quyền truy xuất vào selector engine của Sass.   
- **sass:meta** cho thấy chi tiết về cách hoạt động bên trong của Sass.  


## 2. Global functions

### 1, hsl() & hsla()

Syntax:  

>```scss
>hsl($hue, $saturation, $lightness, $alpha: 1);
>hsla($hue, $saturation, $lightness, $alpha: 1);
>hsla($color, $alpha); // => color
>```

Return a color, trong đó:  

- $hue (màu sắc): number có giá trị từ 0deg đến 360deg (có thể bỏ đơn vị).  
- $saturation (độ bão hòa): number có giá trị từ 0 - 100% (có thể bỏ đơn vị).  
- $lightness (độ sáng): number có giá trị từ 0 - 100% (có thể bỏ đơn vị).  
- $alpha (độ trong suốt): number có giá trị từ 0 - 1, hoặc từ 0 - 100% (optional).  

**Note**: Có thể truyền **calc()** or **var()** làm đối số cho **hsl()** & **hsla()**.  

*Ví dụ*:  
```scss
@debug hsl(34, 35%, 92%); // #f2ece4
@debug hsla(34, 35%, 92%, 0.2); // rgba(242, 236, 228, 0.2)
@debug hsla(var(--peach), 20%); // hsla(var(--peach), 20%)
```

### 2, if()

Syntax:  

>```scss
>if($condition, $if-true, $if-false) 
>```

Nếu $condition là truthy thì return $if-true, ngược lại return $if-false.  

*Ví du*:  
```scss
@debug if(true, 10px, 15px); // 10px
@debug if(false, 10px, 15px); // 15px
```

### 3, rgb() & rgba()

Syntax:  

>```scss
>rgb($red, $green, $blue, $alpha: 1)
>rgb($color, $alpha)
>rgba($red, $green, $blue, $alpha:1)
>rgba($color, $alpha) // => color
>```

Return a color, trong đó:  

- $red, $green, $blue là number có giá trị từ 0 - 255, hoặc 0 - 100%.  
- $alpha là number có giá trị từ 0 - 1, hoặc 0 - 100% (optional).  

*Ví dụ*:  
```scss
@debug rgb(95%, 92.5%, 89.5%); // #f2ece4
@debug rgba(95%, 92.5%, 89.5%, 0.2); // rgba(242, 236, 228, 0.2)
@debug rgb(#f2ece4, 50%); // rgba(242, 236, 228, 0.5);
```