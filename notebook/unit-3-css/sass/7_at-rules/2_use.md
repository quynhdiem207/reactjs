## 1. @use rule

- Syntax:  
    >```scss
    >@use "<url>";
    >```  
- **@use** cho phép load public members (mixins, functions, variables) từ stylesheet khác, & kết hợp CSS từ nhiều stylesheet lại với nhau.  
- Là "Top-level statement": Chỉ có thể được sử dụng ở top-level của stylesheet, hoặc lồng ở top-level bên trong *CSS statements*: style rules, CSS at-rules, @at-root rule.  

- Stylesheet được load bởi @use được gọi là "module".  
- Sass module URL được load không thể lấy từ biến, cũng không thể sử dụng nội suy (#{}).  
- @use rule phải được đặt trước bất kỳ rules nào khác ngoại trừ @forward, kể cả là style rules. Tuy nhiên có thể khai báo biến trước để sử dụng cấu hình module.  

```scss
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}

// style.scss
@use 'foundation/code';
```

## 2. Loading members

Có thể truy xuất variables, mixins, functions của module khác thông qua **namespace**:  

>```scss
><namespace>.<variable>
><namespace>.<function>()
>@include <namespace>.<mixin>()
>```

Mặc định namespace là last component của module's URL, *ví dụ*:  

```scss
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}

// style.scss
@use "src/corners";

.button {
  @include corners.rounded;
  padding: 5px + corners.$radius;
}
```

CSS output:  
```css
.button {
  border-radius: 3px;
  padding: 8px;
}
```

### ==== Choose namespace ====

Đôi khi muốn đặt namespace khác có thể thực hiện như sau:  
>```scss
>@use "<url>" as <namespace>;
>```

*Ví dụ*:  
```scss
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}

// style.scss
@use "src/corners" as c;

.button {
  @include c.rounded;
  padding: 5px + c.$radius;
}
```

Hoặc có thể không qua namespace:  
>```scss
>@use "<url>" as *;
>```

*Ví dụ*:  
```scss
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}

// style.scss
@use "src/corners" as *;

.button {
  @include rounded;
  padding: 5px + $radius;
}
```

### ==== Private member ====

**Private member**:  
>- Có tên bắt đầu bằng ký tự "-" hoặc "_".  
>- Không thể truy xuất từ bên ngoài (từ các stylesheet load module).  

```scss
$-radius: 3px;
```

## 3. Configuration 

Stylesheet có thể khai báo các biến với **!default** flag để làm chúng có thể cấu hình khi module được loaded.  

Khi load module cùng với cấu hình, sử dụng syntax:  
>```scss
>@use "<url>" with (<variable>: <value>, ...);
>```

Các giá trị được cấu hình sẽ ghi đè default value.  

SCSS input:  
```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

// style.scss
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);
```

CSS output:  
```css
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
}
```

Khi cấu hình cho nhiều biến, nên sử dụng **mixin**: 

- a mixin for setting variables.  
- a mixin for injecting styles.  

*Ví dụ*:  
```scss
// _library.scss
$-black: #000;
$-border-radius: 0.25rem;
$-box-shadow: null;

/// If the user has configured `$-box-shadow`, returns their configured value.
/// Otherwise returns a value derived from `$-black`.
@function -box-shadow() {
  @return $-box-shadow or (0 0.5rem 1rem rgba($-black, 0.15));
}

@mixin configure($black: null, $border-radius: null, $box-shadow: null) {
  @if $black {
    $-black: $black !global;
  }
  @if $border-radius {
    $-border-radius: $border-radius !global;
  }
  @if $box-shadow {
    $-box-shadow: $box-shadow !global;
  }
}

@mixin styles {
  code {
    border-radius: $-border-radius;
    box-shadow: -box-shadow();
  }
}

// style.scss
@use 'library';

@include library.configure(
  $black: #222,
  $border-radius: 0.1rem
);

@include library.styles;
```

## 4. Finding the module 

- Sass load files by *URL* not *file path*, do vậy luôn sử dụng forward slash "/".  
- Không cần viết rõ extension của file muốn load, sass sẽ tự động load các file ".css" or ".scss" or ".sass"  

### ==== Load path ====

Là path trên file system mà Sass sẽ xem xét khi định vị module.  

*Ví dụ*: Nếu truyền "node_modules/susy/sass" làm load path thì chỉ cần sử dụng (@use 'susy';) thay vì (@use 'node_modules/susy/sass/susy.scss').  

Sass sẽ tìm kiếm các module tương đối với file hiện tại, nếu không có file nào khớp mới sử dụng load path.  

Không cần sử dụng "./" để load tương đối.  

### ==== Partials ====

- Các file có tên bắt đầu bằng "_" được gọi là partials.  
- Sass sẽ không cố gắng tự biên dịch các file này.  
- Khi load partials thì URL có thể bỏ đi ký tự "_".  

### ==== Index files ====

Các file có tên "index" sẽ được tự động load khi load URL của directory, eg: _index.scss.  

```scss
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}

// foundation/_index.scss
@use 'code';

// style.scss
@use 'foundation';
```


## 5. Loading CSS

Ngoài load các file ".scss" & ".sass" cũng có thể load các file ".css" dưới dạng module, nhưng css module sẽ không có các tính năng của sass.  

```scss
// code.css
code {
  padding: .25em;
  line-height: 0;
}

// style.scss
@use 'code';
```