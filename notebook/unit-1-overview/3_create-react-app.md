## 1. NodeJS  

NodeJS là JS runtime environment.  

Khi cài NodeJS sẽ tạo ra môi trường độc lập để thực thi JS mà không cần đến môi trường browser. Khi cài NodeJS sẽ đồng thời cài NPM library giúp dễ dàng download các libraries trên https://npm.com.  

Việc dựng môi trường chỉ là để tiện cho quá trình phát triển (development), còn khi deploy lên trên production thì sẽ xây dựng (build) ra file tĩnh rồi triển khai.  

Facebook đã xây dựng sẵn **create-react-app** library hỗ trợ nhanh chóng & dễ dàng tạo React project đã tích hợp sẵn react, react-dom, babel & webpack.  


## 2. Webpack

**webpack** library: Giúp module hóa ứng dụng front-end. nó module hóa gần như mọi file làm việc với front-end từ JS, image, CSS, SCSS files, ... vì vậy đều có thể import hay export các file này.  

- Hỗ trợ compile & kết hợp lại các file đã chia nhỏ để tạo ra số lượng static file đầu ra tối thiểu.  
    - eg: chỉ còn một file CSS, 1 file JS, ...  

    -> *Mục đích*: Khi triển khai số lượng file ít sẽ giảm đi số lượng kết nối đến các file, giảm thời gian tải trang, & tăng hiệu năng của ứng dụng (Do mỗi lần tải 1 file sẽ phải gửi đi 1 request HTTP đến các file này mà bản chất của request HTTP cần phải mở & đóng kết nối -> tăng thời gian tải trang nếu request đến nhiều file).  

- Giúp làm các file đầu ra trở thành mini file:  
    - Tên biến thành một kí tự,  
    - Loại bỏ khoảng xuống dòng & comment không cần thiết, ...  

    -> *Mục đích*: Làm giảm dung lượng file, giúp giảm thời gian tải khi truy cập website nhờ cài các plugin hỗ trợ.  

Ưu điểm:  

- Quản lý file hiệu quả nhờ module hóa.  
- Compile lại làm mini file để tối ưu sản phẩm khi deploy lên production.  


## 3. Tạo project react + webpack + babel  

