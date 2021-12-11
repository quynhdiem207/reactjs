# --- Style rules ---

## 1. Style rules

1. Giống CSS & hoạt động một cách tương tự:  
    - SCSS syntax:  
        ```scss
        // filename.scss
        selector {
            property: value;
        }
        ```  

    - Indented syntax:  
        ```scss
        // filename.sass
        selector
            property: value
        ```

2. **Nesting**:  
    SCSS syntax:  
    ```scss
    selector-1 {
        selector-2 {
            property: value;
        }
    }
    ```  

    CSS syntax:  
    ```css
    select-1 select-2 {
        property: value;
    }
    ```

    1. **Selector lists**:  
        SCSS syntax:  
        ```scss
        selector-1, selector-2 {
            selector-3, selector-4 {
                property: value;
            }
        }
        ```  

        CSS syntax:  
        ```css
        selector-1 selector-3, selector-1 selector-4, 
        selector-2 selector-3, selector-1 selector-4 {
            property: value;
        }
        ```

    2. **Selector combinators**:  
        SCSS syntax:  
        ```scss
        selector-1 > {
            selector-2 {
                property: value;
            }
        }

        selector-1 {
            + selector-2 {
                property: value;
            }
        }

        selector-1 {
            ~ {
                selector-2 {
                    property: value;
                }
            }
        }
        ```  

        CSS syntax:  
        ```css
        selector-1 > selector-2 {
            property: value;
        }

        selector-1 + selector-2 {
            property: value;
        }

        selector-1 ~ selector-2 {
            property: value;
        }
        ```

