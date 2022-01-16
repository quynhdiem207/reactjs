# --- Variables ---

## 1. Variablle declarations

- Syntax:  
    ```scss
    $varName: expression;
    ```

- Biến có thể được khai báo ở bất cứ đâu.  
- Là biến tham chiếu: Để truy xuất giá trị sẽ tham chiếu đến tên biến.  
- Trong tên biến không phân biệt dấu "_" và "-", chúng tương đương nhau.  

**Ví dụ**:
```scss
$base-color: #c6538c;
$border-dark: rgba($base-color, 0.88);

.alert {
  border: 1px solid $border-dark;
}
```


## 2. Default value

Xác định default value cho biến với **!default** flag:  
```scss
$varName: expression !default;
```

Default value chỉ được sử dụng khi biến chưa được khai báo trước đó hay mang giá trị **null**, nếu không sẽ sử dụng giá trị hiện tại.  

#### === Configuring Modules ===  

Biến được định nghĩa với !default có thể được cấu hình khi load module với **@use** rule:    

- Giá trị cấu hình sẽ ghi đè default value.  
- Chỉ các biến được khai báo ở top-level của stylesheet với !default flag mới có thể cấu hình khi load module.  

```scss
@use <url> with (<variable>: <value>, ...);
```

**Ví dụ**:  
```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

// style.scss
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);
```


## 3. Built-in variables  

Không thể sửa đổi giá trị của các biến được định nghĩa bởi **Built-in modules**.  

```scss
@use "sass:math" as math;

$circleArea = math.$pi * 2 * 2;
```


## 4. Scope

- **Global**: Biến được khai báo ở top-level của stylesheet, có thể truy xuất từ bất cứ đâu sau khi khai báo.  
- **Local**: Biến được khai báo trong block, chỉ có thể truy xuất trong block được khai báo.  

```scss
$global: value;

selctor {
    $local: value;
    property: $local;
    property: $global;
}
```

#### ==== Shadowing ====  

- Có thể khai báo biến local trùng tên với biến global, chúng là 2 biến khác nhau.  
    ```scss
    $var: value 1;

    selctor {
        $var: value 2;
        property: $var; // value 2
    }
    ```

- Nếu muốn gán lại giá trị cho biến global trong block, sử dụng **!global** flag.  
    ```scss
    $global: value 1;

    selctor-1 {
        $global: value 2 !global;
        property: $global; // value 2
    }

    selctor-2 {
        property: $global; // value 2
    }
    ```

- Chỉ sử dụng **!global** flag để gán giá trị của biến global đã được khai báo.  

#### ==== Flow control scope ====

Các biến được khai báo trong flow control scope không có shadow, nó chỉ là gán giá trị cho biến đã được khai báo ở outer scope.  

```scss
$dark-theme: true !default;
$primary-color: #f8bbd0 !default;
$accent-color: #6a1b9a !default;

@if $dark-theme {
  $primary-color: darken($primary-color, 60%);
  $accent-color: lighten($accent-color, 60%);
}

.button {
  background-color: $primary-color;
  border: 1px solid $accent-color;
  border-radius: 3px;
}
```


## 5. Advace functions

- **meta.variable-exists()**: Trả về giá trị boolean, cho biết biến có tồn tại trong current scope hay không.  
- **meta.global-variable-exists()**: Trả về giá trị boolean, cho biết biến có tồn tại trong global scope hay không.  

**Note**: Không được phép sử dụng interpolation **${}** để định nghĩa tên biến dựa vào 1 biến khác. Tuy nhiên, có thể định nghĩa 1 map mà có thể sử dụng biến để truy xuất.  

```scss
@use "sass:map";

$theme-colors: (
  "success": #28a745,
  "info": #17a2b8,
  "warning": #ffc107,
);

.alert {
  // Instead of $theme-color-#{warning}
  background-color: map.get($theme-colors, "warning");
}
```