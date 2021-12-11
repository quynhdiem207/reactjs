# --- sass:string ---

**sass:string** giúp làm việc với string.  

>```scss
>@use "sass:string";
>```


## 1. string.insert()

Syntax:  

>```scss
>string.insert($string, $insert, $index) // => string
>```

Trả về string là copy của $string với $insert được thêm vào ở vị trí $index.  

- Nếu $index âm thì tính từ cuối của $string.  
- Nếu $index âm & $index < -length của $tring thì thêm $insert vào vị trí đầu của $string.  
- Nếu $index > length của $tring thì thêm $insert vào vị trí cuối của $string.  

*Ví dụ*:  

```scss
@debug string.insert("Roboto Bold", " Mono", 7); // "Roboto Mono Bold"
@debug string.insert("Roboto Bold", " Mono", -6); // "Roboto Mono Bold"
@debug string.insert("Roboto", " Bold", 100); // "Roboto Bold"
@debug string.insert("Bold", "Roboto ", -100); // "Roboto Bold"
```


## 2. string.slice()

Syntax:  

>```scss
>string.slice($string, $start-at, $end-at: -1) // => string
>```

Trả về sub-string của $string được cắt từ $start-at đến $end-at.  

Nếu $end-at không được truyền sẽ cắt đến cuối $string.  

Nếu truyền $index âm sẽ tính từ cuối $string.  

*Ví dụ*:  

```scss
@debug string.slice("Helvetica Neue", 11); // "Neue"
@debug string.slice("Helvetica Neue", 1, 3); // "Hel"
@debug string.slice("Helvetica Neue", 1, -6); // "Helvetica"
```


## 3. string.to-upper-case()

Syntax:  

>```scss
>string.to-upper-case($string) // => string
>```

Trả về string là copy của $string với tất cả ký tự được chuyển thành in hoa.  

*Ví dụ*:  

```scss
@debug string.to-upper-case("Bold"); // "BOLD"
@debug string.to-upper-case(sans-serif); // SANS-SERIF
```


## 4. string.to-lower-case()

Syntax:  

>```scss
>string.to-lower-case($string) // => string
>```

Trả về string là copy của $string với tất cả ký tự được chuyển thành in thường.  

*Ví dụ*:  

```scss
@debug string.to-lower-case("Bold"); // "bold"
@debug string.to-lower-case(SANS-SERIF); // sans-serif
```


## 5. string.quote()

Syntax:  

>```scss
>string.quote($string) // => quoted string
>```

Trả về $string dưới dạng chuỗi được trích dẫn.  

*Ví dụ*:  

```scss
@debug string.quote(Helvetica); // "Helvetica"
@debug string.quote("Helvetica"); // "Helvetica"
```


## 6. string.unquote()

Syntax:  

>```scss
>string.unquote($string) // => unquoted string
>```

Trả về $string dưới dạng chuỗi không được trích dẫn.  

*Ví dụ*:  

```scss
@debug string.unquote("Helvetica"); // Helvetica
@debug string.unquote(".widget:hover"); // .widget:hover
```


## 7. string.index()

Syntax:  

>```scss
>string.index($string, $sub-string) // => number | null
>```

Trả về index của $sub-string trong $string, or null nếu $string không chứa $sub-string.  

*Ví dụ*:  

```scss
@debug string.index("Helvetica Neue", "Helvetica"); // 1
@debug string.index("Helvetica Neue", "Neue"); // 11
```


## 8. string.length()

Syntax:  

>```scss
>string.length($string) // => number
>```

Trả về số lượng ký tự của $string.  

*Ví dụ*:  

```scss
@debug string.length("Helvetica Neue"); // 14
@debug string.length(bold); // 4
@debug string.length(""); // 0
```


## 9. string.unique-id()

Syntax:  

>```scss
>string.unique-id() // => unquoted string
>```

Trả về chuỗi được tạo ngẫu nhiên, không được trích dẫn & là duy nhất trong quá trình Sass compile hiện tại, cũng được đảm bảo là chuỗi CSS hợp lệ.  

*Ví dụ*:  

```scss
@debug string.unique-id(); // uabtrnzug
@debug string.unique-id(); // u6w1b1def
```
