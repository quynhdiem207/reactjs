# --- sass:meta ---

**sass:meta** cho thấy chi tiết về cách hoạt động bên trong của Sass.  

>```scss
>@use "sass:meta";
>```


## Mixins

### 1. meta.load-css()

Syntax:  

>```scss
>meta.load-css($url, $with: null) // => mixin
>```

Return a mixin với content là CSS styles của module được loaded ở $url cùng cấu hình $with.  

- $url phải là string, không thể là url(), có thể lấy từ biến, hay chứa nội suy #{}.  
- $with là optional, nếu được truyền thì phải là map với key là variable name (không gồm $) & value cấu hình cho biến của module được loaded.  

*Ví dụ*:  

SCSS input:  
```scss
// dark-theme/_code.scss
$border-contrast: false !default;

code {
  background-color: #6b717f;
  color: #d2e1dd;
  @if $border-contrast {
    border-color: #dadbdf;
  }
}

// style.scss
@use "sass:meta";

body.dark {
    @include meta.load-css(
        "dark-theme/code",
        $with: ("border-contrast": true)
    );
}
```

CSS output:  
```css
body.dark code {
  background-color: #6b717f;
  color: #d2e1dd;
  border-color: #dadbdf;
}
```

So sánh **meta.load-css()** & **@use()**:  

- Giống nhau:  
    - Chỉ đánh giá module được loaded 1 lần dù load nhiều lần theo nhiều cách khác nhau.  
    - Không thể cấu hình cho module đã được load.  

- Khác nhau:  
    - Không làm cho members của module được load có sẵn trong module hiện tại.  
    - Có thể được sử dụng ở bất kỳ đâu trong stylesheet, kể cả lồng trong các style rules.  
    - URL của module được loaded có thể lấy từ biến hay chứa nội suy #{}.  


## Functions

### 1. meta.calc-args()

Syntax:  

>```scss
>meta.calc-args($calc) // => list
>```

Return a list các arguments được truyền cho calculation đã cho.  

Calculations là các functions tính toán như calc(), clamp(), min(), max().  

Nếu argument là number hoặc a nested calculation, sẽ trả về với kiểu của chính nó. Nếu không sẽ trả về dưới dạng unquoted string

*Ví dụ*:  

```scss
@debug meta.calc-args(calc(100px + 10%)); // unquote("100px + 10%")
@debug meta.calc-args(clamp(50px, var(--width), 1000px)); // 50px, unquote("var(--width)"), 1000px
```


### 2. meta.calc-name()
Syntax:  

>```scss
>meta.calc-name($calc) // => quoted string
>```

Return name của calculation đã cho dưới dạng quoted string.  

*Ví dụ*:  

```scss
@debug meta.calc-name(calc(100px + 10%)); // "calc"
@debug meta.calc-name(clamp(50px, var(--width), 1000px)); // "clamp"
```


### 3. meta.type-of()

Syntax:  

>```scss
>meta.type-of($value) // => unquoted string 
>```

Return a unquoted string, là type của $value.  

Có thể là các giá trị sau: color, number, string, bool, null, list, map, function, calculation, arglist.  

*Ví dụ*:  

```scss
@debug meta.type-of(10px); // number
@debug meta.type-of(10px 20px 30px); // list
@debug meta.type-of(()); // list
```


### 4. meta.inspect()

Syntax:  

>```scss
>meta.inspect($value) // => unquoted string 
>```

Return a unquoted string, là chuỗi biểu diễn của $value.  

Chuỗi trả về có thể không phải CSS hợp lệ.  

Chủ yếu sử dụng cho mục đích debug.  

*Ví dụ*:  

```scss
@debug meta.inspect(10px 20px 30px); // unquote("10px 20px 30px")
@debug meta.inspect(("width": 200px)); // unquote('("width": 200px)')
@debug meta.inspect(null); // unquote("null")
@debug meta.inspect("Helvetica"); // unquote('"Helvetica"')
```


### 5. meta.variable-exists()

