## 1. @forward rule

- Syntax:  
    >```scss
    >@forward "<url>";
    >```
- **@forward** cho phép load a stylesheet, & làm cho public members (mixins, functions, variables) của module đó sẵn có như thể được trực tiếp định nghĩa trong this stylesheet khi được loaded với @use.  
- Styles từ module được forwarded sẽ được bao gồm trong CSS output khi được compiled, module with **@forward** có thể extend chúng.  
- Từ bên ngoài (stylesheet load module) chỉ có thể truy xuất public members, không thể truy xuất private members.  
- Là "Top-level statement": Chỉ có thể được sử dụng ở top-level của stylesheet, hoặc lồng ở top-level bên trong *CSS statements*: style rules, CSS at-rules, @at-root rule.  

- Stylesheet được load bởi @forward được gọi là "module".  
- Sass module URL được load không thể lấy từ biến, cũng không thể sử dụng nội suy (#{}).  
- Nếu load cùng 1 module trong cùng 1 file bằng cả @forward & @use, thì nên đặt @forward trước, như vậy nếu muốn cấu hình cho forwarded module, cấu hình sẽ được áp dụng cho @forward trước khi @user load nó mà không có cấu hình.  

```scss
// src/_list.scss
@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

// bootstrap.scss
@forward "src/list";

// styles.scss
@use "bootstrap";

li {
  @include bootstrap.list-reset;
}
```


## 2. Adding a prefix

**@forward** có tùy chọn thêm prefix bổ sung cho tất cả các members mà nó chuyển tiếp.  

>```scss
>@forward "<url>" as <prefix>-*;
>```

*Ví dụ*:  
```scss
// src/_list.scss
@mixin reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

// bootstrap.scss
@forward "src/list" as list-*;

// styles.scss
@use "bootstrap";

li {
  @include bootstrap.list-reset;
}
```


## 3. Controlling Visibility

**@forward** cho phép giới hạn các members được phép chuyển tiếp.  

- Xác định các members bị ẩn đi, không cho phép chuyển tiếp:  
    >```scss
    >@forward "<url>" hide <...members>;
    >```

- Xác định các members cho phép chuyển tiếp:  
    >```scss
    >@forward "<url>" show <...members>;
    >```

*Ví dụ*:  
```scss
// src/_list.scss
$horizontal-list-gap: 2em;

@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin list-horizontal {
  @include reset;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: $horizontal-list-gap;
    }
  }
}

// bootstrap.scss
@forward "src/list" hide list-reset, $horizontal-list-gap;
```


## 4. Configuring Modules 

Tương tự với **@use**, **@forward** cũng cho phép load module với cấu hình đi kèm:  

- Cách 1:  
    >```scss
    >@forward "<url>" with (<variable>: <value>, ...);
    >```
- Cách 2: Sử dụng **mixin**  
    - a mixin for setting variables.  
    - a mixin for injecting styles.  

Ngoài ra, **@forward** cho phép cấu hình cho các biến với **!default** flag.  
>```scss
>@forward "<url>" with (<variable>: <value> !default, ...);
>```

*Ví dụ*:  
```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

// _opinionated.scss
@forward 'library' with (
  $black: #222 !default,
  $border-radius: 0.1rem !default
);

// style.scss
@use 'opinionated' with ($black: #333);
```