3. **Interpolation** (nội suy **#{}**): Sử dụng đưa giá trị expression vào selector để tạo nên dynamic selector.  

    ```scss
    @mixin corner-icon($name, $top-or-bottom, $left-or-right) {
        .icon-#{$name} {
            background-image: url("/icons/#{$name}.svg");
            position: absolute;
            #{$top-or-bottom}: 0;
            #{$left-or-right}: 0;
        }
    }

    @include corner-icon("mail", top, left);
    ```

    *Note*: **#{}** sẽ bỏ đi dấu ngoặc trích dẫn của chuỗi giá trị, sử dụng **meta.inspect()** để ngăn điều này.  
    ```scss
    @use "sass:meta";
    #{meta.inspect(selector)} {
        property: value;
    }
    ```


## 2. Property declarations

Syntax: **property: value;**  

**Ví dụ**:  
```scss
.circle {
    $size: 100px;
    width: $size;
    height: $size;
    border-radius: $size * 0.5;
}
```

1. Interpolation **#{}**: Sử dụng đưa giá trị expression vào property's name hoặc property's value để tạo nên dynamic property & custom property value.  
    
    ```scss
    @mixin prefix($property, $value, $prefixes) {
        @each $prefix in $prefixes {
            -#{$prefix}-#{$property}: $value;
        }

        #{$property}: $value;
    }

    .gray {
        @include prefix(filter, grayscale(50%), moz webkit);
    }
    ```
    
    *Note*: **#{}** sẽ bỏ đi dấu ngoặc trích dẫn của chuỗi giá trị, sử dụng **meta.inspect()** để ngăn điều này.  
    ```scss
    @use "sass:meta";
    selector {
        property: #{meta.inspect(value)};
    }
    ```

2. **Nesting**: Khi được compiled, trong CSS output property's name kết quả sẽ được nối outer property name & inner property name ngăn cách bởi dấu "-".  
    SCSS syntax:  
    ```scss
    prefixProperty: {
        property: value;
    }
    ```

    CSS syntax:  
    ```css
    prefixProperty-property: value
    ```

    **Ví dụ**:  
    SCSS input:  
    ```scss
    .enlarge {
        font-size: 14px;
        transition: {
            property: font-size;
            duration: 4s;
            delay: 2s;
        }

        &:hover { font-size: 36px; }
    }
    ```

    CSS output:  
    ```css
    .enlarge {
        font-size: 14px;
        transition-property: font-size;
        transition-duration: 4s;
        transition-delay: 2s;
    }
    .enlarge:hover {
        font-size: 36px;
    }
    ```

    **Shorthand**:  
    SCSS input:  
    ```scss
    .info-page {
        margin: auto {
            bottom: 10px;
            top: 2px;
        }
    }
    ```

    CSS output:  
    ```css
    .info-page {
        margin: auto;
        margin-bottom: 10px;
        margin-top: 2px;
    }
    ```

3. **Hidden Declarations**: Tùy thuộc vào điều kiện mà property có được compile sang css hay không.  
    SCSS input:  
    ```scss
    $rounded-corners: false;

    .button {
        border: 1px solid black;
        border-radius: if($rounded-corners, 5px, null);
    }
    ```

    CSS output:  
    ```css
    .button {
        border: 1px solid black;
    }
    ```

4. **Custom property**: Là CSS variable.  

    ```scss
    $primary: #81899b;

    :root {
        --primary: #{$primary};
        --consumed-by-js: $primary;
    }
    ```


## 3. Parent selector &

Parent selector (**&**) được sử dụng trong nested selector, tham chiếu đến outer selector.  

Thường được sử dụng để:  
>- Add pseudo-class, pseudo-element  
>- Add selector before parent
>- Create new selector by adding suffix (hậu tố)
>- Pass "&" as an argument for function or ${}

**Ví dụ**:  
SCSS input:  
```scss
.alert {
    max-width: 600px;

    // Add pseudo-class
    &:hover {
        font-weight: bold;
    }

    // Add selector before parent
    [dir=rtl] & {
        margin-left: 0;
        margin-right: 10px;
    }

    // Pass "&" as an argument for pseudo-class function
    :not(&) {
        opacity: 0.8;
    }

    // Create new selector by adding suffix
    &__copy {
        display: none;
        padding: 1rem 1.5rem 2rem 1.5rem;
        color: gray;
        line-height: 1.6;
        font-size: 14px;
        font-weight: 500;

        &--open {
            display: block;
        }
    }
}
```

CSS output:  
```css
.alert {
    max-width: 600px;
}

.alert:hover {
  font-weight: bold;
}

[dir=rtl] .alert {
  margin-left: 0;
  margin-right: 10px;
}

:not(.alert) {
  opacity: 0.8;
}

.alert__copy {
  display: none;
  padding: 1rem 1.5rem 2rem 1.5rem;
  color: gray;
  line-height: 1.6;
  font-size: 14px;
  font-weight: 500;
}

.alert__copy--open {
  display: block;
}
```

Nếu **&** expression được sử dụng ngoài style rules sẽ trả về **null**, điều này cho phép xác định mixin có được gọi trong style rule hay không:  

SCSS input:  
```scss
@mixin app-background($color) {
  #{if(&, '&.app-background', '.app-background')} {
    background-color: $color;
    color: rgba(#fff, 0.75);
  }
}

@include app-background(#036);

.sidebar {
  @include app-background(#c6538c);
}
```

CSS output:  
```css
.app-background {
  background-color: #036;
  color: rgba(255, 255, 255, 0.75);
}

.sidebar.app-background {
  background-color: #c6538c;
  color: rgba(255, 255, 255, 0.75);
}
```


## 4. Placeholder selector

- Bắt đầu bằng kí tự **%**, eg: %active.  
- Hoạt động tương tự class selector.  
- Không được bao gồm trong CSS output, nhưng vẫn có thể được extends.  
    - Không cần một class name xác định cho HTML.  
    - Không làm lộn xộn code nếu không được extends.  
    -> Hữu ích khi viết style rule mà có thể hoặc không được sử dụng.  

SCSS input:  
```scss
.alert:hover, %strong-alert {
    font-weight: bold;
}

%strong-alert:hover {
    color: red;
}
```

CSS output:  
```css
.alert:hover {
  font-weight: bold;
}
```

**Ví dụ**:  

SCSS input:  
```scss
%toolbelt {
    box-sizing: border-box;
    border-top: 1px rgba(#000, .12) solid;
    padding: 16px 0;
    width: 100%;

    &:hover { border: 2px rgba(#000, .5) solid; }
}

.action-buttons {
    @extend %toolbelt;
    color: #4285f4;
}

.reset-buttons {
    @extend %toolbelt;
    color: #cddc39;
}
```

CSS output:  
```css
.action-buttons, .reset-buttons {
  box-sizing: border-box;
  border-top: 1px rgba(0, 0, 0, 0.12) solid;
  padding: 16px 0;
  width: 100%;
}

.action-buttons:hover, .reset-buttons:hover {
  border: 2px rgba(0, 0, 0, 0.5) solid;
}

.action-buttons {
  color: #4285f4;
}

.reset-buttons {
  color: #cddc39;
}
```