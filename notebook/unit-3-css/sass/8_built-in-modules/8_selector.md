# --- sass:selector ---

**sass:selector** cung cấp quyền truy xuất vào selector engine của Sass.  

>```scss
>@use "sass:selector";
>```


## Selector values

Các functions trong module này kiểm tra & thao tác các selectors.  

Khi những functions này trả về một selector, luôn là selector list với các element được ngăn cách nhau bởi ký tự ",". Element trong selector list là sub-list (complex selectors) chứa các unquoted string (compound selectors - selector phức hợp) được ngăn cách nhau nhau bởi ký tự " ".  

```scss
// .main aside:hover, .sidebar p
@debug (
    (unquote(".main") unquote("aside:hover")),
    (unquote(".sidebar") unquote("p"))
);
```

Selector arguments cho những function này có thể ở cùng format, nhưng chúng có thể là chuỗi thông thường (quoted or unquoted), hoặc a combination, *ví dụ*: ".main aside:hover, .sidebar p" là selector argument hợp lệ.  


## 1. selector.append()

Syntax:  

>```scss
>selector.append($selectors...) // => selector
>```

Return selector được kết hợp bởi tất cả các $selectors mà không chứa descendant combinator, tức là khong chứa ký tự space " " trong selector được trả về.  

Return selector list nếu bất kỳ selector nào trong $selectors là list, lúc này mỗi complex selector sẽ được kết hợp riêng biệt.  

*Note*: $selectors có thể chứa placeholder selector, nhưng không thể chứa parent selector **&**.  

*Ví dụ*:  

```scss
@debug selector.append("a", ".disabled"); // a.disabled
@debug selector.append(".accordion", "__copy"); // .accordion__copy
@debug selector.append(".accordion", "__copy, __image");
// .accordion__copy, .accordion__image
```


## 2. selector.nest()

Syntax:  

>```scss
>selector.nest($selectors...) // => selector
>```

Return selector được kết hợp như thể được lồng vào nhau.  

Return selector list nếu bất kỳ selector nào trong $selectors là list, lúc này mỗi complex selector sẽ được kết hợp riêng biệt.  

*Note*: $selectors có thể chứa placeholder selector, ngoại trừ first argument selector các selector còn lại đều có thể chứa parent selector **&**.  

*Ví dụ*:  

```scss
@debug selector.nest("ul", "li"); // ul li
@debug selector.nest(".alert, .warning", "p"); // .alert p, .warning p
@debug selector.nest(".alert", "&:hover"); // .alert:hover
@debug selector.nest(".accordion", "&__copy"); // .accordion__copy
```


## 3. selector.replace()

Syntax:  

>```scss
>selector.replace($selector, $original, $replacement) // => selector
>```

Return selector là copy của $selector với $original được thay thế bởi $replacement.  

Nếu $selector không chứa $original thì sẽ trả về chính nó.  

Sử dụng sự hợp nhất thông minh của @extend.  

*Note*: $selector, $original & $replacement có thể chứa placeholder selector, nhưng không thể chứa parent selector **&**.  

*Ví dụ*:  

```scss
@debug selector.replace("a.disabled", "a", ".link"); // .link.disabled
@debug selector.replace("a.disabled", "h1", "h2"); // a.disabled
@debug selector.replace(".guide .info", ".info", ".content nav.sidebar");
// .guide .content nav.sidebar, .content .guide nav.sidebar
```


## 4. selector.extend()

Syntax:  

>```scss
>selector.extend($selector, $extendee, $extender) // => selector
>```

Return selector là copy của $selector được sửa đổi với **@extend** rule:  
```scss
#{$extender} {
    @extend #{$extendee};
}
```

Thực chất là thay thế tất cả $extendee trong $selector bởi $extendee, $extender.  

Nếu $selector không chứa $extendee thì trả lại chính nó.  

*Note*: $selector, $extendee & $extender có thể chứa placeholder selector, nhưng không thể chứa parent selector **&**.  

*Ví dụ*:  

```scss
@debug selector.extend("a.disabled", "a", ".link"); // a.disabled, .link.disabled
@debug selector.extend("a.disabled", "h1", "h2"); // a.disabled
@debug selector.extend(".guide .info", ".info", ".content nav.sidebar");
// .guide .info, .guide .content nav.sidebar, .content .guide nav.sidebar
```


## 5. selector.unify()

Syntax:  

>```scss
>selector.unify($selector1, $selector2) // => selector | null
>```

Return selector khớp với tất cả các elements khớp bởi cả $selector1 & $selector2.  

Return null nếu $selector1 & $selector2 không khớp với cùng 1 phần tử bất kỳ, hoặc không có selector nào có thể biểu hiện sự chồng chéo giữa chúng.  

*Note*: Giống như các selectors được tạo bởi **@extend**, selector được trả về có thể không đảm bảo sẽ khớp với tất cả các elements khớp với cả $selector1 & $selector2 nếu chúng là complex selector.  

*Ví dụ*:  

```scss
@debug selector.unify("a", ".disabled"); // a.disabled
@debug selector.unify("a.disabled", "a.outgoing"); // a.disabled.outgoing
@debug selector.unify("a", "h1"); // null
@debug selector.unify(".warning a", "main a"); // .warning main a, main .warning a
```


## 6. selector.parse()

Syntax:  

>```scss
>selector.parse($selector) // => selector
>```

Return $selector ở selector value format.  

*Ví dụ*:  

```scss
// (
//      (unquote(".main") unquote("aside:hover")),
//      (unquote(".sidebar") unquote("p"))
// )
@debug selector.parse(".main aside:hover, .sidebar p");
```


## 7. selector.simple-selectors()

Syntax:  

>```scss
>selector.simple-selectors($selector) // => list
>```

Return list các simple selector trong $selector.  

List được trả về với các elements được ngăn cách nhau bởi comma "," và simple selectors là unquoted strings.  

Trong đó, $selector phải là single string chứa compound selector - selector phức hợp, có nghĩa nó sẽ không chứa các combinators (bao gồm space) hoặc comma ",".  

*Ví dụ*:  

```scss
@debug selector.simple-selectors("a.disabled"); // a, .disabled
@debug selector.simple-selectors("main.blog:after"); // main, .blog, :after
```


## 8. selector.is-superselector()

Syntax:  

>```scss
>selector.is-superselector($super, $sub) // => boolean
>```

Return a boolean, kiểm tra xem tất cả các elements khớp với $sub selector có khớp với $super selector hay không .  

Vẫn return true khi $super khớp với nhiều elements hơn $sub.  

*Note*: $super & $sub có thể chứa placeholder selector, nhưng không thể chứa parent selector **&**.

*Ví dụ*:  

```scss
@debug selector.is-superselector("a", "a.disabled"); // true
@debug selector.is-superselector("a.disabled", "a"); // false
@debug selector.is-superselector("a", "sidebar a"); // true
@debug selector.is-superselector("sidebar a", "a"); // false
@debug selector.is-superselector("a", "a"); // true
```
