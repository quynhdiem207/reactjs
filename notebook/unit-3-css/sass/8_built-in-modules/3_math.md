# --- sass:math ---

**sass:math** giúp làm việc với number.  

>```scss
>@use "sass:math";
>```


## 1. Variables

**sass:math** module hỗ trợ các biến sau:  

### 1.1, math.$e

Syntax:  

>```scss
>math.$e // => number
>```

Trả về giá trị hằng số toán học e.  

*Ví dụ*:  

```scss
@debug math.$e; // 2.7182818285
```


### 1.2, math.$pi

Syntax:  

>```scss
>math.$pi // => number
>```

Trả về giá trị hằng số toán học π.  

*Ví dụ*:  

```scss
@debug math.$pi; // 3.1415926536
```


## 2. Bounding Functions

### 2.1, math.ceil()

Syntax:  

>```scss
>math.ceil($number) // => number
>```

Trả về số nguyên được làm tròn lên của $number.  

*Ví dụ*:  

```scss
@debug math.ceil(4); // 4
@debug math.ceil(4.2); // 5
@debug math.ceil(4.9); // 5
```


### 2.2, math.floor()

Syntax:  

>```scss
>math.floor($number) // => number
>```

Trả về số nguyên được làm tròn xuống của $number.  

*Ví dụ*:  

```scss
@debug math.floor(4); // 4
@debug math.floor(4.2); // 4
@debug math.floor(4.9); // 4
```


### 2.3, math.round()

Syntax:  

>```scss
>math.round($number) // => number
>```

Trả về số nguyên được làm tròn đến số nguyên gần nhất của $number.  

*Ví dụ*:  

```scss
@debug math.round(4); // 4
@debug math.round(4.2); // 4
@debug math.round(4.9); // 5
```


### 2.4, math.min()

Syntax:  

>```scss
>math.min($numbers...) // => number
>```

Trả về giá trị nhỏ nhất trong các số $numbers.  

*Ví dụ*:  

```scss
@debug math.min(1px, 4px); // 1px

$widths: 50px, 30px, 100px;
@debug math.min($widths...); // 30px
```


### 2.5, math.max()

Syntax:  

>```scss
>math.max($numbers...) // => number
>```

Trả về giá trị lớn nhất trong các số $numbers.  

*Ví dụ*:  

```scss
@debug math.max(1px, 4px); // 4px

$widths: 50px, 30px, 100px;
@debug math.max($widths...); // 100px
```


### 2.6, math.clamp()

Syntax:  

>```scss
>math.clamp($min, $number, $max) // => number
>```

Trả về $number được giới hạn trong phạm vi từ $min đến $max.  

- Nếu $number < $min sẽ return $min.  
- Nếu $number > $max sẽ return $max.  
- Còn lại return $number.  

Cả $min, $max, $number đều phải có đơn vị tương thích, hoặc tất cả không có đơn vị.  

*Ví dụ*:  

```scss
@debug math.clamp(-1, 0, 1); // 0
@debug math.clamp(1px, -1px, 10px); // 1px
@debug math.clamp(-1in, 1cm, 10mm); // 10mm
```


## 3. Distance Functions

### 3.1, math.abs()

Syntax:  

>```scss
>math.abs($number) // => number
>```

Trả về giá trị tuyệt đối của $number.  

*Ví dụ*:  

```scss
@debug math.abs(10px); // 10px
@debug math.abs(-10px); // 10px
```


### 3.2, math.hypot()

Syntax:  

>```scss
>math.hypot($number...) // => number
>```

Trả về độ dài vector n chiều có các thành phần tọa độ là các $number.  

*Ví dụ*: math.hypot(a, b, c) sẽ return sqrt(a² + b² + c²).  

Các $number đều phải có đơn vị tương thích, hoặc tất cả đều không có đơn vị. Do các đơn vị có thể khác nhau nên kết quả trả về sẽ mang đơn vị của đối số đầu tiên.  

*Ví dụ*:  

```scss
@debug math.hypot(3, 4); // 5

$lengths: 1in, 10cm, 50px;
@debug math.hypot($lengths...); // 4.0952775683in
```


## 4. Exponential Functions

### 4.1, math.log()

Syntax:  

>```scss
>math.log($number, $base: null) // => number
>```

Trả về giá trị logarit của $number với cơ số $base.  

Nếu $base là null, sẽ tính logarit tự nhiên của $number, chính là logarit cơ số e của $number.  

Cả $number & $base đều không được phép có đơn vị.  

*Ví dụ*:  

```scss
@debug math.log(10); // 2.302585093
@debug math.log(10, 10); // 1
```


### 4.2, math.pow()

Syntax:  

>```scss
>math.pow($base, $exponent) // => number
>```

Trả về lũy thừa cơ số $base với số mũ $exponent.  

Cả $base & $exponent đều không được phép có đơn vị.  

*Ví dụ*:  

```scss
@debug math.pow(10, 2); // 100
@debug math.pow(100, math.div(1, 3)); // 4.6415888336
@debug math.pow(5, -2); // 0.04
```


### 4.3, math.sqrt()

Syntax:  

>```scss
>math.sqrt($number) // => number
>```

Trả về căn bậc 2 $number.  

Đối số $number không được phép có đơn vị.  

*Ví dụ*:  

```scss
@debug math.sqrt(100); // 10
@debug math.sqrt(math.div(1, 3)); // 0.5773502692
@debug math.sqrt(-1); // NaN
```


## 5. Trigonometric Functions

### 5.1, math.cos()

Syntax:  

>```scss
>math.cos($number) // => number
>```

Trả về giá trị cosin của $number.  

