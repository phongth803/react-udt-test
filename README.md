## Quy trình biên dịch TypeScript sang JavaScript
1. **Phân tích cú pháp (Parsing)**  
  - Trình biên dịch TypeScript sẽ phân tích mã nguồn TypeScript và tạo ra một cây cú pháp trừu tượng (Abstract Syntax Tree - AST).  
  - Cây AST này đại diện cho cấu trúc của mã và cho phép trình biên dịch hiểu và xử lý mã một cách hiệu quả.

2. **Kiểm tra kiểu (Type-checking)**  
  - Trình biên dịch sẽ kiểm tra các kiểu dữ liệu của biến, hàm và biểu thức trong mã.  
  - Nó sẽ xác định xem có bất kỳ sai sót nào liên quan đến kiểu dữ liệu, chẳng hạn như việc gán một chuỗi cho một biến có kiểu số hay không.  
  - Giai đoạn này rất quan trọng vì nó giúp phát hiện lỗi trước khi mã được chạy.

3. **Tạo mã JavaScript (Generating JavaScript)**  
  - Sau khi quá trình kiểm tra kiểu hoàn tất mà không có lỗi, trình biên dịch sẽ tạo ra mã JavaScript từ mã TypeScript.  
  - Các chú thích kiểu (type annotations) sẽ bị loại bỏ và các tính năng đặc biệt của TypeScript sẽ được chuyển đổi sang các cú pháp tương đương trong JavaScript.  
  - Mã JavaScript được tạo ra sẽ tương đương với mã TypeScript gốc nhưng không còn chứa các yếu tố đặc trưng của TypeScript.

4. **Đóng gói (Bundling)**  
  - Để giảm thiểu số lượng yêu cầu HTTP và chuẩn bị mã JavaScript cho môi trường sản xuất, mã có thể được đóng gói bằng các công cụ như Webpack hoặc Rollup.  
  - Việc đóng gói giúp tối ưu hóa mã, giảm kích thước tệp và cải thiện hiệu suất tải trang.

5. **Thực thi (Execution)**  
  - Cuối cùng, mã JavaScript đã được đóng gói sẽ được thực thi trong trình duyệt hoặc trên máy chủ như bất kỳ mã JavaScript nào khác.  
  - Mã này có thể chạy trong môi trường JavaScript chuẩn và sẽ hoạt động tương tự như mã TypeScript gốc.