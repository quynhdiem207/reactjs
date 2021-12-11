## 1. CSS at-rules

Sass hỗ trợ tất cả các at-rules của CSS.  

>```scss
>@<name> <value>;
>// or
>@<name> { ... }
>// or
>@<name> <value> { ... }
>```

Có thể sử dụng nội suy **#{}** trong name & value.  

Nếu CSS at-rules được lồng bên trong style rules thì chúng sẽ tự động hoán đổi vị trí để CSS at-rules ở top-level của CSS output & style rules ở bên trong nó.  

SCSS input:  
```scss
.print-only {
  display: none;

  @media print { display: block; }
}
```

CSS output:  
```css
.print-only {
  display: none;
}
@media print {
  .print-only {
    display: block;
  }
}
```


## 2. @media at-rule

**@media** giúp áp dụng các styles khác nhau cho các types/devices khác nhau.  

Syntax:  
>```css
>@media [not|only] <media-type> and (media-feature and|or|not media-feature) {
>   /* styles */
>}
>```

Xem chi tiết về [@media](https://www.w3schools.com/cssref/css3_pr_mediaquery.asp).  

Có thể sử dụng SassScript expression trong media query.  

*Ví dụ*:  
  
```scss
$layout-breakpoint-small: 960px;

@media (min-width: $layout-breakpoint-small) {
  .hide-extra-small {
    display: none;
  }
}
```

Ngoài ra còn hỗ trợ media lồng nhau:  

SCSS input:  
```scss
@media (hover: hover) {
  .button:hover {
    border: 2px solid black;

    @media (color) {
      border-color: #036;
    }
  }
}
```

CSS output:  
```css
@media (hover: hover) {
  .button:hover {
    border: 2px solid black;
  }
}

@media (hover: hover) and (color) {
  .button:hover {
    border-color: #036;
  }
}
```


## 3. @supports at-rule

**@supports** giúp kiểm tra browser có hỗ trợ CSS property nào đó hay không.  

Syntax:  
>```css
>@support [not] (<property>: <expression>) and|or (<property>: <expression>) {
>   /* styles */
>}
>```

Xem chi tiết về [@supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports).  

*Ví dụ*:  

SCSS input:  
```scss
@mixin sticky-position {
  position: fixed;
  @supports (position: sticky) {
    position: sticky;
  }
}

.banner {
  @include sticky-position;
}
```

CSS output:  
```css
.banner {
  position: fixed;
}

@supports (position: sticky) {
  .banner {
    position: sticky;
  }
}
```


## 4. @keyframes at-rule

**@keyframes** giúp xác định animation code.  

Syntax:  
>```css
>@keyframes <name> {
>   selector { /* styles */ }
>}
>```

selector của **@keyframes** gồm: **from**, **to** **\<number\>%**.  

Xem chi tiết về [@keyframes](https://www.w3schools.com/cssref/css3_pr_animation-keyframes.asp).  

*Ví dụ*:  

```scss
@keyframes slide-in {
  from {
    margin-left: 100%;
    width: 300%;
  }

  70% {
    margin-left: 90%;
    width: 150%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```