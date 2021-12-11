## 1. @import rule

- Syntax:  
    >```scss
    >@import "<url>"...;
    >```
- Sass **@import** extends CSS **@import** rule, cho phép load styles, members (mixins, functions, and variables) từ stylesheet khác, & kết hợp CSS từ nhiều stylesheet lại với nhau.  
- Khi import 1 file, nội dung của file này như trực tiếp xuất hiện ở địa điểm **@import**. Tất cả members đều available (kể cả private members) & CSS styles của nó được bao gồm ở điểm @import.  
- Là "Top-level statement": Chỉ có thể được sử dụng ở top-level của stylesheet, hoặc lồng ở top-level bên trong *CSS statements*: style rules, CSS at-rules, @at-root rule.  

- Sass file URL được load không thể lấy từ biến, cũng không thể sử dụng nội suy (#{}).  
- Khác với CSS mỗi **@import** chỉ import 1 file, Sass **@import** có thể import a list các files.  
- Một số vấn đề của **@import**:  
    - **@import** làm tất cả members đều có thể truy xuất global, rất khó xác định chúng được định nghĩa ở đâu.  
    - Vì tất cả mọi thứ được import đều là global nên phải xác định prefix cho tất cả để tránh trùng tên, điều này sẽ làm tên trở nên dài hơn.  
    - Không thể định nghĩa private members.  
    - Nếu 1 file được **@import** nhiều lần nó sẽ được compile nhiều lần & thêm styles nhiều lần làm output cồng kềnh.  

Tất cả các vấn đề của **@import**, sử dụng **@use** đều có thể giải quyết.  

```scss
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}

// style.scss
@import 'foundation/code';
```


## 2. Finding the file 

- Sass imports files by *URL* not *file path*, do vậy luôn sử dụng forward slash "/".  
- Không cần viết rõ extension của file muốn import, sass sẽ tự động load các file ".css" or ".scss" or ".sass"  

### ==== Load path ====

Là path trên file system mà Sass sẽ xem xét khi import.  

*Ví dụ*: Nếu truyền "node_modules/susy/sass" làm load path thì chỉ cần sử dụng (@import 'susy';) thay vì (@import 'node_modules/susy/sass/susy.scss').  

Sass sẽ tìm kiếm các file tương đối với file hiện tại, nếu không có file nào khớp mới sử dụng load path.  

Không cần sử dụng "./" để import tương đối.  

### ==== Partials ====

- Các file có tên bắt đầu bằng "_" được gọi là partials.  
- Sass sẽ không cố gắng tự biên dịch các file này.  
- Khi import partials thì URL có thể bỏ đi ký tự "_".  

### ==== Index files ====

Các file có tên "index" sẽ được tự động import khi load URL của directory, eg: _index.scss.  

```scss
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}

// foundation/_index.scss
@import 'code';

// style.scss
@import 'foundation';
```

### ==== Custom Importers ====

Giúp kiểm soát **@import** định vị stylesheet như thế nào.

Tất cả Sass implementations (Node Sass \[node-sass\], Dart Sass \[sass\], Ruby Sass) đều cung cấp 1 cách để định nghĩa custom importer.  


## 3. Nesting

**@import** thường được viết ở top-level của stylesheet, nhưng nó còn có thể được lồng bên trong **style rules** hoặc **plain CSS at-rules** (@font-face, @keyframes, @media, ...)  

Hữu ích để xác định scope của đoạn CSS cho 1 element riêng hoặc media query.  

```scss
// _theme.scss
pre, code {
  font-family: 'Source Code Pro', Helvetica, Arial;
  border-radius: 4px;
}

// style.scss
.theme-sample {
  @import "theme";
}
```

**Parent selector** (**&**): tham chiếu đến selector bên trong selector mà được lồng **@import**.

*Ví dụ*:  

SCSS input:  
```scss
// _theme.scss
ul li {
  $padding: 16px;
  padding-left: $padding;

  [dir=rtl] & {
    padding: {
      left: 0;
      right: $padding;
    }
  }
}

// style.scss
.theme-sample {
  @import "theme";
}
```

CSS output:  
```css
.theme-sample ul li {
  padding-left: 16px;
}

[dir=rtl] .theme-sample ul li {
  padding-left: 0;
  padding-right: 16px;
}
```


## 4. Importing CSS

Ngoài import các file ".scss" & ".sass" cũng có thể import các file ".css" (không viết rõ phần mở rộng), nhưng sẽ không có các tính năng của sass.  

```scss
// code.css
code {
  padding: .25em;
  line-height: 0;
}

// style.scss
@import 'code';
```


## 5. Plain CSS @import

Sass sẽ coi bất kỳ **@import** nào có các đặc điểm sau thành **plain CSS @import**:  

- Import mà URL kết thúc với **".css"** extension.  
- Import mà URL bắt đầu bằng **"http://"** or **"https://"**.  
- Import mà URL được viết dưới dạng **url()**.  
- Import mà có media query.  

```scss
@import "theme.css";
@import "http://fonts.googleapis.com/css?family=Droid+Sans";
@import url(theme);
@import "landscape" screen and (orientation: landscape);
```

### === Interpolation #{} ====

Mặc dù Sass **@import** không thể sử dụng interpolation, nhưng plain CSS **@import** có thể, điều này tạo nên các dynamic imports.  

```scss
@mixin google-font($family) {
  @import url("http://fonts.googleapis.com/css?family=#{$family}");
}

@include google-font("Droid Sans");
```


## 6. Import and Modules

#### ==== Importing a Module-System File ====

- Khi import 1 file có chứa **@use** rule, sẽ có quyền truy xuất tất cả các members (bao gồm private members) được định nghĩa trực tiếp trong file đó, nhưng không có quyền truy xuất các members của module được loaded với **@use**.  

    ```scss
    // color-1.scss
    $white: #fff;

    // color-2.scss
    @use "color-1";
    $blue: #0d6efd;

    // styles.scss
    @import "color-2";
    .btn {
        background-color: $blue;
        color: $white; // error 
    }
    ```

- Tuy nhiên khi import 1 file có chứa **@forward** rule, sẽ có quyền truy xuất tất cả các members (bao gồm private members) được định nghĩa trực tiếp trong file đó, & cả các members của module được loaded với **@forward**.  

    ```scss
    // color-1.scss
    $white: #fff;

    // color-2.scss
    @forward "color-1";
    $blue: #0d6efd;

    // styles.scss
    @import "color-2";
    .btn {
        background-color: $blue;
        color: $white; // no error
    }
    ```

**Note**: Khi import file có chứa **@use** hoặc **@forward** tất cả CSS styles được loaded chuyển tiếp đều sẽ được bao gồm trong stylesheet kết quả, mặc dù chúng đã được bao gồm bởi import khác. Điều này làm CSS output cồng kềnh.  

#### ==== Import-Only Files ====

Các **<name>.import.scss** files sẽ chỉ được loaded bởi **@import**, không thể được loaded bởi **@use** hay **@forward**.  

```scss
// _reset.scss
// Module system users write `@include reset.list()`.
@mixin list() {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

// _reset.import.scss
// Legacy import users can keep writing `@include reset-list()`.
@forward "reset" as reset-*;
```

#### ==== Configuring Modules Through Imports ====

Có thể cấu hình cho các module được loaded thông qua @import bằng cách xác định các biến global trước khi **@import** load module đó lần đầu tiên.  

**Note**: Sau khi module được load lần đầu với **@import**, nếu thay đổi cấu hình cũng sẽ bị bỏ qua nếu **@import** lại.  

SCSS input:  
```scss
// _library.scss
$color: blue !default;

a {
  color: $color;
}

// _library.import.scss
@forward 'library' as lib-*;

// style.sass
$lib-color: green;
@import "library";
```

CSS output:  
```css
a {
  color: green;
}
```

#### ==== Loading a Module That Contains Imports ====

Khi sử dụng **@use** or **@forward** để load module mà có chứa **@import** rule, sẽ có quyền truy xuất tất cả public members được định nghĩa trong stylesheet được load & tất cả public members trong everything được stylesheet import. Nói cách khác, mọi thứ được stylesheet import coi như được viết trong 1 big stylesheet.  

```scss
// color-1.scss
$white: #fff;
$-red: #f00;

// color-2.scss
@import "color-1";
$blue: #0d6efd;
$red2: $-red;

// styles.scss
@use "color-2" as color;
.btn {
    background-color: color.$blue;
    color: color.$white;
    border: {
        top: 1px solid color.$red2;
        bottom: 1px solid color.$-red; // error
    }
}
```