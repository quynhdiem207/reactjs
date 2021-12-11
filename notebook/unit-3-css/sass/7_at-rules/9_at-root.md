## 1. @at-root rule

**@at-root** khiến mọi thứ bên trong nó được phát ra ở gốc của document, thay vì sử dụng lồng thông thường.  

Syntax:  
>```scss
>@at-root { 
>   selctor { ... }
>   selctor { ... }
>}
>
>// shorthand
>@at-root <selector> { ... }
>```

Thường được sử dụng nhất khi thực hiện advance nesting với parent selector **&** và built-in sass:selector functions.  

Là *"CSS statement"* có thể sử dụng ở bất kỳ đâu, ngoại trừ trong **@function**.  

*Ví dụ*: Viết 1 selector khớp với outer selector & 1 element selector.  

**selector.unify()** trả về selector khớp với tất cả các selector được truyền cho nó hoặc null nếu không có element nào khớp.  

SCSS input:  
```scss
@use "sass:selector";

@mixin unify-parent($child) {
  @at-root #{selector.unify(&, $child)} {
    @content;
  }
}

.wrapper .field {
  @include unify-parent("input") {
    /* ... */
  }
  @include unify-parent("select") {
    /* ... */
  }
}
```

CSS output:  
```css
.wrapper input.field {
  /* ... */
}

.wrapper select.field {
  /* ... */
}
```


## 2. Beyond Style Rules

Về bản chất **@at-root** đơn giản là thoát khỏi style rules. Mặc định, bất kỳ at-rules nào như **@media** or **@supports** đều sẽ được để lại bên trong. Tuy nhiên, cũng có thể kiểm soát những gì **@at-root** include or exclude theo syntax:  

>```scss
>@at-root (with: <rules...>) { ... }
>
>// or
>
>@at-root (without: <rules...>) { ... }
>```

- **(with: ...)** query: exclude tất cả các rules ngoại trừ những rule được liệt kê.  
- **(without: ...)** query: exclude những rule được liệt kê.  

Có 2 giá trị đặc biệt có thể được sử dụng trong query:  

- **rule**: đề cập đến style rules.  
    eg: @at-root (with: rule) exclude tất cả các rules nhưng giữ nguyên style rules.  
- **all**: đề cập đến tất cả các rules, & style rules nên bị loại bỏ.  

SCSS input:  
```scss
@media print {
  .page {
    width: 8in;

    @at-root (without: media) {
      color: #111;
    }

    @at-root (with: rule) {
      font-size: 1.2em;
    }
  }
}
```

CSS output:  
```css
@media print {
  .page {
    width: 8in;
  }
}

.page {
  color: #111;
}

.page {
  font-size: 1.2em;
}
```