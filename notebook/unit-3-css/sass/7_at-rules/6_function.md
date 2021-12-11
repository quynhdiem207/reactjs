## 1. @function rule

Functions cho phép định nghĩa các complex operations giúp xử lý & trả về 1 giá trị, mà có thể tái sử dụng trong stylesheet.  

- Syntax:  
    >```scss
    >@function <name>(<arguments...>) { ... }
    >
    >// call function
    ><name>(<arguments...>)
    >```

- Là "Top-level statement": Chỉ có thể được sử dụng ở top-level của stylesheet, hoặc lồng ở top-level bên trong *CSS statements*: style rules, CSS at-rules, @at-root rule.  
- Functions chỉ có thể chứa **universal statements**, & **@return** at-rule giúp xác định giá trị kết quả gọi function.  

*Ví dụ*:  

SCSS input:  
```scss
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

.sidebar {
  float: left;
  margin-left: pow(4, 3) * 1px;
}
```

CSS output:  
```css
.sidebar {
  float: left;
  margin-left: 64px;
}
```


## 2. Arguments

Arguments cho phép functons tùy chỉnh hành vi mỗi lần được gọi.  

### === 1, Optional Arguments ===

Các đối số của functions cũng có thể là optional, nếu xác định default value cho chúng:  

>```scss
>@function <name>(<variable>: <expression>, ... ) { ... }
>```

*Ví dụ*:

```scss
@function invert($color, $amount: 100%) {
  $inverse: change-color($color, $hue: hue($color) + 180);
  @return mix($inverse, $color, $amount);
}

$primary-color: #036;

.header {
  background-color: invert($primary-color, 80%);
}
```

### === 2, Keyword Arguments ===

Khi functions được gọi, arguments có thể được truyền bằng name thay vì vị trí của chúng trong argument list.

Hữu ích khi functions có nhiều optional arguments.  

>```scss
><name>(<variable>: <expression>, ...);
>```

*Ví dụ*:  

```scss
$primary-color: #036;

.banner {
  background-color: $primary-color;
  color: scale-color($primary-color, $lightness: +40%);
}
```

### === 3, Taking Arbitrary Arguments ===

Đôi khi muốn functions nhận số lượng arguments tùy ý, khai báo last argument kết thúc bởi "...", như vậy tất cả các extra arguments (arguments bổ sung) sẽ được truyền cho last argument dưới dạng 1 list. Đối số này được gọi là 1 **argument list**.  

>```scss
>@function <name>(..., <arguments...>) { ... }
>```

*Ví dụ*:  

SCSS input:  
```scss
@function sum($numbers...) {
  $sum: 0;
  @each $number in $numbers {
    $sum: $sum + $number;
  }
  @return $sum;
}

.micro {
  width: sum(50px, 30px, 100px);
}
```

CSS output:  
```css
.micro {
  width: 180px;
}
```

### === 4, Taking Arbitrary Keyword Arguments ===

Argument list cũng có thể được sử dụng để nhận keyword arguments tùy ý.  

**meta.keywords()** nhận argument list & return bất cứ extra keywords nào dưới dạng a **map**.  

>```scss
>@function <name>(..., <arguments...>) { ... }
>```

*Ví dụ*:  

```scss
@use "sass:meta";

@function sum($numbers...) {
  $sum: 0;
  @each $item, $number in meta.keywords($numbers) {
    $sum: $sum + $number;
  }
  @return $sum;
}

.micro {
  width: sum($colum-1: 50px, $column-2: 30px, $column-3: 100px);
}
```

### === 5, Passing Arbitrary Arguments ===

Giống như argument list cho phép functons nhận positional & keyword arguments tùy ý, tương tự cũng có thể truyền last argument cho functions là a list theo sau bởi "..." của các positional & keyword arguments. Các phần tử của list được coi là argument bổ sung.  

>```scss
><name>(..., <arguments...>);
>```

*Ví dụ*:  

```scss
$widths: 50px, 30px, 100px;

.micro {
  width: min($widths...);
}
```


## 3. @return

- **@return** at-rule chỉ ra value được sử dụng như kết quả khi gọi hàm.  
- Chỉ được phép sử dụng trong function body.  
- Function phải được kết thúc bởi **@return**.  

```scss
@use "sass:string";

@function str-insert($string, $insert, $index) {
  // Avoid making new strings if we don't need to.
  @if string.length($string) == 0 {
    @return $insert;
  }

  $before: string.slice($string, 0, $index);
  $after: string.slice($string, $index);
  @return $before + $insert + $after;
}
```


## 4. Other functions

Ngoài user-defined function, Sass cung cấp core library có chứa các built-in function luôn sẵn có để sử dụng. Bên cạnh đó luôn có thể gọi các Plain CSS function.  

### === Plain CSS Functions ===

Bất cứ function nào không phải user-defined hay built-in function, đều được compiled thành Plain CSS function.  

```scss
@debug var(--main-bg-color); // var(--main-bg-color)

$primary: #f2ece4;
$accent: #e1d7d2;
@debug radial-gradient($primary, $accent); // radial-gradient(#f2ece4, #e1d7d2)
```