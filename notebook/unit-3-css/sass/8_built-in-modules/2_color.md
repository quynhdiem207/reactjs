# --- sass:color ---

**sass:color** module cung cấp các functions giúp tạo new color dựa trên color khác & lấy các trị số của color.  

>```scss
>@use "sass:color";
>```


## 1. color.hwb()

Syntax:  

>```scss
>color.hwb($hue, $whiteness, $blackness, $alpha: 1) // => color
>```

Return a color, trong đó:  

- $hue (màu sắc): number có giá trị từ 0deg đến 360deg (có thể bỏ đơn vị).  
- $whiteness (độ trắng): number có giá trị từ 0 - 100%.  
- $blackness (độ đen): number có giá trị từ 0 - 100%.  
- $alpha (độ trong suốt): number có giá trị từ 0 - 1, hoặc từ 0 - 100% (optional).  

*Ví dụ*:  
```scss
@debug color.hwb(210, 0%, 60%); // #036
@debug color.hwb(34, 89%, 5%); // #f2ece4
@debug color.hwb(210, 0%, 60%, 0.5); // rgba(0, 51, 102, 0.5)
```


## 2. color.adjust()

Syntax:  

>```scss
>color.adjust($color,
>  $red: null, $green: null, $blue: null,
>  $hue: null, $saturation: null, $lightness: null,
>  $whiteness: null, $blackness: null,
>  $alpha: null) // => color 
>```

Trả về color đã điều chỉnh từ $color, giúp tăng hoặc giảm một or nhiều thuộc tính của $color theo số lượng xác định, trong đó:

- $red, $green, and $blue có giá trị từ -255 đến 255.  
- $hue có giá trị từ -360deg đến 360deg (có thể bỏ đơn vị).  
- saturation, $lightness, $whiteness, and $blackness có giá trị từ -100% đến 100% (có thể bỏ đơn vị).  
- $alpha có giá trị từ -1 đến 1.  

Sẽ xảy ra lỗi nếu điều chỉnh cùng lúc các thuộc tính RGB & HSL, hoặc điều chỉnh RGB or HSL cùng lúc với HWB property ($hue, $whiteness & $blackness).  

*Ví dụ*:  
```scss
@debug color.adjust(#d2e1dd, $red: -10, $blue: 10); // #c8e1e7
@debug color.adjust(#998099, $lightness: -30%, $alpha: -0.4); // rgba(71, 57, 71, 0.6)
```


## 3. color.scale()

Syntax:  

>```scss
>color.scale($color,
>  $red: null, $green: null, $blue: null,
>  $hue: null, $saturation: null, $lightness: null,
>  $whiteness: null, $blackness: null,
>  $alpha: null) // => color
>```

Trả về color đã điều chỉnh từ $color, giúp tăng hoặc giảm một or nhiều thuộc tính của $color theo số lượng xác định một cách linh hoạt, trong đó:  

- Tất cả các keyword arguments truyền vào đều có giá trị từ 0 - 100%.  

Sẽ xảy ra lỗi nếu điều chỉnh cùng lúc các thuộc tính RGB & HSL, hoặc điều chỉnh RGB or HSL cùng lúc với HWB property ($hue, $whiteness & $blackness).  

*Ví dụ*:  
```scss
@debug color.scale(#6b717f, $red: 15%); // #81717f
@debug color.scale(#d2e1dd, $lightness: -10%, $saturation: 10%); // #b3d4cb
@debug color.scale(#998099, $alpha: -40%); // rgba(153, 128, 153, 0.6)
```

## 4. color.change()

Syntax:  

>```scss
>color.change($color,
>  $red: null, $green: null, $blue: null,
>  $hue: null, $saturation: null, $lightness: null,
>  $whiteness: null, $blackness: null,
>  $alpha: null) // => color
>```

Trả về color đã thay đổi từ $color, giúp thay đổi giá trị của một or nhiều thuộc tính của $color thành giá trị mới, trong đó:

- $red, $green, and $blue có giá trị từ -255 đến 255.  
- $hue có giá trị từ -360deg đến 360deg (có thể bỏ đơn vị).  
- saturation, $lightness, $whiteness, and $blackness có giá trị từ -100% đến 100% (có thể bỏ đơn vị).  
- $alpha có giá trị từ -1 đến 1.  

Sẽ xảy ra lỗi nếu chỉ định cùng lúc các thuộc tính RGB & HSL, hoặc điều chỉnh RGB or HSL cùng lúc với HWB property ($hue, $whiteness & $blackness).  

*Ví dụ*:  
```scss
@debug color.change(#d2e1dd, $red: 100, $blue: 50); // #64e132
@debug color.change(#998099, $lightness: 30%, $alpha: 0.5); // rgba(85, 68, 85, 0.5)
```


## 5. color.complement()

Syntax:  

>```scss
>color.complement($color) // => color
>```

Return a color được điều chỉnh từ $color, tương đương với:  
**"color.adjust($color, $hue: 180deg)"**.  

