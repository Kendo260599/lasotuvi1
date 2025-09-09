# 🔮 Lá Số Tử Vi Truyền Thống Việt Nam

Ứng dụng web xem lá số tử vi theo truyền thống Việt Nam, được xây dựng bằng HTML, CSS và JavaScript thuần.

## Tính Năng

- ✅ Nhập thông tin sinh (họ tên, giới tính, ngày giờ sinh)
- ✅ Hỗ trợ cả dương lịch và âm lịch
- ✅ Tính toán và hiển thị lá số tử vi với 12 cung
- ✅ Tự động tính toán vị trí các sao chính và sao phụ
- ✅ Giải đoán tính cách, sự nghiệp, tài lộc, tình duyên, sức khỏe
- ✅ Giao diện đẹp, responsive trên mobile

## Cách Sử Dụng

1. Mở file `index.html` trong trình duyệt web
2. Nhập đầy đủ thông tin sinh:
   - Họ và tên
   - Giới tính (Nam/Nữ)
   - Ngày, tháng, năm sinh
   - Giờ, phút sinh
   - Chọn âm lịch nếu ngày sinh theo âm lịch
3. Nhấn "Xem Lá Số Tử Vi" để xem kết quả

## Cấu Trúc Dự Án

```
lasotuvi1/
├── index.html          # Giao diện chính
├── styles.css          # Thiết kế và CSS
├── lunar-calendar.js   # Tính toán âm lịch
├── astrology.js        # Logic tử vi và tính toán sao
├── app.js             # Xử lý form và hiển thị kết quả
└── README.md          # Hướng dẫn
```

## Kiến Thức Tử Vi

Ứng dụng áp dụng các nguyên lý cơ bản của tử vi truyền thống Việt Nam:

### 12 Cung Chính
- **Cung Mệnh**: Tính cách, bản chất
- **Cung Phụ Mẫu**: Quan hệ với cha mẹ
- **Cung Phúc Đức**: Phúc phần, tinh thần
- **Cung Điền Trạch**: Bất động sản, nhà cửa
- **Cung Quan Lộc**: Sự nghiệp, chức vụ
- **Cung Nô Bộc**: Bạn bè, cấp dưới
- **Cung Thiên Di**: Di chuyển, xuất ngoại
- **Cung Giao Du**: Giao tiếp, học hỏi
- **Cung Tật Ách**: Sức khỏe, bệnh tật
- **Cung Tài Bạch**: Tài chính, tiền bạc
- **Cung Tử Tức**: Con cái, hậu duệ
- **Cung Phu Thê**: Hôn nhân, tình duyên

### Hệ Thống Sao
- **14 Sao Chính**: Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, v.v.
- **Sao Cát**: Văn Xương, Văn Khúc, Tả Phụ, Hữu Bật, v.v.
- **Sao Hung**: Đà La, Kình Dương, Hỏa Tinh, Linh Tinh, v.v.

## Lưu Ý

- Ứng dụng chỉ mang tính chất tham khảo và giải trí
- Các tính toán được đơn giản hóa so với tử vi truyền thống phức tạp
- Số phận phụ thuộc vào nỗ lực và hành động của chính bản thân

## Công Nghệ

- HTML5
- CSS3 (Grid, Flexbox, Responsive Design)
- Vanilla JavaScript
- Không sử dụng framework hay thư viện bên ngoài

## Chạy Ứng Dụng

### Cách 1: Mở trực tiếp file
Mở file `index.html` trong trình duyệt

### Cách 2: Chạy web server
```bash
# Python 3
python3 -m http.server 8080

# Node.js
npx serve .

# Live Server (VS Code Extension)
Chuột phải > Open with Live Server
```

Sau đó truy cập: http://localhost:8080

## Phát Triển

Dự án được xây dựng với mục tiêu:
- Đơn giản, dễ hiểu
- Không phụ thuộc thư viện bên ngoài
- Responsive design
- Hiệu năng tốt
- Dễ bảo trì và mở rộng

## Bản Quyền

Dự án mã nguồn mở, có thể sử dụng và chỉnh sửa tự do.

---

*Lá số tử vi chỉ mang tính chất tham khảo. Hãy tin tưởng vào khả năng và nỗ lực của chính mình!* ✨