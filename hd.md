# -> CRUD Products -> CRUD Attributes -> CRUD Attributes Values -> CRUD Products Variants

## Khi nào áp dụng EAV Pattern?

EAV (Entity-Attribute-Value) Pattern thường được áp dụng trong các trường hợp sau:

- Khi dự án phức tạp, có nhiều lập trình viên, có kinh phí, có thời gian.
- Khi có nhiều loại mặt hàng có các thuộc tính khác nhau và thường xuyên bổ sung thuộc tính mới.

## Khi nào áp dụng nhúng thuộc tính vào product?

- Khi dự án đơn giản, có ít lập trình viên, không có kinh phí, không có thời gian.
- Khi có ít loại mặt hàng, các thuộc tính của chúng không thay đổi nhiều.

## Khi nào không cần biến thể hoặc hoặc chỉ coi biến thể là thuộc tính thông thường?

- Khi biến thể không khác nhau về giá, số lượng.
