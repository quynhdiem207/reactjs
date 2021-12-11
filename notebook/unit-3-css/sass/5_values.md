# --- Values ---

Mỗi expression sẽ tạo ra 1 value, các biến lưu trữ các values.  

Sass hỗ trợ 1 vài value types:  

- Các values đến từ CSS:  
    - **Numbers**: có thể có hoặc không có đơn vị, eg: 12 or 100px.  
    - **Strings**: có thể có hoặc không có trích dẫn, eg: "Helvetica Neue" or bold.  
    - **Colors**: Có thể biểu diễn bằng hex hoặc name hoặc các function hsl(), rgb() như #c6538c or blue or rgb(107, 113, 127) or hsl(210, 100%, 20%).  
    - **List of values**: các phần tử được ngăn cách bởi comma or space hay được bao bởi cặp ngoặc [], eg: 1.5em 1em 0 2em; Helvetica, Arial, sans-serif; or \[col1-start\].  

- Các values riêng của Sass:  
    - **Boolean**: true or false.  
    - Singleton **null**.  
    - **Maps**: chứa các cặp key/value, eg: ("background": red, "foreground": pink).  
    - **Functions references**: Các function được returned bởi get-function() & được gọi bởi call().  


## 1. Numbers

Trong Sass, numbers gồm 2 bộ phận: Số & đơn vị.  

Numbers có thể không có đơn vị hoặc có đơn vị phức tạp, *ví dụ*:  

```scss
@debug 100; // 100
@debug 0.8; // 0.8
@debug 16px; // 16px
@debug 5px * 2px; // 10px*px (read "square pixels") => complex unit
```

Có thể sử dụng các ký hiệu khoa học, *ví dụ*:  

```scss
@use "sass:math";
math.div(5, 2); // 2.5

@debug 5.2e3; // 5200
@debug 6e-2; // 0.06
```

###  1.1, Units

Sass hỗ trợ thao tác với các đơn vị như tính toán tực tế, eg: khi nhân các số thì đơn vị cũng sẽ được nhân lên, khi chia các số thì đơn vị cũng sẽ chia cho nhau, *Ví dụ*:  

```scss
@debug 4px * 6px; // 24px*px (read "square pixels")
@debug math.div(5px, 2s); // 2.5px/s (read "pixels per second")

// 3.125px*deg/s*em (read "pixel-degrees per second-em")
@debug 5px * math.div(math.div(30deg, 2s), 24em); 

$degrees-per-second: math.div(20deg, 1s);
@debug $degrees-per-second; // 20deg/s
@debug math.div(1, $degrees-per-second); // 0.05s/deg
```

CSS không hỗ trợ các đơn vị phức tạp, nên việc sử dụng chúng sẽ tạo ra lỗi.  

Sass sẽ tự động convert giữa các đơn vị tương thích, việc lựa chọn đơn vị nào tùy thuộc vào Sass implementation đang sử dụng. Nếu thực hiện chia math.div() 2 số có đơn vị tương thích, đơn vịu sẽ được triệt tiêu. Nếu thực hiện +, -, % các đơn vị không tương thích sẽ tạo ra lỗi, *ví dụ*:  

```scss
// CSS defines 1in = 96px.
@debug 1in + 6px; // 102px or 1.0625in

@debug 1in + 1s;
//     ^^^^^^^^
// Error: Incompatible units s and in.
```

**Note**:  

- Tránh sử dụng nội suy **#{$number}px** vì nó sẽ trả về string, thay vào đó hãy sử dụng **$number * 1px** sẽ trả về number.  
- Số thập phân decimal & phần trăm percentage không thể chuyển đổi cho nhau, vì chúng là 2 thứ khác nhau, *Ví dụ*: 50% là số có đơn vị %, khác với 0.5  
- Để chuyển decimal -> percentage: **math.percentage($decimal)** tương đương với **$decimal * 100%**.  
- Để chuyển percentage -> decimal: **math.div($percentage, 100%)**.  