1. Cấu trúc thư mục:  
    > - project-name        (thư mục gốc)
    >   - src               (thư mục chứa source code chính)
    >       - components    (thư mục chứa các components)
    >       - index.js      (file khởi tạo, render App vào #root)
    >   - public
    >       - index.html    (HTML page chứa #root element)  
2. Khởi tạo dự án.  
3. Cài webpack (**webpack** + **webpack-cli**) for dev.  
4. Cài **react** + **react-dom**.  
5. Cài babel (**@babel/core** + **@babel/preset-env** + **@babel/preset-react** + **babel-loader**) for dev.  
    >- @babel/core: Chuyển đổi ES6 về ES5.
    >- @babel/preset-env: Cấu hình environment phù hợp nhiều browser khác nhau (chuyển ES6+ -> ES5).
    >- @babel/preset-react: Chuyển đổi JSX về JS.
    >- babel-loader: Cho phép chuyển đổi JS files sử dụng babel + webpack.  
6. Tạo index.html  
7. Tạo index.js  
8. Cấu hình webpack:  
    1. Cài **css-loader** + **style-loader** for dev (giúp webpack tải .css file dạng module).  
    2. Tạo webpack.config.js cấu hình cho webpack.  
    3. Tạo file .babelrc cấu hình cho Babel library để babel biết cần sử dụng thêm preset-env & preset-react hỗ trợ chuyển đổi mã.  
    4. Thêm các scripts trong package.json:  
        ```json
        "scripts": {
            "start": "webpack --mode development --watch",
            "build": "webpack --mode production"
        },
        ```  
        > - yarn start: chạy project.  
        > - yarn run build: build project sang production để deploy.  
9. Chạy project:  
    1. Biên dịch code với webpack:  
        - yarn start (--mode development sẽ không tối ưu files & --watch lắng nghe sự thay đổi ở entry point JS file rồi build lại & update bundle.js).  
        - yarn run build (--mode production sẽ tối ưu files để deploy).  
        - bundle.js là sản phẩm được build từ src/index.js, kết hợp các thư viện đã cài & chuyển đổi ES6+ thành ES5, JSX thành JS.  
    2. Chạy project:  
        - Thêm thẻ script link tới file build/bundle.js đã build khi chạy yarn start vào public/index.html  
        - Chạy project với Live server của VSCode trên public/index.html lắng nghe sự thay đổi của build/bundle.js  
10. Cài **html-webpack-plugin** for dev cho webpack, webpack sử dụng plugin này để tạo build/index.html & tự động link output build/bundle.js được build ra từ public/index.html vào mà không cần link thủ công.  
    - Thêm plugin đã cài vào file cấu hình webpack.config.js  
    - Xóa bỏ thẻ script đã link bundle.js thủ công khỏi public/index.html  
    - Build lại code & chạy project tại build/index.html  
    **Note**: Chạy project ở build/index.html & viết code ở public/index.html  
11. Cài **webpack-dev-server** for dev để thay thế VSCode Live server, nó đảm nhiệm cả compile code lắng nghe sự thay đổi của webpack & chạy web server.  
    - Sửa cấu hình scripts command line trong package.json:  
        ```json
        "scripts": {
            "start": "webpack-dev-server --mode development --open --hot"
        }
        ```  
    - Chạy project với yarn start (--hot [hot reload] sẽ update phần thay đổi trong code thay vì reload cả trang & --open sẽ tự bật trên browser)  

**Note**: Project tạo thủ công này chưa tích hợp thông báo lỗi syntax, trong khi project tạo bởi create-react-app library đã tích hơp sẵn **eslint** library cảnh báo lỗi syntax & các tiện ích khác.  


## 4. Tạo project sử dụng ceate-react-app  

ceate-react-app giúp đơn giản hóa quá trình sử dụng webpage & reactjs để tạo dự án thay vì cấu hình phức tạp.  

Command line: **npx create-react-app project-name**

Các scripts:  

- yarn start: starts development server (thay thế VSCode Live server).  
    Sử dụng webpack-dev-server tự động opent project lên browser.  
- yarn build: build sourse code into static files for production.  
- yarn test: Run test.  
- yarn eject: Bung ra cấu hình webpack bị ẩn đi (nên tránh, thay vào đó sẽ sử dụng các libraries hỗ trợ thay đổi cấu hình webpack).  


## 5. NPM, NPX & YARN  

- NPM (Node Package Manager): Giúp quản lý các JS libraries.  
    - NPM cung cấp website npmjs để quản lý & lưu trữ các thư viện.  
    - NPM là một command-line interface (CLI), hỗ trợ tương tác với NPM qua terminal.  
    - Có 2 loại scope: Project & Global.  
    - Project scope: sử dụng khi project phụ thuộc vào các libraries này.  
        - khi cài hay xóa thư viện sẽ không ảnh hưởng tới project khác.  
        - Khi cài library thì sẽ download từ npmjs & lưu vào node_modules của project & được list vào mục dependencies / devDependencies.  
            >npm i libraryName \[-dev\] 
        - Khi xóa thư viện sẽ xóa khỏi node_modules & list dependencies / devDependencies.  
            >npm uninstall libraryName  

    - Global scope: sử dụng khi project không bị phụ thuộc vào các libraries (trong code không hề import thư viện này), phổ biến là libraries cho phép thực thi các command line hay scripts, eg: nodemon, create-react-app, cross-env, ...  
        - Khi cài library sẽ download từ npmjs & lưu vào User directory, vì vậy có thể thực thi ở bất cứ đâu.  
            >npm i -g libraryName *hoặc* npm i --global libraryName  
        - Khi xóa thư viện sẽ xóa khỏi User directory.  
            >npm uninstall -g libraryName  

    - Các thư viện cho phép thực thi command thực ra cung cấp một file **bin** giúp thực thi script trong Shell script.  

- NPX được cài kèm cùng NPM, hỗ trợ thực thi các thư viện cung cấp file **bin**. Khi thực thi cmd NPX sẽ kiểm tra Project scope có node_modules hay không, nếu có nó sẽ vào thư mục ".bin" tìm đến file cùng tên, nếu thấy sẽ thực thi. Nếu trong Project scope không thấy sẽ tìm ở Global scope, nếu thấy sẽ thực thi, nếu không thấy sẽ lên NPMJS install về để thực thi, sau khi thực thi xong sẽ xóa bỏ source code của thư viện.  
    - Ưu điểm: luôn dùng được version mới nhất.  

- YARN là một package manager quản lý các JS libraries.  
    - Là sản phẩm của Facebook, ra đời nhằm cải thiện các vấn đề NPM gặp phải như performance, security nhưng hiện tại NPM đã cải thiện được các vấn đề này nên sự khác biệt giữa YARN & NPM là không lớn.  

    >yarn add libraryName \[-D / --dev\]  
    >yarn remove libraryName  
    >yarn global add libraryName  
    >yarn global remove libraryName  

**Note**:  

- Package.json: Quản lý các libraries ở Project scope mà chúng ta tự cài.  
- yarn.lock or package-lock.json: Quản lý hết tất cả các thư viện chúng ta cài & các phụ thuộc của chúng, để optimize performance (nhanh hơn khi reinstall node_modules hoặc khi install một thư viện sẽ kiểm tra các phụ thuộc của nó đã được cài hay chưa dựa vào file lock này).  

Sự khác biệt giữa NPM & YARN không lớn:  

- Về cơ chế tạo nên sự khác biệt về performance:  
    - NPM: Khi cài nhiều libraries cùng lúc sẽ cài tuần tự từng library.  
    - YARN: Khi cài nhiều libraries cùng lúc sẽ cài song song. -> nhanh hơn một chút nhưng còn phụ thuộc vào băng thông mạng & không phải nhanh hơn với số lần nhân lên.  
- Về cơ chế cache: YARN có tốc độ reinstall nhanh hơn nhưng tốn bộ nhớ hơn do phải dành ra một vùng nhớ để ghi lại khi cài lần đầu. -> Dùng YARN khi dư thừa bộ nhớ.  


## 6. Cấu trúc thư mục project được tạo bởi create-react-app  

- public directory: Chứa các file có thể truy cập công khai qua URL trên browser. Web server coi public đóng vai trò là thư mục gốc (root) nên sẽ trỏ thẳng đến public khi start server.  
    - index.html: Do ReactJS là SPA nên mặc định sẽ luôn load ra index.html, trừ khi truy cập đến các file khác tồn tại trong public thì mới load ra file đó. Nếu không dù nhập sai URL path truy cập đến các file không tồn tại vẫn load ra index.html, giúp cho web luôn được hiển thị.  
    - favicon.ico: Icon của browser tab.  
    - manifest.json: Khai báo rõ ràng thông tin website, thường sử dụng để browser hiểu rõ thông tin web trong tình huống phát triển web PWA.  
    - robots.txt: Hướng dẫn search engine khi quét web nên tìm đến địa chỉ nào & không nên tìm đến địa chỉ nào.  

- src directory: Chứa source code của web.  
    - index.js: entry point file mà webpack trỏ đến, compile & render ra bundle.js để chạy khi web chạy trên browser.  
    - App.js: Component chứa toàn bộ code website, có thể chia nhỏ website thành các components & import vào đây.  
    - reportWebVitals.js: Sử dụng để thống kê, báo cáo giúp cung cấp cho search engine trong tương lai hiểu được web có hiệu năng như thế nào nhằm mục đích tối ưu trải nghiệm người dùng. Trong tương lai có thể gửi những thông tin này lên Google analytics (công cụ phân tích của Google) để nó phân tích website biết được website có hiệu năng thế nào (eg: thời gian render ra giao diện bao nhiêu, thời gian truy cập, ...), từ đó phát hiện ra vấn đề của website & nâng cấp hiệu năng.  
    - setupTests.js: sử dụng để chạy test, viết test xem component có chạy đúng mong muốn hay không.  

- build directory: Sản phẩm đầu cuối được sinh ra từ source code để deploy lên cho khách hàng trong tương lai, triển khai lên hosting.  
- .gitignore: Khai báo file & directory bị bỏ qua khi commit lên git server.  
- README.md: File document mô tả về project sẽ được hiển thị khi đẩy lên Git server.  


## 7. serve  

Install **serve** library & chạy script **serve -s build** để start một web server khác chạy source code production đã tối ưu được build ra để deploy.  