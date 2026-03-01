# Tổng quan website bán hàng online tích hợp Facebook Login

## 1. Mục tiêu sản phẩm

Website là một cửa hàng online bán sản phẩm/dịch vụ, tập trung tối ưu chuyển đổi bằng cơ chế **đăng nhập Facebook nhanh** để nhận ưu đãi ngay. Mục tiêu chính:

- Rút ngắn thời gian đăng nhập/đăng ký (social login, không bắt buộc tạo tài khoản thủ công).
- Tăng tỷ lệ hoàn tất đơn hàng nhờ ưu đãi tự động sau đăng nhập.
- Cho phép người dùng trải nghiệm mua sắm như khách (guest) trước, chỉ yêu cầu login khi cần áp ưu đãi hoặc checkout.

---

## 2. Đối tượng sử dụng

- **Khách vãng lai (Guest):** xem sản phẩm, thêm giỏ, chưa dùng ưu đãi Facebook.
- **Khách đã đăng nhập Facebook:** nhận ưu đãi theo điều kiện chương trình.
- **Quản trị viên (Admin):** quản lý sản phẩm, đơn hàng, ưu đãi, báo cáo.

---

## 3. Luồng trải nghiệm chính (User Journey)

1. Người dùng vào trang chủ, thấy banner “Đăng nhập Facebook nhận ưu đãi”.
2. Người dùng duyệt danh mục, xem chi tiết sản phẩm, thêm vào giỏ như bình thường.
3. Nếu chưa login, hệ thống chỉ gợi ý (không ép buộc): “Đăng nhập Facebook để nhận ưu đãi”.
4. Người dùng đăng nhập Facebook qua popup/redirect OAuth.
5. Sau khi xác thực thành công, hệ thống kích hoạt ưu đãi hợp lệ (auto-apply hoặc vào ví voucher).
6. Tại giỏ hàng/checkout, hệ thống hiển thị rõ phần giảm giá, điều kiện, tổng thanh toán cuối cùng.
7. Người dùng đặt hàng, xem trang Order Success với tóm tắt ưu đãi đã áp.

---

## 4. Chức năng theo từng trang

## 4.1 Trang chủ (Home)

- Banner chiến dịch: “Đăng nhập Facebook nhận ưu đãi X% / voucher Y”.
- Khối sản phẩm nổi bật: flash sale, mới về, bán chạy.
- CTA nổi bật: **“Đăng nhập để nhận ưu đãi”**.

## 4.2 Trang đăng nhập (Login)

- Tuỳ chọn đăng nhập email/số điện thoại (nếu cần).
- Nút chính: **Login with Facebook**.
- OAuth flow:
  - Điều hướng tới Facebook để xin quyền cơ bản (profile/email nếu có).
  - Callback về website.
  - Tạo/ghép tài khoản nội bộ theo Facebook ID.
  - Tạo session/token đăng nhập.

## 4.3 Trang hồ sơ (Account/Profile)

Hiển thị:

- Tên người dùng Facebook.
- Ảnh đại diện.
- Email (nếu Facebook cung cấp).
- Lịch sử đơn hàng.
- Danh sách voucher/ưu đãi đang có.
- Nút Logout.

## 4.4 Trang sản phẩm (Listing + Detail)

- Listing: lọc theo giá, thương hiệu, đánh giá.
- Detail: ảnh, mô tả, giá, tồn kho, review.
- Nút “Thêm vào giỏ”.
- Nếu chưa đăng nhập: hiển thị prompt nhận ưu đãi Facebook nhưng không chặn mua.

## 4.5 Giỏ hàng (Cart)

- Danh sách sản phẩm đã chọn.
- Tính toán:
  - Tạm tính.
  - Phí ship.
  - Dòng ưu đãi Facebook (mức giảm).
  - Tổng thanh toán.
- Trường hợp guest:
  - Vẫn lưu giỏ hàng.
  - Khóa ưu đãi kèm nhắc đăng nhập Facebook.

## 4.6 Thanh toán (Checkout)

- Form thông tin nhận hàng: tên, số điện thoại, địa chỉ.
- Chọn phương thức thanh toán: COD/chuyển khoản/ví/thẻ.
- Hiển thị xác nhận ưu đãi áp dụng:
  - Ví dụ: giảm 10% cho khách login Facebook.
  - Điều kiện: đơn tối thiểu, số lần áp, hạn dùng.
- Nút “Đặt hàng”.

