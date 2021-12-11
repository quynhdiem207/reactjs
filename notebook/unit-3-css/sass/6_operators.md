# --- Operators ---

Sass hỗ trợ các toán tử hữu ích để làm việc với các giá trị khác nhau:  

- ==, != để kiểm tra 2 giá trị có bằng nhau hay không.  
- +, -, *, /, % sử dụng để tính toán các numbers.  
- <, <=, >, >= để so sánh lớn nhỏ.  
- and, or, not để làm việc với boolean.  
- +, -, / để nối chuỗi.  

Thứ tự ưu tiên các operator như sau:  

1. not, +, -, /  
2. *, /, %  
3. +, -  
4. <, <=, >, >=  
5. ==, !=  
6. and  
7. or  
8. =  

```scss
@debug 1 + 2 * 3 == 1 + (2 * 3); // true
@debug true or false and false == true or (false and false); // true
```

Có thể sử dụng ngoặc đơn () để xác định rõ thứ tự thực hiện của phép toán, các phép toán trong ngoặc luôn được thực hiện trước.  

```scss
@debug (1 + 2) * 3; // 9
@debug ((1 + 2) * 3 + 4) * 5; // 65
```


## 1. Equality operators

Các equality operator == & != kiểm tra 2 giá trị có bằng nhau hay không. Hai giá trị được coi là bằng nhau nếu chúng cùng loại & có cùng giá trị.  

```scss
@debug 1px == 1px; // true
@debug 1px != 1em; // true
@debug 1 != 1px; // true
@debug 96px == 1in; // true

@debug "Helvetica" == Helvetica; // true
@debug "Helvetica" != "Arial"; // true

@debug hsl(34, 35%, 92.1%) == #f2ece4; // true
@debug rgba(179, 115, 153, 0.5) != rgba(179, 115, 153, 0.8); // true

@debug (5px 7px 10px) == (5px 7px 10px); // true
@debug (5px 7px 10px) != (10px 14px 20px); // true
@debug (5px 7px 10px) != (5px, 7px, 10px); // true
@debug (5px 7px 10px) != [5px 7px 10px]; // true

$theme: ("venus": #998099, "nebula": #d2e1dd);
@debug $theme == ("venus": #998099, "nebula": #d2e1dd); // true
@debug $theme != ("venus": #998099, "iron": #dadbdf); // true

@debug true == true; // true
@debug true != false; // true
@debug null != false; // true

@debug get-function("rgba") == get-function("rgba"); // true
@debug get-function("rgba") != get-function("hsla"); // true
```


## 2. Relational operators

Relational operators <, <=, >, >= giúp so sánh giá trị của 1 số lớn hơn hay nhỏ hơn 1 số khác. Chúng sẽ tự động convert sang đơn vị tương thích.  

```scss
@debug 100 > 50; // true
@debug 10px < 17px; // true
@debug 96px >= 1in; // true
@debug 1000ms <= 1s; // true
```

Các số không có đơn vị có thể được so sánh với bất kỳ số nào, nó sẽ được tự động chuyển đổi thành đơn vị của số kia.  

```scss
@debug 100 > 50px; // true
@debug 10px < 17; // true
```

Số có đơn vị không tưng thích không thể so sánh.  

```scss
@debug 100px > 10s;
//     ^^^^^^^^^^^
// Error: Incompatible units px and s.
```


## 3. Numeric operators

Sass hỗ trợ tập các toán tử số học: +, -, *, /, %. Chúng sẽ tự động convert sang đơn vị tương thích.  

```scss
@debug 10s + 15s; // 25s
@debug 1in - 10px; // 0.8958333333in
@debug 5px * 3px; // 15px*px
@debug 1in % 9px; // 0.0625in
```

Số không có đơn vị có thể sử dụng để tính toán với bất cứ số nào.  

```scss
@debug 100px + 50; // 150px
@debug 4s * 10; // 40s
```

Các số có đơn vị không tương thích không thể sử dụng các atoán tử +, -, %.  

```scss
@debug 100px + 10s;
//     ^^^^^^^^^^^
// Error: Incompatible units px and s.
```

### Unary operators (toán tử 1 ngôi)

Các toán tử +, - có thể được viết dưới dạng unary operator (các toán tử chỉ nhận 1 giá trị).  

```scss
@debug +(5s + 7s); // 12s
@debug -(50px + 30px); // -80px
@debug -(10px - 15px); // 5px
```

### Units

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


## 4. String operators

Sass hỗ trợ 1 số toán tử giúp tạo string: +, -.  

```scss
@debug "Helvetica" + " Neue"; // "Helvetica Neue"
@debug sans- + serif; // sans-serif
@debug sans - serif; // sans-serif
```

Các toán tử này không hoạt động trong các trường hợp: Phía trái là number or color.  

```scss
@debug "Elapsed time: " + 10s; // "Elapsed time: 10s";
@debug true + " is a boolean value"; // "true is a boolean value";
```

**Note**: Sử dụng nội suy **#{}** thay vì các toán tử này.  


## 5. Boolean operators

Sass hỗ trợ 1 vài boolean operator làm việc với giá trị boolean: and, or, not.  

```scss
@debug not true; // false
@debug not false; // true

@debug true and true; // true
@debug true and false; // false

@debug true or false; // true
@debug false or false; // false
```

### Truthiness and Falsiness

Bất cứ nơi nào sử dụng giá trị boolean true & false, đều có thể sử dụng các giá trị khác. Các giá trị false & null sẽ được coi là falsy, Sass coi nó là sai, mọi giá trị khác là Truthy.  