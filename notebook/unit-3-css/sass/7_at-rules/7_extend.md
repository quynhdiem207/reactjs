## 1. @extend rule

**@extend** cho phép a selector kế thừa styles của selector khác.  

Syntax:  
>```scss
>@extend <selector...>;
>```

**@extend** được sử dụng trong các style rules.  

*Ví dụ*:  

```scss
.error {
    border: 1px #f00;
    background-color: #fdd;

    &:hover {
        background-color: #fee;
    }

    &--serious {
        @extend .error;
        border-width: 3px;
    }
}
```

**Note**: **@extend** sẽ được resolved sau khi stylesheet đã được compiled, lúc này trong ví dụ trên parent selector "**&**" cũng đã được resolved, nên sẽ không ảnh hưởng đến inner selector trong ".error { &--serious { ... } }".  

SCSS input:  
```scss
.error {
    border: 1px #f00;
    background-color: #fdd;
}

.error:hover {
  background-color: #fee;
}

.error--serious {
  @extend .error;
  border-width: 3px;
}
```

CSS output:  
```css
.error, .error--serious {
    border: 1px #f00;
    background-color: #fdd;
}

.error:hover, .error--serious:hover {
    background-color: #fee;
}

.error--serious {
    border-width: 3px;
}
```


## 2. How it works

Không giống **@mixin** copy styles vào current style rule, **@extend** update các style rules mà chứa selector được extended để chúng cũng chứa các selector sẽ thực hiện extending.  

Khi extend Sass sẽ thực hiện hợp các selectors một cách thông minh, *ví dụ*:    

SCSS input:  
```scss
.content nav.sidebar {
  @extend .info;
}

// Không được extended vì `p` không tương thích với `nav`.
p.info {
  background-color: #dee9fc;
}

//Không biết `<div class="guide">` ở bên trong hay ngoài `<div class="content">`,
// nên để an toàn Sass sẽ tạo cả 2.
.guide .info {
  border: 1px solid rgba(#000, 0.8);
  border-radius: 2px;
}

// Sass biết mọi element khớp "main.content" cũng khớp ".content",
// và tránh tạo các selector xen kẽ không cần thiết.
main.content .info {
  font-size: 0.8em;
}
```

CSS output:  
```css
p.info {
  background-color: #dee9fc;
}

.guide .info, .guide .content nav.sidebar, .content .guide nav.sidebar {
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 2px;
}

main.content .info, main.content nav.sidebar {
  font-size: 0.8em;
}
```


## 3. Placeholder selector

- Placeholder selector là style rules mà chỉ dự định để được extended.  
- Placeholder selector bắt đầu bởi ký tự **%**.  
- Placeholder selector không được included trong CSS output, nhưng các selectors extend nó sẽ được included trong CSS output.  

*Ví dụ*:  

SCSS input:  
```scss
.alert:hover, %strong-alert {
  font-weight: bold;
}

%strong-alert:hover {
  color: red;
}
```

CSS output:  
```css
.alert:hover {
  font-weight: bold;
}
```

*Ví dụ*:  

SCSS input:  
```scss
%toolbelt {
    box-sizing: border-box;
    border-top: 1px rgba(#000, .12) solid;
    padding: 16px 0;
    width: 100%;

    &:hover { border: 2px rgba(#000, .5) solid; }
}

.action-buttons {
    @extend %toolbelt;
    color: #4285f4;
}

.reset-buttons {
    @extend %toolbelt;
    color: #cddc39;
}
```

CSS output:  
```css
.action-buttons, .reset-buttons {
  box-sizing: border-box;
  border-top: 1px rgba(0, 0, 0, 0.12) solid;
  padding: 16px 0;
  width: 100%;
}

.action-buttons:hover, .reset-buttons:hover {
  border: 2px rgba(0, 0, 0, 0.5) solid;
}

.action-buttons {
  color: #4285f4;
}

.reset-buttons {
  color: #cddc39;
}
```

### ==== Private Placeholders ====

- Giống như module members, private placeholder selectors có name bắt đầu bởi ký tự "-" or "_".  
- Private placeholders chỉ có thể được extended trong stylesheet định nghĩa nó. Khi được load bởi other stylesheet no như thể không tồn tại, không thể truy xuất.  


## 4. Extension Scope

Khi a stylesheet extend a selector, that extension sẽ chỉ ảnh hưởng đến các style rules được định nghĩa trong upstream modules (là các modules được loaded bởi stylesheet đó sử dụng @use hoặc @forward, & các modules được loaded bởi những modules này, ...)  

Extensions hoàn toàn không có phạm vi nếu sử dụng @import, điều này làm ảnh hưởng đến tất cả các style rules được import & các style rules định nghĩa trong stylesheet này.  


## 5. Mandatory and Optional Extends

Thông thường, nếu **@extend** không khớp với bất kỳ selector nào trong stylesheet, sẽ gây ra lỗi. Sass yêu cầu các selectors được extended tồn tại là bắt buộc.

Sử dụng **!optional** flag để **@extend** sẽ không thực thi bất cứ điều gì nếu selector không tồn tại, sẽ không gây ra lỗi.  

>```scss
>@extend <selector> !optional;
>```


## 6. Extends or Mixins?

Cả mixins & extends đều là cách đóng gói & tái sử dụng các styles trong Sass.  

- Sử dụng mixins khi:  
    - Cấu hình cho styles sử dụng arguments.  
    - Tập hợp các styles là non-semantic (không có ngữ nghĩa).  

- Sử dụng extends khi:  
    - Thể hiện mối quan hệ giữa các semantic selectors.  


## 7. Limitations

### === Disallowed Selectors ===

Chỉ extend các selector đơn giản (các selector riêng lẻ) như ".info"

```scss
.alert {
  @extend .message.info;
  //      ^^^^^^^^^^^^^
  // Error: Write @extend .message, .info instead.

  @extend .main .info;
  //      ^^^^^^^^^^^
  // Error: write @extend .info instead.
}
```

### === HTML Heuristics ===

Khi @extend xen kẽ các selector phức tạp, nó không tạo ra tất cả các kết hợp có thể có của các selector tổ tiên. Nhiều selector mà nó có thể tạo ra không chắc thực sự khớp với HTML thực và việc tạo tất cả chúng sẽ làm cho các stylesheet quá lớn mà giá trị thực rất ít. 

Thay vào đó, sử dụng một **heuristic**: giả định rằng tổ tiên của mỗi selector sẽ là độc lập, không bị xen kẽ với bất kỳ tổ tiên nào khác của selector, *Ví dụ*:  

SCSS input:  
```scss
header .warning li {
  font-weight: bold;
}

aside .notice dd {
  // Sass doesn't generate CSS to match the <dd> in
  //
  // <header>
  //   <aside>
  //     <div class="warning">
  //       <div class="notice">
  //         <dd>...</dd>
  //       </div>
  //     </div>
  //   </aside>
  // </header>
  //
  // because matching all elements like that would require us to generate nine
  // new selectors instead of just two.
  @extend li;
}
```

CSS output:  
```css
header .warning li, header .warning aside .notice dd, aside .notice header .warning dd {
  font-weight: bold;
}
```

### === Extend in @media ===

Mặc dù **@extend** được cho phép trong **@media** và các CSS at-rules khác, nó không được phép extend các selector xuất hiện bên ngoài at-rule của nó.

```scss
@media screen and (max-width: 600px) {
  .error--serious {
    @extend .error;
    //      ^^^^^^
    // Error: ".error" was extended in @media, but used outside it.
  }
}

.error {
  border: 1px #f00;
  background-color: #fdd;
}
```