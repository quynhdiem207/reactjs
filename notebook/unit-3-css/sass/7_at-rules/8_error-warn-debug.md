## 1. @error rule

**@error** in ra error (giá trị của expression cùng với 1 stack trace chỉ ra mixin / function đang được gọi), dừng compile stylesheet & thông báo xảy ra lỗi cho system.  

Syntax:  
>```scss
>@error <expression>;
>```

Là *"universal statement"*, có thể sử dụng ở bất cứ đâu.  

*Ví dụ*:

```scss
@mixin reflexive-position($property, $value) {
  @if $property != left and $property != right {
    @error "Property #{$property} must be either left or right.";
  }

  $left-value: if($property == right, initial, $value);
  $right-value: if($property == right, $value, initial);

  left: $left-value;
  right: $right-value;
  [dir=rtl] & {
    left: $right-value;
    right: $left-value;
  }
}

.sidebar {
  @include reflexive-position(top, 12px);
  //       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Error: Property top must be either left or right.
}
```


## 2. @warn rule

**@warn** in ra message cảnh báo (giá trị của expression cùng với 1 stack trace chỉ ra mixin / function đang được gọi), nhưng không dừng toàn bộ việc compile stylesheet.  

Syntax:  
>```scss
>@warn <expression>;
>```

Là *"universal statement"*, có thể sử dụng ở bất cứ đâu.  

Hữu ích khi muốn cảnh báo người dùng trong các trường hợp như truyền đối số cũ không còn được dùng nữa hay 1 số giá trị nhất định, hoặc gọi API theo cách không an toàn.  

*Ví dụ*:

SCSS input:  
```scss
$known-prefixes: webkit, moz, ms, o;

@mixin prefix($property, $value, $prefixes) {
  @each $prefix in $prefixes {
    @if not index($known-prefixes, $prefix) {
      @warn "Unknown prefix #{$prefix}.";
    }

    -#{$prefix}-#{$property}: $value;
  }
  #{$property}: $value;
}

.tilt {
  // Oops, we typo'd "webkit" as "wekbit"!
  @include prefix(transform, rotate(15deg), wekbit ms);
}
```

CSS output:  
```css
.tilt {
  -wekbit-transform: rotate(15deg);
  -ms-transform: rotate(15deg);
  transform: rotate(15deg);
}
```


## 3. @debug rule

**@debug** in ra giá trị expression cùng với file name & số dòng trên terminal.  

Syntax:  
>```scss
>@debug <expression>;
>```

Là *"universal statement"*, có thể sử dụng ở bất cứ đâu.  

Hữu ích khi muốn xem giá trị của expression trong quá trình development stylesheet với mục đích gỡ lỗi.  

*Ví dụ*:

```scss
@mixin inset-divider-offset($offset, $padding) {
  $divider-offset: (2 * $padding) + $offset;
  @debug "divider offset: #{$divider-offset}";

  margin-left: $divider-offset;
  width: calc(100% - #{$divider-offset});
}
```