Syntax:  

>```scss
>meta.variable-exists($name) // => boolean 
>```

Return a boolean, kiểm tra có tồn tại biến với tên $name (không gồm $) trong scope hiện tại hay không.  

*Ví dụ*:  

```scss
@debug meta.variable-exists("var1"); // false

$var1: value;
@debug meta.variable-exists("var1"); // true

h1 {
  $var2: value;
  @debug meta.variable-exists("var1"); // true
  @debug meta.variable-exists("var2"); // true
}
```


### 6. meta.global-variable-exists()

Syntax:  

>```scss
>meta.global-variable-exists($name, $module: null) // => boolean 
>```

Return a boolean, kiểm tra có tồn tại biến global với tên $name (không gồm $) hay không.  

- Nếu $module là null, sẽ kiểm tra có tồn tại variable với tên $name không có namespace hay không.  
- Nếu $module được truyền, sẽ kiểm tra có tồn tại variable với tên $name trong module tên $module hay không. $module phải khớp với namespace của **@url** rule trong file hiện tại.  

*Ví dụ*:  

```scss
@debug meta.global-variable-exists("var1"); // false

$var1: value;
@debug meta.global-variable-exists("var1"); // true

h1 {
  $var2: value;
  @debug meta.global-variable-exists("var2"); // false
}
```


### 7. meta.module-variables()

Syntax:  

>```scss
>meta.module-variables($module) // => map 
>```

Return a map, chứa toàn bộ variable names được định nghĩa trong $module ánh xạ đến value của những biến này.  

*Note*: $module phải khớp với namespace của **@url** rule trong file hiện tại.  

*Ví dụ*:  

```scss
// _variables.scss
$hopbush: #c69;
$midnight-blue: #036;
$wafer: #e1d7d2;

// styles.scss
@use "sass:meta";
@use "variables";

@debug meta.module-variables("variables");
// (
//   "hopbush": #c69,
//   "midnight-blue": #036,
//   "wafer": #e1d7d2
// )
```


### 8. meta.mixin-exists()

Syntax:  

>```scss
>meta.mixin-exists($name, $module: null) // => boolean 
>```

Return a boolean, kiểm tra có tồn tại mixin có tên $name hay không.  

- Nếu $module là null, sẽ kiểm tra có tồn tại mixin với tên $name không có namespace hay không.  
- Nếu $module được truyền, sẽ kiểm tra có tồn tại mixin với tên $name trong module tên $module hay không. $module phải khớp với namespace của **@url** rule trong file hiện tại.  

*Ví dụ*:  

```scss
@debug meta.mixin-exists("shadow-none"); // false

@mixin shadow-none {
  box-shadow: none;
}

@debug meta.mixin-exists("shadow-none"); // true
```


### 9. meta.content-exists()
Syntax:  

>```scss
>meta.content-exists() // => boolean 
>```

Return a boolean, kiểm tra current mixin có được truyền **@content** block hay không.  

Chỉ có thể sử dụng bên trong mixins, nếu gọi bên ngoài mixin sẽ ném ra lỗi.  

*Ví dụ*:  

```scss
@mixin debug-content-exists {
  @debug meta.content-exists();
  @content;
}

@include debug-content-exists; // false
@include debug-content-exists { // true
  // Content!
}
```


### 10. meta.keywords()
Syntax:  

>```scss
>meta.keywords($args) // => map 
>```

Return a map, chứa các keyword arguments được truyền cho mixin or function mà nhận arbitrary arguments (args tùy ý) dưới dạng unquoted string (không gồm $) ánh xạ đến value của các arguments.  

*Note*: $arg phải là argument list.  

*Ví dụ*:  

```scss
@use "sass:meta";

@mixin syntax-colors($args...) {
  @debug meta.keywords($args);
  // (string: #080, comment: #800, variable: #60b)

  @each $name, $color in meta.keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $comment: #800,
  $variable: #60b,
);
```


### 11. meta.function-exists()
Syntax:  