## 4.7 Xác nhận đơn hàng (Order Success)

- Mã đơn hàng.
- Tóm tắt sản phẩm, số tiền, ưu đãi đã áp.
- Gợi ý mua thêm/chia sẻ ưu đãi.

---

## 5. Logic ưu đãi Facebook

## 5.1 Loại ưu đãi

- Giảm % đơn đầu tiên sau đăng nhập Facebook (ví dụ 10%).
- Freeship cho user đã đăng nhập Facebook.
- Voucher chiến dịch theo thời gian (ví dụ 50K trong tuần).

## 5.2 Cách áp dụng

- **Auto-apply:** hệ thống tự áp ưu đãi tốt nhất thỏa điều kiện.
- **Voucher wallet:** hệ thống cấp voucher, người dùng chủ động chọn khi checkout.

## 5.3 Điều kiện phổ biến

- Chỉ user có trạng thái `facebook_verified` mới áp dụng.
- Đơn hàng đạt mức tối thiểu.
- Giới hạn số lần dùng (1 lần/người hoặc theo campaign).
- Hiệu lực theo thời gian bắt đầu/kết thúc.
- Có thể không áp đồng thời nhiều ưu đãi (rule stack/exclusive).

## 5.4 Thứ tự tính giá gợi ý

1. Tính subtotal giỏ hàng.
2. Kiểm tra điều kiện ưu đãi.
3. Áp giảm giá theo rule ưu tiên.
4. Cộng phí ship (hoặc miễn ship nếu đủ điều kiện).
5. Trả ra tổng thanh toán cuối cùng + thông tin “Bạn tiết kiệm được bao nhiêu”.

---

## 6. Yêu cầu UX

- Không bắt buộc login ngay từ đầu.
- Cho phép guest duyệt và thêm giỏ hàng đầy đủ.
- Chỉ nhắc login khi cần nhận ưu đãi hoặc trước khi thanh toán.
- Minh bạch:
  - Hiển thị rõ khoản giảm.
  - Thể hiện điều kiện áp dụng.
  - Thông báo lý do nếu voucher/ưu đãi không hợp lệ.

---

## 7. Yêu cầu quản trị (Admin)

## 7.1 Quản lý catalog

- CRUD sản phẩm, danh mục, thương hiệu.
- Quản lý tồn kho, giá bán, giá khuyến mãi.

## 7.2 Quản lý đơn hàng

- Danh sách đơn, trạng thái xử lý, thanh toán, giao vận.
- Chi tiết đơn và lịch sử thay đổi trạng thái.

## 7.3 Quản lý ưu đãi/campaign

- Tạo chương trình theo điều kiện login Facebook.
- Thiết lập:
  - Điều kiện đơn tối thiểu.
  - Thời gian hiệu lực.
  - Giới hạn số lượt sử dụng.
  - Phạm vi áp dụng (toàn shop/danh mục/sản phẩm).

## 7.4 Báo cáo

- Số user đăng nhập Facebook.
- Tỷ lệ chuyển đổi sau login.
- Doanh thu do campaign ưu đãi đóng góp.
- AOV (giá trị đơn hàng trung bình) trước/sau campaign.

---

## 8. Gợi ý mô hình dữ liệu tối thiểu

- `users`: id, name, email, avatar_url, created_at.
- `social_accounts`: user_id, provider=facebook, provider_user_id, access_scope.
- `products`: id, name, price, stock, brand, rating.
- `carts`, `cart_items`.
- `orders`, `order_items`, `payments`, `shipments`.
- `promotions`: type, condition_json, start_at, end_at, usage_limit.
- `user_vouchers`: user_id, promotion_id, status, used_at.
- `promotion_redemptions`: order_id, promotion_id, discount_amount.

---

## 9. KPI đề xuất

- Login conversion rate (visitor -> Facebook login).
- Checkout conversion rate (cart -> paid order).
- Voucher redemption rate.
- Revenue uplift từ nhóm đã login Facebook.
- Tỷ lệ đơn hàng có áp ưu đãi và mức giảm trung bình.

---

## 10. Non-functional requirements

- Bảo mật OAuth và token session.
- Tuân thủ chính sách dữ liệu cá nhân (thu thập tối thiểu, minh bạch mục đích).
- Tốc độ tải trang tốt trên mobile.
- Hệ thống pricing/discount tính đúng và có log đối soát.
- Theo dõi sự kiện analytics cho funnel login -> cart -> checkout -> success.
