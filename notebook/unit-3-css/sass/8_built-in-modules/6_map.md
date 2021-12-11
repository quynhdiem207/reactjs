# --- sass:map ---

**sass:map** giúp truy xuất các cặp key/value của map.  

Hõ trợ làm việc với các map lồng nhau.  

>```scss
>@use "sass:map";
>```


## 1. map.merge()

Syntax:  

>```scss
>map.merge($map1, $map2)
>map.merge($map1, $keys..., $map2) // => map
>```

Return a map, trong đó:  

- $keys: là các keys trỏ đến a map được lồng bên trong $map1 (optional).  

1. Nếu $keys không được truyền, sẽ return a new map gồm tất cả các cặp key/value của $map1 & $map2.  
    
    Nếu $map1 & $map2 có key trùng nhau, value của $map2 sẽ được ưu tiên hơn.  

    *Ví dụ*:  

    ```scss
    $light-weights: ("lightest": 100, "light": 300);
    $heavy-weights: ("medium": 500, "bold": 700);

    // ("lightest": 100, "light": 300, "medium": 500, "bold": 700)
    @debug map.merge($light-weights, $heavy-weights);
    ```

2. Nếu $keys được truyền, sẽ return a new map được copy từ $map1, tìm tới map lồng bên trong $map1 trỏ bởi $keys & kết hợp với $map2.  

    Nếu map lồng bên trong $map1 trỏ bởi $keys & $map2 có key trùng nhau, value của $map2 sẽ được ưu tiên hơn.  
    
    *Ví dụ*:  

    ```scss
    $fonts: (
        "Helvetica": (
            "weights": (
                "lightest": 100,
                "light": 300
            )
        )
    );

    $heavy-weights: ("medium": 500, "bold": 700);

    @debug map.merge($fonts, "Helvetica", "weights", $heavy-weights);
    // (
    //   "Helvetica": (
    //     "weights": (
    //       "lightest": 100,
    //       "light": 300,
    //       "medium": 500,
    //       "bold": 700
    //     )
    //   )
    // )
    ```


## 2. map.deep-merge()

Syntax:  

>```scss
>map.deep-merge($map1, $map2) // => map
>```

Return a new map, được kết hợp từ $map1 & $map2.  

Tương tự như **"map.merge($map1, $map2)"**, nhưng các map được lồng bên trong $map1 & $map2 có key trùng nhau, thay vì ưu tiên thì sẽ được đệ quy kết hợp với nhau.  

*Ví dụ*:  

```scss
$helvetica-light: (
  "weights": (
    "lightest": 100,
    "light": 300
  )
);

$helvetica-heavy: (
  "weights": (
    "medium": 500,
    "bold": 700
  )
);

@debug map.deep-merge($helvetica-light, $helvetica-heavy);
// (
//   "weights": (
//     "lightest": 100,
//     "light": 300,
//     "medium": 500,
//     "bold": 700
//   )
// )

@debug map.merge($helvetica-light, $helvetica-heavy);
// (
//   "weights": (
//     "medium: 500,
//     "bold": 700
//   )
// )
```


## 3. map.remove()

Syntax:  

>```scss
>map.remove($map, $keys...) // => map
>```

Return a new map, được copy từ $map & xóa bỏ đi các values được kết hợp với $keys đã liệt kê.  

Nếu trong các $keys có key không nằm trong map, cũng sẽ không gây lỗi.  