### 1.2, Precision (độ chính xác)

Sass number hỗ trợ độ chính xác 10 chữ số sau dấu thập phân:  

- Chỉ 10 chữ số đầu sau dấu thập phân được đưa vào CSS tạo ra.  
- Các phép toán so sánh như ==, >= sẽ coi 2 số là bằng nhau nếu nó giống nhau đến chữ số thứ 10 sau dấu thập phân.  
- Nếu number so với số nguyên, sự khác biệt < 1e-10 thì sẽ được coi là số nguyên.  

*ví dụ*:  

```scss
@debug 0.012345678912345; // 0.0123456789
@debug 0.01234567891 == 0.01234567899; // true
@debug 1.00000000009; // 1
@debug 0.99999999991; // 1
```


## 2. Strings

Sass hỗ trợ quoted string & unquoted string.  

Có thể chuyển đổi chúng với nhau:  

- quoted string -> unquoted string: **string.unquote()**.  
- unquoted string -> quoted string: **string.quote()**.  

```scss
@use "sass:string";

@debug string.unquote(".widget:hover"); // .widget:hover
@debug string.quote(bold); // "bold"
```


### 2.1, Escapes

Sass string hỗ trợ tất cả các CSS escape code tiêu chuẩn, *ví dụ*:  

```scss
@debug "\""; // '"'
@debug \.widget; // \.widget
@debug "\a"; // "\a" (a string containing only a newline)
@debug "line1\a line2"; // "line1\a line2"
@debug "Nat + Liz \1F46D"; // "Nat + Liz 👭"
```


### 2.2, Quoted

Quoted string được viết giữa dấu nháy đơn hoặc nháy kép.  

Chúng có thể chứa nội suy & các ký tự unscape ngoại trừ:  

- \, có thể được escaped dưới dạng \\\\.  
- ' or ", có thể được escaped dưới dạng \' or \".  
- newline, có thể được escaped dưới dạng \a.  

```scss
@debug "Helvetica Neue"; // "Helvetica Neue"
@debug "C:\\Program Files"; // "C:\\Program Files"
@debug "\"Don't Fear the Reaper\""; // "\"Don't Fear the Reaper\""
@debug "line1\a line2"; // "line1\a line2"

$roboto-variant: "Mono";
@debug "Roboto #{$roboto-variant}"; // "Roboto Mono"
```

**Note**: Khi sử dụng interpolation #{} để đưa quoted string vào giá trị khác, dấu trích dẫn sẽ bị loại bỏ.  


### 2.3, Unquoted

Unquoted string được viết dưới dạng CSS identifiers, chúng có thể bao gồm interpolation #{}.  

```scss
@debug bold; // bold
@debug -webkit-flex; // -webkit-flex
@debug --123; // --123

$prefix: ms;
@debug -#{$prefix}-flex; // -ms-flex
```

Không phải tất cả identifiers đêu được parsed dưới dạng unquoted string:  

- CSS color name được parsed thành color.  
- null được parsed thành giá trị null của Sass.  
- true & false được parsed thành boolean.  
- and, or, not được parsed thành operators.  

Do đó nên sử dụng quoted string, trừ khi sử dụng unquoted string để viết các giá trị cụ thể của CSS property.  

**Escapes in Unquoted Strings**: Khi unquoted string được parsed, thì literal text của escape được parsed như 1 phần của string.

```scss
@use "sass:string";

@debug \1F46D; // 👭
@debug \21; // \!
@debug \7Fx; // \7f x
@debug string.length(\7Fx); // 5
```


### 2.4, String indexes

Indexes tham chiếu đến các ký tự của string, index 1 tham chiếu đến ký tự đầu tiên & index -1 tham chiếu đến ký tự cuối cùng.  

```scss
@use "sass:string";

@debug string.index("Helvetica Neue", "Helvetica"); // 1
@debug string.index("Helvetica Neue", "Neue"); // 11
@debug string.slice("Roboto Mono", -4); // "Mono"
```