Đối số $number phải là 1 góc (đơn vị tương thích với deg như rad) hoặc không có đơn vị, nếu không có đơn vị sẽ được giả định là rad.  

*Ví dụ*:  

```scss
@debug math.cos(100deg); // -0.1736481777
@debug math.cos(1rad); // 0.5403023059
@debug math.cos(1); // 0.5403023059
```


### 5.2, math.sin()

Syntax:  

>```scss
>math.sin($number) // => number
>```

Trả về giá trị sin của $number.  

Đối số $number phải là 1 góc (đơn vị tương thích với deg như rad) hoặc không có đơn vị, nếu không có đơn vị sẽ được giả định là rad.  

*Ví dụ*:  

```scss
@debug math.sin(100deg); // 0.984807753
@debug math.sin(1rad); // 0.8414709848
@debug math.sin(1); // 0.8414709848
```


### 5.3, math.tan()

Syntax:  

>```scss
>math.tan($number) // => number
>```

Trả về giá trị tan của $number.  

Đối số $number phải là 1 góc (đơn vị tương thích với deg như rad) hoặc không có đơn vị, nếu không có đơn vị sẽ được giả định là rad.  

*Ví dụ*:  

```scss
@debug math.tan(100deg); // -5.6712818196
@debug math.tan(1rad); // 1.5574077247
@debug math.tan(1); // 1.5574077247
```


### 5.4, math.acos()

Syntax:  

>```scss
>math.acos($number) // => number
>```

Trả về giá trị arccos của $number ở đơn vị deg.  

Đối số $number không được phép có đơn vị.  

*Ví dụ*:  

```scss
@debug math.acos(0.5); // 60deg
@debug math.acos(2); // NaNdeg
```


### 5.5, math.asin()

Syntax:  

>```scss
>math.asin($number) // => number
>```

Trả về giá trị arcsin của $number ở đơn vị deg.  

Đối số $number không được phép có đơn vị.  

*Ví dụ*:  

```scss
@debug math.asin(0.5); // 30deg
@debug math.asin(2); // NaNdeg
```


### 5.6, math.atan()

Syntax:  

>```scss
>math.atan($number) // => number
>```

Trả về giá trị arctan của $number ở đơn vị deg.  

Đối số $number không được phép có đơn vị.  

*Ví dụ*:  

```scss
@debug math.atan(10); // 84.2894068625deg
```


### 5.7, math.atan2()

Syntax:  

>```scss
>math.atan($y, $x) // => number
>```

Trả về giá trị arctan của điểm có tọa độ ($x, $y) ở đơn vị deg.  

*Ví dụ*: math.atan2(1, -1) tương ứng với điểm (-1, 1) & returns 135deg.  

Cả $x & $y đều phải có đơn vị tương thích hoặc đều không được phép có đơn vị.  

*Ví dụ*:  

```scss
@debug math.atan2(-1, 1); // 135deg
```


## 6. Unit Functions

### 6.1, math.compatible()

Syntax:  

>```scss
>math.compatible($number1, $number2) // => boolean
>```

Trả về boolean, kiểm tra xem đơn vị của $number1 & $number2 có tương thích hay không.  

Nếu return true, sẽ an toàn khi thực hiện cộng, trừ & so sánh $number1 & $number2.  

*Ví dụ*:  

```scss
@debug math.compatible(2px, 1px); // true
@debug math.compatible(100px, 3em); // false
@debug math.compatible(10cm, 3mm); // true
```


### 6.2, math.is-unitless()

Syntax:  

>```scss
>math.is-unitless($number) // => boolean
>```

Trả về boolean, kiểm tra xem $number có phải không có đơn vị hay không.  

Nếu return true, tức là $number không có đơn vị.  

*Ví dụ*:  

```scss
@debug math.is-unitless(100); // true
@debug math.is-unitless(100px); // false
```


### 6.3, math.unit()

Syntax:  

>```scss
>math.unit($number) // => unquoted string
>```

Trả về unquoted string đại diện cho đơn vị của $number.  

*Ví dụ*:  

```scss
@debug math.unit(100); // ""
@debug math.unit(100px); // "px"
@debug math.unit(5px * 10px); // "px*px"
@debug math.unit(math.div(5px, 1s)); // "px/s"
```


## 7. Other Functions

### 7.1, math.div()

Syntax:  

>```scss
>math.div($number1, $number2) //=> number 
>```

Trả về kết quả của phép chia $number1 cho $number2.  

*Ví dụ*:  

```scss
@debug math.div(1, 2); // 0.5
@debug math.div(100px, 5px); // 20
@debug math.div(100px, 5); // 20px
@debug math.div(100px, 5s); // 20px/s
```


### 7.2, math.percentage()

Syntax:  

>```scss
>math.percentage($number) //=> number 
>```

Trả về kết quả convert $number không có đơn vị sang %.  

*Ví dụ*:  

```scss
@debug math.percentage(0.2); // 20%
@debug math.percentage(math.div(100px, 50px)); // 200%
```


### 7.3, math.random()

Syntax:  

>```scss
>math.random($limit: null) //=> number 
>```

Trả về số ngẫu nhiên.  

- Nếu $limit là null, return số thập phân ngẫu nhiên từ 0 - 1.  

    *Ví dụ*:  

    ```scss
    @debug math.random(); // 0.2821251858
    @debug math.random(); // 0.6221325814
    ```

- Nếu $limit >= 1, return số nguyên ngẫu nhiên từ 1 - $limit.  

    *Ví dụ*:  

    ```scss
    @debug math.random(10); // 4
    @debug math.random(10000); // 5373
    ```