*Ví dụ*:  
```scss
// Hue 222deg becomes 42deg.
@debug color.complement(#6b717f); // #7f796b
```


## 6. color.grayscale()

Syntax:  

>```scss
>color.grayscale($color) // => color
>```

Return a gray color được điều chỉnh từ $color với cùng lightness, tương đương với:  
**"color.change($color, $saturation: 0%)"**.  

*Ví dụ*:  
```scss
@debug color.grayscale(#6b717f); // #757575
@debug color.grayscale(#036); // #333333
```


## 7. color.invert()

Syntax:  

>```scss
>color.invert($color, $weight: 100%) // => color
>```

Return a color là nghịch đảo hay negative (phủ định) của $color, trong đó:  

- $weight có giá trị từ 0 - 100% (optional), nếu $weight càng lớn sẽ càng gần với negative, càng nhỏ sẽ càng gần với $color.  

Nếu "$weight: 50%" sẽ luôn trả về #808080.  

*Ví dụ*:  
```scss
@debug color.invert(black); // white
@debug color.invert(#550e0c, 20%); // #663b3a
```


## 8. color.mix()

Syntax:  

>```scss
>color.mix($color1, $color2, $weight: 50%) // => color
>```

Return a color được trộn bởi $color1 & $color2, trong đó:  

- $weight có giá trị từ 0 - 100% (optional), nếu $weight càng lớn thì $color1 được sử dụng càng nhiều, càng nhỏ thì $color2 được sử dụng càng nhiều.  

*Ví dụ*:  
```scss
@debug color.mix(#036, #d2e1dd); // #698aa2
@debug color.mix(#036, #d2e1dd, 75%); // #355f84
```


## 9. color.ie-hex-str()

Syntax:  

>```scss
>color.ie-hex-str($color) // => unquoted string #AARRGGBB
>```

Return an unquoted string đại diện cho $color ở định dạng **#AARRGGBB** mà Internet Explorer’s -ms-filter property mong muốn.  

*Ví dụ*:  
```scss
@debug color.ie-hex-str(#808c99); // #FF808C99
@debug color.ie-hex-str(rgba(242, 236, 228, 0.6)); // #99F2ECE4
```


## 10. color.red()

Syntax:  

>```scss
>color.red($color) // => number
>```

Trả về trị số RGB red của $color, có giá trị từ 0 - 255.  

*Ví dụ*:  
```scss
@debug color.red(#e1d7d2); // 225
@debug color.red(white); // 255
@debug color.red(black); // 0
```


## 11. color.green()

Syntax:  

>```scss
>color.green($color) // => number
>```

Trả về trị số RGB green của $color, có giá trị từ 0 - 255.  

*Ví dụ*:  
```scss
@debug color.green(#e1d7d2); // 215
@debug color.green(white); // 255
@debug color.green(black); // 0
```


## 12. color.blue()

Syntax:  

>```scss
>color.blue($color) // => number
>```

Trả về trị số RGB blue của $color, có giá trị từ 0 - 255.  

*Ví dụ*:  
```scss
@debug color.blue(#e1d7d2); // 210
@debug color.blue(white); // 255
@debug color.blue(black); // 0
```


## 13. color.hue()

Syntax:  

>```scss
>color.hue($color) // => number
>```

Trả về trị số hue của $color, có giá trị từ 0 - 360deg.  

*Ví dụ*:  
```scss
@debug color.hue(#e1d7d2); // 20deg
```


## 14. color.saturation()

Syntax:  

>```scss
>color.saturation($color)// => number
>```

Trả về trị số HSL saturation của $color, có giá trị từ 0 - 100%.  

*Ví dụ*:  
```scss
@debug color.saturation(#e1d7d2); // 20%
```


## 15. color.lightness()

Syntax:  

>```scss
>color.lightness($color)// => number
>```

Trả về trị số HSL lightness của $color, có giá trị từ 0 - 100%.  

*Ví dụ*:  
```scss
@debug color.lightness(#e1d7d2); // 85.2941176471%
```


## 16. color.whiteness()

Syntax:  

>```scss
>color.whiteness($color)// => number
>```

Trả về trị số HWB whiteness của $color, có giá trị từ 0 - 100%.  

*Ví dụ*:  
```scss
@debug color.whiteness(#e1d7d2); // 82.3529411765%
@debug color.whiteness(white); // 100%
@debug color.whiteness(black); // 0%
```


## 17. color.blackness()

Syntax:  

>```scss
>color.blackness($color)// => number
>```

Trả về trị số HWB blackness của $color, có giá trị từ 0 - 100%.  

*Ví dụ*:  
```scss
@debug color.blackness(#e1d7d2); // 11.7647058824%
@debug color.blackness(white); // 0%
@debug color.blackness(black); // 100%
```


## 18. color.alpha()

Syntax:  

>```scss
>color.alpha($color)// => number
>```

Trả về trị số alpha của $color, có giá trị từ 0 - 1.  

*Ví dụ*:  
```scss
@debug color.alpha(#e1d7d2); // 1
@debug color.alpha(rgb(210, 225, 221, 0.4)); // 0.4
```