## 3. Colors

Sass hỗ trợ các giá trị màu, đại diện cho các điểm màu trong không gian sRGB. Colors có thể được viết dưới dạng mã hex, color name, rgb(), rgba(), hssl(), hsla().  

```scss
@debug #f2ece4; // #f2ece4
@debug #b37399aa; // rgba(179, 115, 153, 67%)
@debug midnightblue; // #191970
@debug rgb(204, 102, 153); // #c69
@debug rgba(107, 113, 127, 0.8); // rgba(107, 113, 127, 0.8)
@debug hsl(228, 7%, 86%); // #dadbdf
@debug hsla(20, 20%, 85%, 0.7); // rgb(225, 215, 210, 0.7)
```

Sass hỗ trợ các built-in function trong module sass:color giúp tạo màu mới dựa trên điều chỉnh màu cũ hay trộn lẫn các màu với nhau: scale(), adjust(), change(), mix(), ...

```scss
@use "sass:color";

@debug color.scale($venus, $lightness: +15%); // #a893a8
@debug color.mix($venus, midnightblue); // #594d85
```


## 4. Lists

Lists chứa 1 dãy các giá trị. Các phần tử trong list có thể được phân tách bằng comma ((Helvetica, Arial, sans-serif), space (10px 15px 0 0) hay slash, miễn là nó nhất quán trong list.  

List cũng được phép định nghĩa với ngoặc vuông (\[line1, line2\]), hữu ích với grid-template-columns.  

List có thể chứa 1 or không có phần tử nào, Danh sách 1 phần tử được viết dưới dạng (\<expression\>,) or \[\<expression\>\]. Danh sách koong có phần tử được viết dưới dạng () or [].  


### 4.1, Using list

**Indexes**: Các phần tử của list được đánh chỉ mục, nếu đánh chỉ mục từ đầu list thì phần tử đầu tiên của list có index 1, nếu đánh chỉ mục từ cuối list thì phần tử cuối có index -1.  

**Access an Element**: sử dụng **nth()** trong module sass:list.  
```scss
@debug list.nth(10px 12px 16px, 2); // 12px
@debug list.nth([line1, line2, line3], -1); // line3
```

**Do Something for Every Element**:  
```scss
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```

**Add to a List**: sử dụng **append()** trong module sass:list.  
```scss
@debug list.append(10px 12px 16px, 25px); // 10px 12px 16px 25px
@debug list.append([col1-line1], col1-line2); // [col1-line1, col1-line2]
```

**Modify a List**: sử dụng **set-nth()** trong module sass:list.  
```scss
@debug list.set-nth(10px 20px 30px, 1, 2em); // 2em 20px 30px
@debug list.set-nth(10px 20px 30px, -1, 8em); // 10px, 20px, 8em
```

**Find an Element in a List**: sử dụng **index()** trong module sass:list.  
```scss
@debug list.index(1px solid red, solid); // 2
@debug list.index(1px solid red, dashed); // null
```

Có thể sử dụng **list.index()** với **@if** để kiểm tra phần tử có tồn tại trong list hay không.  


### 4.2, Immutability (Bất biến)

List trong Sass là bất biến, tức là không thể thay đổi nội dung của list, tất cả các built-in function đều trả về new list thay vì sửa đổi list gốc.  

### 4.3, Argument Lists

Nếu 1 function or mixin được khai báo để nhận các đối số tùy ý, giá trị  nhận được sẽ là argument list chứa tất cả các đối số được truyền. Ngoài ra còn có tính năng bổ sung: nếu truyền keyword argument thì chúng có thể được truy xuất dưới dạng map khi truyền cho **meta.keywords()**.  

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
)
```


## 5. Maps

Maps giữ các cặp key/value được viết dưới dạng (\<expression\>:\<expression\>, \<expression\>:\<expression\>), được bao bởi cặp ngoặc (), trong đó các keys phải là duy nhất trong map.  

Map không có cặp key/value nào được viết ().  

Trên thực tế map chính là list chứa các sub-list là (key value).  


### 5.1, Using map

**Look Up a Value**: sử dụng **get()** trong module sass:map.  
```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.get($font-weights, "medium"); // 500
@debug map.get($font-weights, "extra-bold"); // null
```

**Do Something for Every Element**:  
```scss
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}
```

**Add to a Map or Modify a Map**: sử dụng **set()** trong module sass:map.  
```scss
@use "sass:map";