>```scss
>meta.function-exists($name, $module: null) // => boolean 
>```

Return a boolean, kiểm tra function có tên $name được định nghĩa hay chưa, bao gồm cả built-in & user-defined function.  

$module là optional, nếu $module được truyền, sẽ kiểm tra function có tên $name được định nghĩa trong module với tên $module hay chưa. $module phải khớp với namespace của **@use** rule trong file hiện tại.  

*Ví dụ*:  

```scss
@use "sass:math";

@debug meta.function-exists("div", "math"); // true
@debug meta.function-exists("scale-color"); // true
@debug meta.function-exists("add"); // false

@function add($num1, $num2) {
  @return $num1 + $num2;
}

@debug meta.function-exists("add"); // true
```


### 12. meta.get-function()
Syntax:  

>```scss
>meta.get-function($name, $css: false, $module: null) // => function 
>```

Return a function với tên $name.  

- Nếu $module là null, return function với tên $name không có namespace (bao gồm global built-in functions).  
- Nếu $module được truyền, return function với tên $name trong module tên $module. $module phải khớp với namespace của **@url** rule trong file hiện tại.  

Mặc định sẽ ném ra lỗi nếu $name không tham chiếu tới Sass function, nhưng nếu $css là true sẽ return plain CSS function.  

Function được returned có thể được gọi khi sử dụng **meta.call()**.  

*Ví dụ*:  Xem tại mục **meta.call()**.  


### 13. meta.call()
Syntax:  

>```scss
>meta.call($function, $args...)
>```

Return kết quả khi thực thi $function với đối số $args.  

*Note*: $function phải được returned bởi **meta.get-function()**.  

*Ví dụ*:  

```scss
@use "sass:list";
@use "sass:meta";
@use "sass:string";

/// Return a copy of $list with all elements for which $condition returns `true` removed.
@function remove-where($list, $condition) {
  $new-list: ();
  $separator: list.separator($list);
  @each $element in $list {
    @if not meta.call($condition, $element) {
      $new-list: list.append($new-list, $element, $separator: $separator);
    }
  }
  @return $new-list;
}

$fonts: Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;

content {
  @function contains-helvetica($string) {
    @return string.index($string, "Helvetica");
  }
  font-family: remove-where($fonts, meta.get-function("contains-helvetica"));
}
```


### 14. meta.module-functions()

Syntax:  

>```scss
>meta.module-functions($module) // => map 
>```

Return a map, chứa toàn bộ function names được định nghĩa trong $module ánh xạ đến function values.  

*Note*: $module phải khớp với namespace của **@url** rule trong file hiện tại.  

*Ví dụ*:  

```scss
// _functions.scss
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

// styles.scss
@use "sass:map";
@use "sass:meta";
@use "functions";

@debug meta.module-functions("functions"); // ("pow": get-function("pow"))

@debug meta.call(map.get(meta.module-variables("functions"), "pow"), 3, 4); // 16
```


### 15. meta.feature-exists()

Syntax:  

>```scss
>meta.feature-exists($feature) // => boolean 
>```

Return a boolean, Kiểm tra Sass implementation hiện tại có hỗ trợ tính năng $feature hay không.  

*Note*: $feature phải là string, một số tính năng hiện tại được công nhận:  

- global-variable-shadowing: hỗ trợ set biến global trong local scope khi có !global flag.  
- extend-selector-pseudoclass: hỗ trợ @extend rule ảnh hưởng đến các selector được lồng bên trong pseudo-classes.  
- units-level3: hỗ trợ cả các đơn vị số học được định nghĩa trong CSS values & Units level 3.  
- at-error: hỗ trợ @error rule.  
- custom-property: khai báo custom property không hỗ trợ bất kỳ expression nào khác ngoài nội suy #{}.  

Return false nếu $feature là tính năng không được công nhận.  

*Ví dụ*:  

```scss
@debug meta.feature-exists("at-error"); // true
@debug meta.feature-exists("unrecognized"); // false
```