*Ví dụ*:  

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.remove($font-weights, "regular"); // ("medium": 500, "bold": 700)
@debug map.remove($font-weights, "regular", "bold"); // ("medium": 500)
@debug map.remove($font-weights, "bolder");
// ("regular": 400, "medium": 500, "bold": 700)
```


## 4. map.deep-remove()

Syntax:  

>```scss
>map.deep-remove($map, $key, $keys...) // => map
>```

Return a map, trong đó:  

- $keys: là các keys trỏ đến a map được lồng bên trong $map (optional).  

1. Nếu $keys không được truyền, sẽ return a new map được copy từ $map, & xóa bỏ value được kết hợp với $key.  

    *Ví dụ*:  

    ```scss
    $font-weights: ("regular": 400, "medium": 500, "bold": 700);

    // ("medium": 500, "bold": 700)
    @debug map.deep-remove($font-weights, "regular");
    ```

2. Nếu $keys được truyền, sẽ return a new map được copy từ $map, tìm tới map lồng bên trong $map trỏ bởi $keys & xóa bỏ value được kết hợp với $key.  

    *Ví dụ*:  

    ```scss
    $fonts: (
        "Helvetica": (
            "weights": (
                "regular": 400,
                "medium": 500,
                "bold": 700
            )
        )
    );

    @debug map.deep-remove($fonts, "Helvetica", "weights", "regular");
    // (
    //   "Helvetica": (
    //     "weights: (
    //       "medium": 500,
    //       "bold": 700
    //     )
    //   )
    // )
    ```


## 5. map.set()

Syntax:  

>```scss
>map.set($map, $key, $value)
>map.set($map, $keys..., $key, $value) // => map
>```

Return a map, trong đó:  

- $keys: là các keys trỏ đến a map được lồng bên trong $map (optional).  

1. Nếu $keys không được truyền, sẽ return a new map được copy từ $map, & sửa đổi value tại $key thành $value, nếu $key không tồn tại trong $map sẽ thêm cặp $key/$value vào $map.  

    *Ví dụ*:  

    ```scss
    $font-weights: ("regular": 400, "medium": 500, "bold": 700);

    // ("regular": 300, "medium": 500, "bold": 700)
    @debug map.set($font-weights, "regular", 300);
    ```

2. Nếu $keys được truyền, sẽ return a new map được copy từ $map, tìm tới map lồng bên trong $map trỏ bởi $keys & sửa đổi value tại $key thành $value, nếu $key không tồn tại trong map sẽ thêm cặp $key/$value vào map.  

    *Ví dụ*:  

    ```scss
    $fonts: (
        "Helvetica": (
            "weights": (
                "regular": 400,
                "medium": 500,
                "bold": 700
            )
        )
    );

    @debug map.set($fonts, "Helvetica", "weights", "regular", 300);
    // (
    //   "Helvetica": (
    //     "weights": (
    //       "regular": 300,
    //       "medium": 500,
    //       "bold": 700
    //     )
    //   )
    // )
    ```


## 6. map.get()

Syntax:  

>```scss
>map.get($map, $key, $keys...)
>```

Return a value, trong đó:  

- $keys: là các keys trỏ đến a map được lồng bên trong $map (optional).  

1. Nếu $keys không được truyền, sẽ return a value được kết hợp với $key trong $map.  

    Nếu $map không có $key sẽ return null.  

    *Ví dụ*:  

    ```scss
    $font-weights: ("regular": 400, "medium": 500, "bold": 700);

    @debug map.get($font-weights, "medium"); // 500
    @debug map.get($font-weights, "extra-bold"); // null
    ```

2. Nếu $keys được truyền, tìm tới map lồng bên trong $map trỏ bởi $keys & return value được kết hợp với $key.  

    Nếu map được lồng bên trong $map trỏ bởi $keys không có $key, hoặc một trong $keys không tồn tại trong $map, hoặc tham chiếu tới value không phải map sẽ return null.  

    *Ví dụ*:  

    ```scss
    $fonts: (
        "Helvetica": (
            "weights": (
                "regular": 400,
                "medium": 500,
                "bold": 700
            )
        )
    );

    @debug map.get($fonts, "Helvetica", "weights", "regular"); // 400
    @debug map.get($fonts, "Helvetica", "colors"); // null
    ```


## 7. map.has-key()

Syntax:  

>```scss
>map.has-key($map, $key, $keys...) // => boolean
>```

Return a boolean, kiểm tra $key có tồn tại hay không, trong đó:  

- $keys: là các keys trỏ đến a map được lồng bên trong $map (optional).  

1. Nếu $keys không được truyền, sẽ kiểm tra $key có tồn tại trong $map hay không.  

    *Ví dụ*:  

    ```scss
    $font-weights: ("regular": 400, "medium": 500, "bold": 700);

    @debug map.has-key($font-weights, "regular"); // true
    @debug map.has-key($font-weights, "bolder"); // false
    ```

2. Nếu $keys được truyền, tìm tới map lồng bên trong $map trỏ bởi $keys & kiểm tra $key có tồn tại trong map này hay không.  

    *Ví dụ*:  

    ```scss
    $fonts: (
        "Helvetica": (
            "weights": (
                "regular": 400,
                "medium": 500,
                "bold": 700
            )
        )
    );

    @debug map.has-key($fonts, "Helvetica", "weights", "regular"); // true
    @debug map.has-key($fonts, "Helvetica", "colors"); // false
    ```


## 8. map.keys()

Syntax:  

>```scss
>map.keys($map) // => list
>```

Return a list được ngăn cách bởi comma "," của tất cả các keys trong $map.  

*Ví dụ*:  

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.keys($font-weights); // "regular", "medium", "bold"
```


## 9. map.values()

Syntax:  

>```scss
>map.values($map) // => list
>```

Return a list được ngăn cách bởi comma "," của tất cả các values trong $map.  

*Ví dụ*:  

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.values($font-weights); // 400, 500, 700
```
