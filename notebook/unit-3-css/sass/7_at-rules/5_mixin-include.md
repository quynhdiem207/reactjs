## 1. @mixin & @include rules

### ==== mixins ====

- Mixins có thể chứa style rules của chính nó, cái mà có thể được included ở top-level của stylesheet, hoặc có thể được lồng bên trong các rules khác.  
- Hoặc mixins có thể được sử dụng để đóng gói các styles mà có thể được có thể đưa vào trong style rules.  
- Ngoài ra, mixins còn được dùng để sửa đổi giá trị biến.  

### ==== @mixin ====

**@mixin**: Cho phép định nghĩa các styles có thể tái sử dụng trong stylesheet.  

- Syntax:  
    >```scss
    >@mixin <name> { ... }
    >
    >// or 
    >
    >@mixin <name>(<arguments...>) { ... }
    >```  

- Là "Top-level statement": Chỉ có thể được sử dụng ở top-level của stylesheet, hoặc lồng ở top-level bên trong *CSS statements*: style rules, CSS at-rules, @at-root rule.  
- Mixins có thể chứa bất kỳ statements nào, ngoại trừ **"Top-level statement"**: @use, @forward, @import, @function, @mixin.  

### === @include ===

**@include**: Cho phép include mixins vào current context.  

- Syntax:  
    >```scss
    >@include <name>;
    >
    >// or
    >
    >@include <name>(<arguments...>);
    >```

- Là "CSS statement": Có thể được sử dụng ở bất cứ đâu, ngoại trừ bên trong **@function**.  

### === Ví dụ ===

SCSS input:  
```scss
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin horizontal-list {
  @include reset-list;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: 2em;
    }
  }
}

nav ul {
  @include horizontal-list;
}
```

CSS output:  
```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav ul li {
  display: inline-block;
  margin-left: -2px;
  margin-right: 2em;
}
```


## 2. Arguments

Mixins cũng có thể nhận các đối số, cho phép mixins tùy chỉnh hành vi mỗi lần được gọi.  

>```scss
>@mixin <name>(<arguments...>) { ... }
>```

*Ví dụ*:  

SCSS input:  
```scss
@mixin rtl($property, $ltr-value, $rtl-value) {
  #{$property}: $ltr-value;

  [dir=rtl] & {
    #{$property}: $rtl-value;
  }
}

.sidebar {
  @include rtl(float, left, right);
}
```

CSS output:  
```css
.sidebar {
  float: left;
}

[dir=rtl] .sidebar {
  float: right;
}
```

### === 1, Optional Arguments ===

Các đối số của mixins cũng có thể là optional, nếu xác định default value cho chúng:  

>```scss
>@mixin <name>(<variable>: <expression>, ... ) { ... }
>```

*Ví dụ*:

```scss
@mixin replace-text($image, $x: 50%, $y: 50%) {
  text-indent: -99999em;
  overflow: hidden;
  text-align: left;

  background: {
    image: $image;
    repeat: no-repeat;
    position: $x $y;
  }
}

.mail-icon {
  @include replace-text(url("/images/mail.svg"), 0);
}
```

### === 2, Keyword Arguments ===

Khi mixins được included, arguments có thể được truyền bằng name thay vì vị trí của chúng trong argument list.

Hữu ích khi mixins có nhiều optional arguments.  

>```scss
>@include <name>(<variable>: <expression>, ...);
>```

*Ví dụ*:  

SCSS  input:  
```scss
@mixin square($size, $radius: 0) {
  width: $size;
  height: $size;

  @if $radius != 0 {
    border-radius: $radius;
  }
}

.avatar {
  @include square(100px, $radius: 4px);
}
```

CSS output:  
```css
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 4px;
}
```

### === 3, Taking Arbitrary Arguments ===

Đôi khi muốn mixins nhận số lượng arguments tùy ý, khai báo last argument kết thúc bởi "...", như vậy tất cả các extra arguments (arguments bổ sung) sẽ được truyền cho last argument dưới dạng 1 list. Đối số này được gọi là 1 **argument list**.  

>```scss
>@mixin <name>(..., <arguments...>) { ... }
>```

*Ví dụ*:  

