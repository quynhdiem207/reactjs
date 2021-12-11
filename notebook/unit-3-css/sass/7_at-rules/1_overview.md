## 1. Overview at-rules

Một số at-rules:  

- [@use]: Load public members (mixins, functions, variables) từ stylesheet khác, & kết hợp CSS từ nhiều stylesheet lại với nhau.  
- [@forward]: Load a stylesheet, & làm cho public members (mixins, functions, variables) của module đó sẵn có như thể được trực tiếp định nghĩa trong this stylesheet khi được loaded với @use.  
- [@import]: Load styles, members (mixins, functions, and variables) từ stylesheet khác, & kết hợp CSS từ nhiều stylesheet lại với nhau.  
    *Note*: Không nên sử dụng @import vì có một vài vấn đề, thay vào đó hãy sử dụng @use.  
- [@mixin] & [@include]: Định ngĩa các styles có thể tái sử dụng trong stylesheet.  
- [@function]: Định nghĩa các custom function mà có thể được sử dụng trong expression.  
- [@extend]: Cho phép selector thừa kế styles từ 1 selector khác.  
- [@at-root]: Đặt styles vào root của CSS document.  
- [@error]: In ra error, dừng compile stylesheet & thông báo xảy ra lỗi cho system.  
- [@warn]: In ra một cảnh báo mà không dừng toàn bộ việc compile.  
- [@debug]: In ra một message cho mục đích gỡ lỗi.  
- [Flow-control] rules: **@if** ... **@else**, **@each**, **@for**, **@while** nhằm kiểm soát xem có phát styles hay không, hoặc số lần styles được phát.  
- [From-CSS] rules: **@supports**, **@keyframes**, **@media**, **@font-face**, **@charset**, ...  