$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.set($font-weights, "extra-bold", 900);
// ("regular": 400, "medium": 500, "bold": 700, "extra-bold": 900)
@debug map.set($font-weights, "bold", 900);
// ("regular": 400, "medium": 500, "bold": 900)
```

**Merge 2 existing map**: sử dụng merge() trong module sass:map, nếu bị trùng key giữa 2 map thì value của map2 sẽ được sử dụng.  
```scss
@use "sass:map";

$light-weights: ("lightest": 100, "light": 300);
$heavy-weights: ("medium": 500, "bold": 700);

@debug map.merge($light-weights, $heavy-weights);
// ("lightest": 100, "light": 300, "medium": 500, "bold": 700)
```


### 5.2, Immutability (Bất biến)

Map trong Sass là bất biến, tức là không thể thay đổi nội dung của map, tất cả các built-in function đều trả về new map thay vì sửa đổi map gốc.  


## 6. Boolean

Boolean là các giá trị logic true & false.  

Có thể làm việc với boolean sử dụng các boolean operators: and, or & not.  

```scss
@use "sass:math";

@debug 1px == 2px; // false
@debug 1px == 1px; // true
@debug 10px < 3px; // false
@debug math.comparable(100px, 3in); // true
```


### 6.1, Using boolean

Có thể sử dụng với các rules như **@if** hay **if()**.  

*Ví dụ*: @if rule  
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

*Ví dụ*: if()  
```scss
@debug if(true, 10px, 30px); // 10px
@debug if(false, 10px, 30px); // 30px
```


### 6.2, Truthiness and Falsiness

Bất cứ nơi nào sử dụng giá trị boolean true & false, đều có thể sử dụng các giá trị khác. Các giá trị false & null sẽ được coi là falsy, Sass coi nó là sai, mọi giá trị khác là Truthy.  


## 7. null

**null** chỉ ra rằng thiếu 1 value.  

```scss
@use "sass:map";
@use "sass:string";

@debug string.index("Helvetica Neue", "Roboto"); // null
@debug map.get(("large": 20px), "small"); // null
@debug &; // null
```

- Nếu list chứa phần tử có giá trị null, null sẽ bị bỏ khỏi CSS được tạo:  

    SCSS input:  
    ```scss
    $fonts: ("serif": "Helvetica Neue", "monospace": "Consolas");

    h3 {
        font: 18px bold map-get($fonts, "sans");
    }
    ```

    CSS output:  
    ```css
    h3 {
        font: 18px bold;
    }
    ```

- Nếu property value là null, property sẽ bị bỏ hoàn toàn:  

    SCSS input:  
    ```scss
    $fonts: ("serif": "Helvetica Neue", "monospace": "Consolas");

    h3 {
        font: {
            size: 18px;
            weight: bold;
            family: map-get($fonts, "sans");
        }
    }
    ```

    CSS output:  
    ```css
    h3 {
        font-size: 18px;
        font-weight: bold;
    }
    ```

- null là falsy, được coi là sai, có thể làm điều kiện cho @if hoặc if().  


## 8. Functions

Functions cũng có thể là giá trị. Không thể trực tiếp viết 1 hàm dưới dạng giá trị, nhưng có thể truyền function name vào **meta.get-function()** để nhận hàm dưới dạng giá trị & truyền giá trị này cho **meta.call()** để gọi hàm.  

SCSS input:  
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

CSS output:  
```css
.content {
  font-family: Tahoma, Geneva, Arial, sans-serif;
}
```