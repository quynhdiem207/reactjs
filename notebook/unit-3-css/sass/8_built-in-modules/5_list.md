# --- sass:list ---

**sass:list** cho phép truy xuất & sửa đổi values trong lists.  

Trong Sass mỗi cặp key/value của map được coi là 1 list chứa 2 phần tử. Vì vậy, tất cả các functions của module "sass:list" đều có thể là việc với map.  

Các giá trị riêng lẻ cũng được coi là list, tất cả các functions của "sass:list" đều coi 1px như list chứa giá trị 1px.  

>```scss
>@use "sass:list";
>```


## 1. list.append()

Syntax:  

>```scss
>list.append($list, $val, $separator: auto) // => list
>```

Return a new list, được copy từ $list & thêm $val vào cuối. Trong đó:  

- $separator: là ký tự ngăn cách giữa các phần tử, có thể là: space, comma, slash (optional).  

*Ví dụ*:  

```scss
@debug list.append(10px 20px, 30px); // 10px 20px 30px
@debug list.append(10px 20px, 30px 40px); // 10px 20px (30px 40px)
@debug list.append(10px, 20px, $separator: comma); // 10px, 20px
@debug list.append((blue, red), green, $separator: space); // blue red green
```


## 2. list.set-nth()

Syntax:  

>```scss
>list.set-nth($list, $n, $value) // => list
>```

Return a new list, được copy từ $list với element ở index $n được thay thế bởi $value. Trong đó:  

- $n: index của element muốn thay thế (bắt đầu từ 1), nếu truyền đối số âm, sẽ được tính từ cuối của $list, nếu không tồn tại phần tử ở index $n trong list sẽ ném ra an error.  

*Ví dụ*:  

```scss
@debug list.set-nth(10px 20px 30px, 1, 2em); // 2em 20px 30px
@debug list.set-nth(10px 20px 30px, -1, 8em); // 10px, 20px, 8em
@debug list.set-nth((Helvetica, Arial, sans-serif), 3, Roboto); // Helvetica, Arial, Roboto
```


## 3. list.join()

Syntax:  

>```scss
>list.join($list1, $list2, $separator: auto, $bracketed: auto) // => list
>```

Return a new list được kết hợp từ $list1 & $list2, chứa các phần tử của $list1 theo sau là các phần tử của $list2. Trong đó:  

- $separator: là ký tự ngăn cách giữa các phần tử, có thể là: space, comma, slash (optional).  
- $bracketed: là boolean, quyết định có dùng ngoặc "[]" bao lại list hay không (optional).  

*Ví dụ*:  

```scss
@debug list.join(10px, 20px); // 10px 20px
@debug list.join(10px 20px, 30px 40px); // 10px 20px 30px 40px
@debug list.join((blue, red), (#abc, #def)); // blue, red, #abc, #def
@debug list.join(10px, 20px, $separator: comma); // 10px, 20px
@debug list.join((blue, red), (#abc, #def), $separator: space); // blue red #abc #def
@debug list.join([10px], 20px); // [10px 20px]
@debug list.join(10px, 20px, $bracketed: true); // [10px 20px]
```


## 4. list.zip()

Syntax:  

>```scss
>list.zip($lists...) // => list
>```

Return a new list, chứa các sub-lists được kết hợp từ các phần tử có cùng index của các lists được truyền vào.  

Số lượng sub-lists chính là số lượng phần tử của lists có số phần tử ít nhất.  

Các phần tử của new list trả về được ngăn cách bởi ký tự comma "," còn các phần tử của sub-lists được ngăn cách bởi ký tự space " ".  

*Ví dụ*:  

```scss
@debug list.zip(10px 50px 100px, short mid long); // 10px short, 50px mid, 100px long
@debug list.zip(10px 50px 100px, short mid); // 10px short, 50px mid
```


## 5. list.index()

Syntax:  

>```scss
>list.index($list, $value) // => number | null
>```

Return index của $value trong $list.  

Nếu $value không xuất hiện trong $list sẽ return null, nếu $value xuất hiện nhiều lần trong $list sẽ return index của lần xuất hiện đầu tiên.

*Ví dụ*:  

```scss
@debug list.index(1px solid red, 1px); // 1
@debug list.index(1px solid red, dashed); // null
```


## 6. list.nth()

Syntax:  

>```scss
>list.nth($list, $n)
>```

Return phần tử có index $n của $list, trong đó:  

- $n: index của element muốn lấy giá trị (bắt đầu từ 1), nếu truyền đối số âm, sẽ được tính từ cuối của $list, nếu không tồn tại phần tử ở index $n trong list sẽ ném ra an error.  

*Ví dụ*:  

```scss
@debug list.nth(10px 12px 16px, 2); // 12px
@debug list.nth([line1, line2, line3], -1); // line3
```


## 7. list.length()

Syntax:  

>```scss
>list.length($list) // => number
>```

Return a number là số phần tử của $list, hoặc số các cặp key/value của map.  

*Ví dụ*:  

```scss
@debug list.length(10px 20px 30px); // 3
@debug list.length((width: 10px, height: 20px)); // 2
```


## 8. list.separator()

Syntax:  

>```scss
>list.separator($list) // => unquoted string
>```

Return a unquoted string, là tên ký tự ngăn cách các phần tử của $list, có thể là: space, comma, slash.  

Nếu $list là giá trị riêng lẻ, không có ký tự ngăn cách sẽ trả về giá trị space.

*Ví dụ*:  

```scss
@debug list.separator(1px 2px 3px); // space
@debug list.separator(1px, 2px, 3px); // comma
@debug list.separator('Helvetica'); // space
@debug list.separator(()); // space
```


## 9. list.is-bracketed()

Syntax:  

>```scss
>list.is-bracketed($list) // => boolean
>```

Return a boolean, kiểm tra $list có chứa ngoặc "[]" hay không.  

*Ví dụ*:  

```scss
@debug list.is-bracketed(1px 2px 3px); // false
@debug list.is-bracketed([1px, 2px, 3px]); // true
```