SCSS input:  
```scss
@mixin order($height, $selectors...) {
  @for $i from 0 to length($selectors) {
    #{nth($selectors, $i + 1)} {
      position: absolute;
      height: $height;
      margin-top: $i * $height;
    }
  }
}

@include order(150px, "input.name", "input.address", "input.zip");
```

CSS output:  
```css
input.name {
  position: absolute;
  height: 150px;
  margin-top: 0px;
}

input.address {
  position: absolute;
  height: 150px;
  margin-top: 150px;
}

input.zip {
  position: absolute;
  height: 150px;
  margin-top: 300px;
}
```

### === 4, Taking Arbitrary Keyword Arguments ===

Argument list cũng có thể được sử dụng để nhận keyword arguments tùy ý.  

**meta.keywords()** nhận argument list & return bất cứ extra keywords nào dưới dạng a **map**.  

>```scss
>@mixin <name>(..., <arguments...>) { ... }
>```

*Ví dụ*:  

SCSS input:  
```scss
@use "sass:meta";

@mixin syntax-colors($red, $args...) {
    @debug $red; // #f00
    @debug meta.keywords($args);
    // (string: #080, comment: #800, variable: #60b)

    @each $name, $color in meta.keywords($args) {
        pre span.stx-#{$name} {
            color: $color;
        }
    }
}

@include syntax-colors(
    #f00,
    $string: #080,
    $comment: #800,
    $variable: #60b,
);
```

CSS output:  
```css
pre span.stx-string {
  color: #080;
}

pre span.stx-comment {
  color: #800;
}

pre span.stx-variable {
  color: #60b;
}
```

### === 5, Passing Arbitrary Arguments ===

Giống như argument list cho phép mixins nhận positional & keyword arguments tùy ý, tương tự cũng có thể truyền last argument của **@include** là a list theo sau bởi "..." của các positional & keyword arguments cho mixins. Các phần tử của list được coi là argument bổ sung.  

>```scss
>@include <name>(..., <arguments...>);
>```

*Ví dụ*:  

```scss
$form-selectors: "input.name", "input.address", "input.zip" !default;

@include order(150px, $form-selectors...);
```


## 3. Content blocks

Ngoài nhận arguments, mixins cũng có thể nhận toàn bộ block của styles, được gọi là **content block**.  

Một mixin có thể khai báo rằng nó nhận content block bằng cách bao gồm **@content** trong body.  

>```scss
>@mixin <name> {
>    @content;
>}
>
>@include <name> { ... }
>```

*Ví dụ*:  

SCSS input:  
```scss
@mixin hover {
  &:not([disabled]):hover {
    @content;
  }
}

.button {
  border: 1px solid black;
  @include hover {
    border-width: 2px;
  }
}
```

CSS output:  
```css
.button {
  border: 1px solid black;
}

.button:not([disabled]):hover {
  border-width: 2px;
}
```

### === Passing Arguments to Content Blocks ===

Mixins cũng có thể truyền arguments cho content block của nó:  

>```scss
>@mixin <name> {
>    @content(<arguments...>);
>}
>
>@include <name> using (<arguments...>) { ... }
>```

*Ví dụ*:  

SCSS input:  
```scss
@mixin media($types...) {
  @each $type in $types {
    @media #{$type} {
      @content($type);
    }
  }
}

@include media(screen, print) using ($type) {
  h1 {
    font-size: 40px;
    @if $type == print {
      font-family: Calluna;
    }
  }
}
```

CSS output:  
```css
@media screen {
  h1 {
    font-size: 40px;
  }
}
@media print {
  h1 {
    font-size: 40px;
    font-family: Calluna;
  }
}
```


## 4. Indented Mixin Syntax

Indented syntax (.sass file) có thể định nghĩa mixin bằng cách sử dụng ký tự "**=**" & include mixin bằng cách sử dụng ký tự "**+**".  

>```scss
>=<name>(<arguments...>)
>    ...
>
>+<name>(<arguments...>)
>```

*Ví dụ*:  

```scss
=reset-list
  margin: 0
  padding: 0
  list-style: none

=horizontal-list
  +reset-list

  li
    display: inline-block
    margin:
      left: -2px
      right: 2em

nav ul
  +horizontal-list
```