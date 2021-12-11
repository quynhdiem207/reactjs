## 1. Overview about flow control

Sass cung cấp một số at-rules giúp kiểm soát việc có phát styles hay không, hoặc số lần styles được phát.  

- **@if** ... **@else**: Kiểm soát a block có được đánh giá hay không.    
- **@each**: Đánh giá a block cho mỗi element trong list hoặc mỗi cặp trong map.    
- **@for**: Đánh giá a block với số lần xác định.    
- **@while**: Đánh giá a block cho đến khi đáp ứng điều kiện nhất định.    

Tất cả flow control at-rules đều *"là universal statement"* có thể sử dụng ở bất cứ đâu.  


## 2. Truthiness and Falsiness ===

Bất cứ nơi nào giá trị boolean (true & false) được cho phép, đều có thể sử dụng các giá trị khác thay thế, Sass sẽ tự động convert chúng về boolean.  

- Các giá trị khi convert về boolean có giá false được gọi là falsy, bao gồm: null & false.  
- Các giá trị khi convert về boolean có giá true được gọi là truthy, bao gồm: Tất cả các giá trị ngoài false & null.  


## 3. @if & @else at-rules

### === @if ===

**@if** kiểm soát block có được đánh giá hay không (bao gồm việc phát styles dưới dạng CSS). Nếu expression return truthy, block sẽ được đánh giá.  

Syntax:  
>```scss
>@if <expression> { ... }
>```

*Ví dụ*:  

SCSS input:  
```scss
@mixin avatar($size, $circle: false) {
  width: $size;
  height: $size;

  @if $circle {
    border-radius: $size / 2;
  }
}

.square-av {
  @include avatar(100px, $circle: false);
}
.circle-av {
  @include avatar(100px, $circle: true);
}
```

CSS output:  
```css
.square-av {
  width: 100px;
  height: 100px;
}

.circle-av {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
```

### === @else ===

Syntax:  
>```scss
>@if <expression> { ... }
>@else { ... }
>```

Nếu expression return falsy, block của **@else** sẽ được đánh giá.  

Trong Sass, các giá trị falsy bao gồm: false & null.  

*Ví dụ*:  

SCSS input:  
```scss
$light-background: #f2ece4;
$light-text: #036;
$dark-background: #6b717f;
$dark-text: #d2e1dd;

@mixin theme-colors($light-theme: true) {
  @if $light-theme {
    background-color: $light-background;
    color: $light-text;
  } @else {
    background-color: $dark-background;
    color: $dark-text;
  }
}

.banner {
  @include theme-colors($light-theme: true);
  body.dark & {
    @include theme-colors($light-theme: false);
  }
}
```

CSS output:  
```css
.banner {
  background-color: #f2ece4;
  color: #036;
}
body.dark .banner {
  background-color: #6b717f;
  color: #d2e1dd;
}
```

### === @else if ===

Syntax:  
>```scss
>@if <expression> { ... }
>@else if <expresion> { ... }
>```

Block của **@else if** được đánh giá nếu expression của **@if** return falsy & expression của **@else if** return truthy.  

*Ví dụ*:  

SCSS input:  
```scss
@use "sass:math";

@mixin triangle($size, $color, $direction) {
  height: 0;
  width: 0;

  border-color: transparent;
  border-style: solid;
  border-width: math.div($size, 2);

  @if $direction == up {
    border-bottom-color: $color;
  } @else if $direction == right {
    border-left-color: $color;
  } @else if $direction == down {
    border-top-color: $color;
  } @else if $direction == left {
    border-right-color: $color;
  } @else {
    @error "Unknown direction #{$direction}.";
  }
}

.next {
  @include triangle(5px, black, right);
}
```

CSS output:  
```css
.next {
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 2.5px;
  border-left-color: black;
}
```


## 4. @each at-rule

**@each** thực hiện lặp qua list hoặc map & đánh giá block cho mỗi lần lặp.  

### === list ===

Syntax:  
>```scss
>@each <variable> in <expression> { ... }
>```

- expression trả về a list, mỗi lần lặp phần tử trong list được gán cho variable.  
- **@each** lặp qua mỗi phần tử trong list & đánh giá block cho mỗi phần tử.  

*Ví dụ*:  

SCSS input:  
```scss
$sizes: 40px, 50px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```

CSS output:  
```css
.icon-40px {
  font-size: 40px;
  height: 40px;
  width: 40px;
}

.icon-50px {
  font-size: 50px;
  height: 50px;
  width: 50px;
}
```

### === map ===

Syntax:  
>```scss
>@each <variable>, <variable> in <expression> { ... }
>```

- expression trả về a map, mỗi lần lặp key được gán cho variable thứ 1 & value được gán cho variable thứ 2.  
- **@each** lặp qua mỗi cặp key-value trong map & đánh giá block cho mỗi cặp key-value.  

*Ví dụ*:  

SCSS input:  
```scss
$icons: ("start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}
```

CSS output:  
```css
@charset "UTF-8";

.icon-start:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
}

.icon-stop:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
}
```

### === Destructuring ===

Syntax:  
>```scss
>@each <variable...> in <expression> { ... }
>```

- expression trả về a list chứa các inner list.  
- **@each** lặp qua mỗi inner list & đem các values gán cho các variables theo cấu trúc tương ứng của inner list, nếu số lượng values không đủ so với số lượng variables thì các variables còn lại sẽ mang giá trị null.  

*Ví dụ*:

SCSS input:  
```scss
$icons: "start" "\f12e" 16px, "stop" "\f12f" 10px;

@each $name, $glyph, $size in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
    font-size: $size;
  }
}
```

CSS output:  
```css
@charset "UTF-8";

.icon-start:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
  font-size: 16px;
}

.icon-stop:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
  font-size: 10px;
}
```


## 5. @for at-rule

Syntax:  
>```scss
>@for <variable> from <expression> to <expression> { ... } 
>
>// or 
>
>@for <variable> from <expression> through <expression> { ... }
>```

- expression trả về giá trị là các numbers.  
- **@for** thực hiện lặp, đếm lên hoặc xuống 1 number có giá trị từ value mà expression thứ 1 trả về đến value mà expression thứ 2 trả về. Mỗi lần lặp giá trị của number được gán cho variable & đánh giá block cho mỗi lần.  
- Nếu sử dụng **to**, sẽ không lặp qua number trả về từ expression 2.  
- Nếu sử dụng **through**, sẽ lặp qua number trả về từ expression 2.  

*Ví dụ*:  

SCSS input:  
```scss
$base-color: #036;

@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```

CSS output:  
```css
ul:nth-child(3n + 1) {
  background-color: #004080;
}

ul:nth-child(3n + 2) {
  background-color: #004d99;
}

ul:nth-child(3n + 3) {
  background-color: #0059b3;
}
```


## 6. @while at-rule

Syntax:  
>```scss
>@while <expression> { ... }
>```

**@while** thực hiện lặp việc đánh giá block cho đến khi expression trả về giá trị falsy.  

**Ví dụ*:  

SCSS input:  
```scss
@use "sass:math";

/// Divides `$value` by `$ratio` until it's below `$base`.
@function scale-below($value, $base, $ratio: 1.618) {
  @while $value > $base {
    $value: math.div($value, $ratio);
  }
  @return $value;
}

$normal-font-size: 16px;

sup {
  font-size: scale-below(20px, 16px);
}
```

CSS output:  
```css
sup {
  font-size: 12.36094px;
}
```