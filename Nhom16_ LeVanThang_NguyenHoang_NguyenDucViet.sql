 --USE master
 --ALTER DATABASE NKSLK set single_user WITH ROLLBACK IMMEDIATE
 --DROP DATABASE NKSLK

 CREATE DATABASE NKSLK
 GO
 USE NKSLK
 GO

--CREATE DATABASE NKSLK
--	ON PRIMARY
--	(	Name=NKSLK_data,
--		FileName='D:\NKSLK.mdf',
--		Size=45MB,
--		MaxSize=50MB,
--		FileGrowth=10%
--	)
--	LOG ON
--	(	Name=NKSLK_log,
--		FileName='D:\NKSLK.ldf',
--		Size=10MB,
--		MaxSize=18MB,
--		FileGrowth=1MB
--	)
--GO

--ALTER DATABASE NKSLK 
--	MODIFY FILE ( NAME = 'NKSLK_data',
--	SIZE = 45MB) 

--ALTER DATABASE NKSLK 
--	MODIFY FILE (NAME = 'NKSLK_log' ,
--	MAXSIZE=18MB) 

--Bảng Nhật ký Sản lượng khoán
CREATE TABLE NKSLK
(
	maNKSLK INT, --mã Nhật ký Sản lượng khoán
	ngay DATE, --ngày
)
GO

--Bảng Nhật ký Sản lượng khoán_Chi tiết
	--ca 1: 6 - 14h
	--ca 2: 14 - 22h
	--ca 3: 22 - 6h
CREATE TABLE NKSLK_ChiTiet
(
	maChiTiet INT, --mã Chi tiết
	maNKSLK INT, --mã Nhật ký Sản lượng khoán
	maCongViec INT, --mã Công việc
	sanLuongThucTe FLOAT, --sản lượng Thực tế
	soLoSanPham VARCHAR(20), --số lô Sản phẩm
	maSanPham INT, --mã Sản phẩm/áp dụng cho Sản phẩm
	maNhanCong INT, --mã Nhân công
	gioBatDau TIME, --giờ Bắt đầu
	gioKetThuc TIME, --giờ Kết thúc
)
--Công việc
CREATE TABLE CongViec
(
	maCongViec INT, --mã Công việc
	tenCongViec NVARCHAR(50), --tên Công việc
	dinhMucKhoan FLOAT, --Định mức khoán
	donViKhoan NVARCHAR(20), --Đơn vị khoán
	heSoKhoan FLOAT, --Hệ số khoán
	dinhMucLaoDong FLOAT, --Định mức lao động
	donGia FLOAT --Đơn giá = 126 360*Hệ số khoán*Định mức lao động/Định mức khoán
)
--bảng nhân công
CREATE TABLE NhanCong
(
	maNhanCong INT, --mã nhân công
	hoTen NVARCHAR(50), --họ tên
	ngaySinh DATE, --ngày sinh
	gioiTinh NVARCHAR(5), -- giới tính
	phongBan NVARCHAR(50), --phòng ban
	chucVu NVARCHAR(50), --chức vụ
	queQuan NVARCHAR(50), --quê quán
	luongBaoHiem FLOAT --lương bảo hiểm
)
--bảng sản phẩm
CREATE TABLE SanPham
(
	maSanPham INT, --mã sản phẩm
	tenSanPham NVARCHAR(50), --tên sản phẩm
	soDangKy VARCHAR(20), --số đăng ký
	hanSuDung DATE, --hạn sử dụng
	quyCach NVARCHAR(20), --quy cách
	ngayDangKy DATE, --ngày đăng ký
	ngaySanXuat DATE,
)

--đặt khóa chính cho các bảng
ALTER TABLE NKSLK
DROP COLUMN maNKSLK
ALTER TABLE NKSLK
ADD maNKSLK INT IDENTITY (1,1)
PRIMARY KEY(maNKSLK)
GO

ALTER TABLE NKSLK_ChiTiet
DROP COLUMN maChiTiet
ALTER TABLE NKSLK_ChiTiet
ADD maChiTiet INT IDENTITY (1,1)
PRIMARY KEY(maChiTiet)
GO

ALTER TABLE CongViec
DROP COLUMN maCongViec
ALTER TABLE CongViec
ADD maCongViec INT IDENTITY (1,1)
PRIMARY KEY(maCongViec)
GO

ALTER TABLE NhanCong
DROP COLUMN maNhanCong
ALTER TABLE NhanCong
ADD maNhanCong INT IDENTITY (1,1)
PRIMARY KEY(maNhanCong)
GO

ALTER TABLE SanPham
DROP COLUMN maSanPham
ALTER TABLE SanPham
ADD maSanPham INT IDENTITY (1,1)
PRIMARY KEY(maSanPham)
GO

--đặt khóa ngoại
ALTER TABLE NKSLK_ChiTiet
ADD
	CONSTRAINT fk_maNKSLK FOREIGN KEY (maNKSLK) REFERENCES NKSLK(maNKSLK),
	CONSTRAINT fk_maNhanCong FOREIGN KEY (maNhanCong) REFERENCES NhanCong(maNhanCong),
	CONSTRAINT fk_maCongViec FOREIGN KEY (maCongViec) REFERENCES CongViec(maCongViec),
	CONSTRAINT fk_maSanPham FOREIGN KEY (maSanPham) REFERENCES SanPham(maSanPham)
GO

--đặt chỉ mục
CREATE INDEX ind_maNKSLK ON NKSLK_ChiTiet(maNKSLK);
CREATE INDEX ind_maNhanCong ON NKSLK_ChiTiet(maNhanCong);
CREATE INDEX ind_maCongViec ON NKSLK_ChiTiet(maCongViec);
CREATE INDEX ind_maSanPham ON NKSLK_ChiTiet(maSanPham);

CREATE INDEX ind_phongBan ON NhanCong(phongBan);
CREATE INDEX ind_chucVu ON NhanCong(chucVu);

CREATE INDEX ind_donViKhoan ON CongViec(donViKhoan);

-- 5: thêm dữ liệu
INSERT INTO NhanCong(hoTen, ngaySinh,gioiTinh, phongBan, chucVu, queQuan, luongBaoHiem) VALUES
(N'Võ Thị Thanh Thảo', '1987-07-17',N'Nữ', N'Nhân sự', N'Chủ tịch', N'Phú Yên', 1121549),
(N'Nguyễn Văn Anh', '1959-02-25',N'Nam', N'Thị trường', N'Cộng tác viên', N'Bến Tre', 2934302),
(N'Bùi Mạnh Quốc Huy', '1980-09-13',N'Nam', N'Đào tạo', N'Chủ tịch', N'Đồng Tháp', 2026267),
(N'Phạm Nam Trà', '1952-09-26',N'Nữ', N'Kế toán', N'Trưởng bộ phận', N'Hải Dương', 3371142),
(N'Lê Thị Mai', '1980-11-13',N'Nữ', N'Nhân sự', N'Quản lý', N'Thái Bình', 2586667),
(N'Đại Ngọc Trà', '1961-04-20',N'Nữ', N'Thị trường', N'Giám đốc', null, 4874874),
(N'Trần Đức Đại', '1969-04-08',N'Nam', N'Đào tạo', N'Trưởng phòng', null, 3085177),
(N'Đặng Ngọc Thanh Loan', '1952-05-17',N'Nữ', N'Đào tạo', N'Trưởng bộ phận', null, 1201230),
(N'Triệu Văn Khánh', '1975-08-15',N'Nam', N'Quản lý', N'Nhân viên', null, 4346721),
(N'Lê Thị Đào', '1984-06-07',N'Nữ', N'Hành chính', N'Chủ tịch', null, 3952187),
(N'Phạm Đoàn Minh Hiếu', null,N'Nam', N'Hành chính', N'Phó phòng', N'Thừa Thiên Huế', 3095543),
(N'Đại Văn Huy', null, N'Nam',N'Nhân sự', N'Phó phòng', N'Hậu Giang', 1119325),
(N'Lý Minh Đinh', null,N'Nam', N'Tài chính', N'Chủ tịch', N'Lâm Đồng', 4363772),
(N'Lê Khánh Chiến', null,N'Nam,', N'Hành chính', N'Trưởng phòng', N'Bình Phước', 4238500),
(N'Lã Văn Thanh', null,N'Nam', N'Nhân sự', N'Nhân viên', N'Tây Ninh', 4987237),
(N'Cao Ngọc Phương Trinh', '1972-03-20', N'Nam',N'Thị trường', N'Chủ tịch', N'Ninh Bình', 4467021),
(N'Nguyễn Lê Anh', '1988-06-30',N'Nam', N'Hành chính', N'Trưởng phòng', N'Sơn La', 3861052),
(N'Đỗ Thị Thùy Dương', '1972-10-28',N'Nữ', N'Đào tạo', N'Cộng tác viên', N'Trà Vinh', 4557367),
(N'Nguyễn Thị Bê', '1964-10-15',N'Nam', N'Hành chính', N'Giám đốc', N'Bắc Kạn', 2785302),
(N'Nguyễn Thị Phương', '1975-04-20',N'Nữ', N'Kinh doanh', N'Giám đốc', N'Ninh Thuận', 2458966),
(N'Huỳnh Thị Thùy Dương', '1971-04-14',N'Nữ', N'Tài chính', N'Quản lý', N'Hà Nội', 2915099),
(N'Tống Thanh Huyền', '1976-11-02',N'Nam', N'Kinh doanh', N'Quản lý', N'Hà Nội', 1041768),
(N'Trần Duy Lâm', '1963-12-08',N'Nam', N'Đào tạo', N'Trưởng phòng', N'Hà Nội', 3606901),
(N'Trần Tùng Thắng', '1978-12-14',N'Nam', N'Nghiên cứu và Phát triển', N'Phó phòng', N'Hà Nội', 3424788),
(N'Nguyễn Thị Thanh Hồng', '1985-12-17',N'Nữ', N'Nhân sự', N'Trưởng bộ phận', N'Hà Nội', 1889560)

INSERT INTO CongViec(tenCongViec, dinhMucKhoan, donViKhoan, heSoKhoan, dinhMucLaoDong, donGia) VALUES 
(N'Phân loại sản phẩm', 3.88, N'tấn', 1.95, 3.7, 0),
(N'Gắn nhãn', 3.35, N'cân', 4.83, 1.8, 0),
(N'Đóng gói sản phẩm', 2.19, N'khối', 3.33, 3.71, 0),
(N'Bốc dỡ', 2.53, N'tấn', 4.19, 4.97, 0),
(N'Kiểm tra báo cáo sự cố', 4.18, N'ký', 2.61, 4.11, 0),
(N'Nghiên cứu và phát triển sản phẩm', 4.63, N'ký', 3.83, 3.57, 0),
(N'Vận hành và bảo trì máy móc', 0.44, N'cái', 4.12, 1.04, 0),
(N'Đào tạo công nhân', 4.5, N'người', 2.72, 2.6, 0),
(N'Khảo sát thị trường', 4.54, N'ký', 0.5, 3.62, 0),
(N'Sale', 2.59, N'cân', 4.7, 4.6, 0)

INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Máy hóa', '2154', '2026-11-24', '2020-1-11', '2020-1-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Bàn là khô', '214', '2026-11-24', '2021-7-11', '2021-7-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Áo thun', '154', '2022-1-24', '2019-12-8', '2019-12-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Khẩu trang', '215', '2029-9-14', '2020-12-25', '2020-12-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Tai nghe', '7144', '2024-11-24', '2021-5-1', '2021-5-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Ba lô', '224', '2022-7-24', '2020-2-11', '2020-2-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Ghê đá', '98500', '2029-5-2', '2020-2-21', '2020-2-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Thang', '7568', '2024-1-23', '2019-2-27', '2019-2-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Hộp', '54514', '2022-8-2', '2020-1-11', '2020-1-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Tủ đồ', '11524', '2024-11-24', '2021-5-19', '2021-5-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Giày', '29154', '2026-7-24', '2020-7-27', '2020-7-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Thúng đồ', '6954', '2029-4-4', '2020-4-1', '2020-4-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Đồng hồ', '11442', '2020-1-24', '2019-2-14', '2019-2-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Điện thoại', '49754', '2021-11-24', '2018-8-29', '2018-8-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Chăn', '33658', '2022-1-24', '2020-11-11', '2020-11-1')
INSERT INTO SanPham(tenSanPham, soDangKy, hanSuDung, ngayDangKy, ngaySanXuat) VALUES ('Cuốc', '6554', '2026-6-24', '2021-10-17', '2021-10-1')

INSERT INTO NKSLK(ngay) VALUES ('2020-09-25'),
('2020-07-01'),
('2019-04-04'),
('2019-01-24'),
('2019-10-19'),
('2019-11-08'),
('2020-03-17'),
('2019-03-13'),
('2019-03-07'),
('2020-12-14'),
('2020-03-09'),
('2020-03-08'),
('2020-11-03'),
('2020-06-28'),
('2020-06-05'),
('2020-07-25'),
('2019-09-11'),
('2019-11-29'),
('2019-06-23'),
('2020-06-19'),
('2019-02-10'),
('2019-07-27'),
('2020-01-30'),
('2019-12-31'),
('2019-10-21'),
('2020-04-04'),
('2020-05-07'),
('2019-01-06'),
('2020-11-08'),
('2020-05-03');

INSERT INTO NKSLK_ChiTiet(maNKSLK, maNhanCong, gioBatDau, gioKetThuc, maCongViec, sanLuongThucTe, soLoSanPham, maSanPham) 
VALUES (1, 5, '14:00:00', '22:00:00', 5, 15, 11, 8),
(1, 6, '6:00:00', '14:00:00', 6, 35, 5, 14),
(2, 19, '6:00:00', '14:00:00', 1, 4, 1, 12),
(2, 11, '22:00:00', '6:00:00', 1, 5, 12, 9),
(2, 23, '6:00:00', '14:00:00', 2, 19, 10, 8),
(2, 24, '6:00:00', '14:00:00', 2, 3, 13, 16),
(3, 1, '22:00:00', '6:00:00', 4, 20, 3, 9),
(2, 7, '14:00:00', '22:00:00', 5, 8, 10, 4),
(3, 4, '22:00:00', '6:00:00', 5, 14, 17, 3),
(3, 5, '22:00:00', '6:00:00', 2, 23, 9, 10),
(3, 3, '22:00:00', '6:00:00', 1, 23, 1, 12),
(3, 2, '22:00:00', '6:00:00', 2, 5, 3, 1),
(4, 22, '14:00:00', '22:00:00', 3, 11, 15, 4),
(4, 11, '6:00:00', '14:00:00', 3, 16, 2, 3),
(5, 25, '22:00:00', '6:00:00', 9, 20, 6, 5),
(5, 11, '22:00:00', '6:00:00', 5, 24, 5, 7),
(5, 22, '6:00:00', '14:00:00', 2, 12, 16, 5),
(5, 11, '22:00:00', '6:00:00', 7, 16, 18, 6),
(6, 23, '22:00:00', '6:00:00', 2, 15, 4, 4),
(6, 7, '14:00:00', '22:00:00', 8, 28, 19, 7),
(7, 11, '14:00:00', '22:00:00', 8, 24, 17, 8),
(7, 7, '22:00:00', '6:00:00', 6, 32, 14, 9),
(7, 10, '6:00:00', '14:00:00', 4, 1, 7, 6),
(9, 23, '22:00:00', '6:00:00', 6, 21, 7, 13),
(10, 7, '14:00:00', '22:00:00', 6, 19, 6, 11),
(11, 11, '14:00:00', '22:00:00', 3, 15, 8, 16),
(11, 7, '22:00:00', '6:00:00', 2, 7, 1, 7),
(11, 10, '6:00:00', '14:00:00', 2, 17, 6, 1),
(11, 23, '22:00:00', '6:00:00', 2, 14, 17, 3),
(12, 8, '22:00:00', '6:00:00', 10, 24, 3, 4),
(12, 5, '22:00:00', '6:00:00', 7, 2, 9, 11),
(12, 7, '22:00:00', '6:00:00', 2, 23, 2, 5),
(12, 17, '22:00:00', '6:00:00', 9, 23, 6, 7),
(12, 12, '14:00:00', '22:00:00', 7, 24, 23, 16),
(13, 1, '14:00:00', '22:00:00', 6, 17, 5, 8),
(12, 17, '22:00:00', '6:00:00', 2, 26, 14, 11),
(12, 14, '14:00:00', '22:00:00', 1, 29, 18, 10),
(12, 6, '22:00:00', '6:00:00', 5, 24, 2, 11),
(13, 7, '6:00:00', '14:00:00', 2, 1, 4, 13),
(17, 24, '22:00:00', '6:00:00', 7, 4, 12, 12),
(14, 8, '14:00:00', '22:00:00', 4, 1, 8, 14),
(16, 19, '14:00:00', '22:00:00', 6, 23, 9, 15),
(14, 4, '14:00:00', '22:00:00', 8, 34, 12, 14),
(14, 21, '14:00:00', '22:00:00', 9, 27, 20, 12),
(15, 7, '6:00:00', '14:00:00', 8, 4, 8, 5),
(13, 4, '6:00:00', '14:00:00', 8, 4, 10, 5),
(14, 17, '14:00:00', '22:00:00', 8, 3, 11, 4),
(15, 11, '14:00:00', '22:00:00', 6, 9, 12, 3),
(15, 17, '22:00:00', '6:00:00', 1, 15, 7, 3),
(22, 9, '6:00:00', '14:00:00', 2, 22, 7, 8),
(17, 2, '14:00:00', '22:00:00', 4, 14, 5, 14),
(18, 19, '6:00:00', '14:00:00', 9, 22, 7, 10),
(19, 13, '22:00:00', '6:00:00', 8, 20, 8, 10),
(21, 7, '7:00:00', '15:00:00', 6, 9, 12, 13),
(21, 22, '15:00:00', '23:00:00', 5, 3, 14, 15)

-- 1. Tuần tính từ:
	-- Từ thứ 2 đến hết chủ nhật -> gọi là tuần chẵn
	-- Từ ngày 01 đến hết chủ nhật, nếu 01 khác thứ 2(tuần lẻ)
	-- Từ thứ 2 đến ngày cuối cùng của tháng, khác chủ nhật (tuần lẻ)
CREATE FUNCTION [GetWeekDay_Func]
    (@DATE DATETIME)
RETURNS @table TABLE (firstDate DATETIME, lastDate DATETIME) 
BEGIN
    DECLARE @StartMonth DATETIME = @DATE-DAY(@DATE)+1
	DECLARE @EndMonth DATETIME = EOMONTH(@DATE)
	DECLARE @StartWeek DATETIME = DATEADD(ww, DATEDIFF(ww, 0, @date), 0)
	DECLARE @EndWeek DATETIME = DATEADD(ww, DATEDIFF(ww, 0, @date), 0) + 6
	IF DATENAME(dw,@DATE) = 'Sunday' AND @DATE = @EndMonth
	BEGIN
		SET @StartWeek = DATEADD(ww, DATEDIFF(ww, 0, @date), 0) - 7
		SET @EndWeek = @DATE
	END
	IF MONTH(@StartWeek) < MONTH(@DATE)
	BEGIN
		SET @StartWeek = @StartMonth
	END
	IF MONTH(@EndWeek) > MONTH(@DATE)
	BEGIN
		SET @EndWeek = @EndMonth
	END
	INSERT INTO @table SELECT @StartWeek, @EndWeek
	RETURN 
END

-- Nhật ký sản lượng khoán trong tháng của công nhân
CREATE PROCEDURE NhatKySanLuongKhoan_TheoThang 
	@MaNhanCong INT,
	@ThangLamViec DATETIME
AS
BEGIN 
	SELECT NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc, NhanCong.maNhanCong ,NhanCong.hoTen FROM NKSLK, NKSLK_ChiTiet, NhanCong
	WHERE 
		NKSLK.maNKSLK = NKSLK_ChiTiet.maNKSLK
		AND NKSLK_ChiTiet.maNhanCong = NhanCong.maNhanCong 
		AND NhanCong.maNhanCong = @MaNhanCong
		AND NKSLK.ngay BETWEEN @ThangLamViec-DAY(@ThangLamViec)+1 and EOMONTH(@ThangLamViec)
	GROUP BY NhanCong.maNhanCong,NhanCong.hoTen, NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc
END

EXEC NhatKySanLuongKhoan_TheoThang @MaNhanCong = 7, @ThangLamViec = '2020-7-1'
GO

CREATE PROCEDURE NhatKySanLuongKhoan_TheoThang_Update
	@MaNhanCong INT,
	@ThangLamViec DATETIME
AS
BEGIN 
	IF (@MaNhanCong = 0 OR @MaNhanCong IS NULL)
		BEGIN
			SELECT NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc, NhanCong.maNhanCong, NhanCong.hoTen FROM NKSLK, NKSLK_ChiTiet, NhanCong
			WHERE 
				NKSLK.maNKSLK = NKSLK_ChiTiet.maNKSLK
				AND NKSLK_ChiTiet.maNhanCong = NhanCong.maNhanCong
				AND NKSLK.ngay BETWEEN @ThangLamViec-DAY(@ThangLamViec)+1 and EOMONTH(@ThangLamViec)
			GROUP BY NhanCong.maNhanCong,NhanCong.hoTen, NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc
		END
	ELSE
		BEGIN
			SELECT NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc, NhanCong.maNhanCong, NhanCong.hoTen FROM NKSLK, NKSLK_ChiTiet, NhanCong
			WHERE 
				NKSLK.maNKSLK = NKSLK_ChiTiet.maNKSLK
				AND NKSLK_ChiTiet.maNhanCong = NhanCong.maNhanCong 
				AND NhanCong.maNhanCong = @MaNhanCong
				AND NKSLK.ngay BETWEEN @ThangLamViec-DAY(@ThangLamViec)+1 and EOMONTH(@ThangLamViec)
			GROUP BY NhanCong.maNhanCong,NhanCong.hoTen, NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc
		END
END

-- Nhật ký sản lượng khoáng trong tuần của công nhân
CREATE PROCEDURE NhatKySanLuongKhoan_Tuan 
	@MaNhanCong INT, @Date DATETIME
AS
BEGIN
	DECLARE @FirstDate DATETIME
	DECLARE @LastDate DATETIME
	SELECT @FirstDate = firstDate, @LastDate = lastDate FROM [GetWeekDay_Func](@Date)
	SELECT NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc, NhanCong.maNhanCong, NhanCong.hoTen
	 FROM NKSLK, NKSLK_ChiTiet, NhanCong
	WHERE 
		NKSLK.maNKSLK = NKSLK_ChiTiet.maNKSLK
		AND NKSLK_ChiTiet.maNhanCong = NhanCong.maNhanCong
		AND NhanCong.maNhanCong = @MaNhanCong
		AND NKSLK.ngay BETWEEN @FirstDate and @LastDate
	GROUP BY NhanCong.maNhanCong,NhanCong.hoTen, NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc
END

CREATE PROCEDURE NhatKySanLuongKhoan_Tuan_Update
	@MaNhanCong INT, @Date DATETIME
AS
BEGIN
	DECLARE @FirstDate DATETIME
	DECLARE @LastDate DATETIME
	IF (@MaNhanCong = 0 OR @MaNhanCong IS NULL)
		BEGIN
			SELECT @FirstDate = firstDate, @LastDate = lastDate FROM [GetWeekDay_Func](@Date)
			SELECT NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc, NhanCong.maNhanCong, NhanCong.hoTen
			 FROM NKSLK, NKSLK_ChiTiet, NhanCong
			WHERE 
				NKSLK.maNKSLK = NKSLK_ChiTiet.maNKSLK
				AND NKSLK_ChiTiet.maNhanCong = NhanCong.maNhanCong
				AND NKSLK.ngay BETWEEN @FirstDate and @LastDate
			GROUP BY NhanCong.maNhanCong,NhanCong.hoTen, NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc
		END
	ELSE 
		BEGIN
			SELECT @FirstDate = firstDate, @LastDate = lastDate FROM [GetWeekDay_Func](@Date)
			SELECT NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc, NhanCong.maNhanCong, NhanCong.hoTen
			 FROM NKSLK, NKSLK_ChiTiet, NhanCong
			WHERE 
				NKSLK.maNKSLK = NKSLK_ChiTiet.maNKSLK
				AND NKSLK_ChiTiet.maNhanCong = NhanCong.maNhanCong
				AND NhanCong.maNhanCong = @MaNhanCong
				AND NKSLK.ngay BETWEEN @FirstDate and @LastDate
			GROUP BY NhanCong.maNhanCong,NhanCong.hoTen, NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc
		END
END

EXEC NhatKySanLuongKhoan_Tuan_Update @MaNhanCong=0, @Date = '2020-10-25'
GO

--2. Hiển thị thông tin công việc có nhiều NKSLK nhất
SELECT CongViec.maCongViec, CongViec.tenCongViec, Count(NKSLK_ChiTiet.maNKSLK) AS SoLuong
FROM CongViec JOIN NKSLK_ChiTiet
ON CongViec.maCongViec = NKSLK_ChiTiet.maCongViec
GROUP BY CongViec.maCongViec, CongViec.tenCongViec
ORDER BY SoLuong DESC

-- 3. Hiển thị thông tin công việc có đơn giá cao nhất, nhỏ nhất
UPDATE CongViec set donGia = 126360 * heSoKhoan *dinhMucLaoDong/dinhMucKhoan
SELECT * FROM CongViec WHERE donGia = (SELECT MAX(donGia) FROM CongViec);
SELECT * FROM CongViec WHERE donGia = (SELECT MIN(donGia) FROM CongViec);

-- 4. Hiển thị thông tin công việc có đơn giá lớn hơn nhỏ hơn đơn giá trung bình của cả danh mục
SELECT * FROM CongViec cv WHERE cv.donGia > (SELECT AVG(donGia) FROM CongViec)
SELECT * FROM CongViec cv WHERE cv.donGia < (SELECT AVG(donGia) FROM CongViec)

-- 5. Hiển thị danh mục sản phẩm có ngày đăng ký trước ngày 15/08/2019
SELECT * FROM SanPham
WHERE DATEDIFF(DAY, ngayDangKy, '08-15-2019') > 0

-- 6. Hiển thị danh mục các sản phẩm có hạn sử dụng trên 1 năm từ ngày sản xuất
SELECT *, DATEDIFF(DAY, SanPham.ngaySanXuat, SanPham.hanSuDung) AS NgayConLai
FROM SanPham
WHERE DATEDIFF(DAY, SanPham.ngaySanXuat, SanPham.hanSuDung) > 365

-- 7. Hiển thị danh mục công nhân được nhóm theo phòng ban, chức vụ
SELECT * FROM NhanCong
ORDER BY phongBan DESC;

SELECT * FROM NhanCong
ORDER BY chucVu DESC;

select * from NhanCong

-- 8. Hiển thị danh mục công nhân chuẩn bị về hưu (còn làm việc thêm một năm, 54 đối với nam và 49 đối với nữ). 
WITH NKSLK_NHANCONG_TUOI(maNhanCong, hoTen, gioiTinh, Tuoi) AS (
	SELECT maNhanCong, hoTen, gioiTinh, 
	DATEDIFF(year, NhanCong.ngaySinh, GETDATE()) AS Tuoi
	FROM NhanCong 
)
SELECT * FROM NhanCong JOIN NKSLK_NHANCONG_TUOI 
ON NhanCong.maNhanCong = NKSLK_NHANCONG_TUOI.maNhanCong
WHERE NhanCong.gioiTinh = N'Nam'
AND NKSLK_NHANCONG_TUOI.Tuoi + 1 = 49;

-- 9. Hiển thị danh mục công nhân có độ tuổi từ 30 đến 45. 
SELECT hoTen, ngaySinh, queQuan, DATEDIFF(DAY, NhanCong.ngaySinh, GETDATE()) / 365 AS Tuoi
FROM NhanCong
WHERE DATEDIFF(DAY, ngaySinh, GETDATE()) BETWEEN 30 * 365 AND 45 * 365

-- 10. Hiển thị danh mục công nhân có NKSLK được thực hiện ở ca 3
SELECT nc.maNhanCong, nc.hoTen
FROM NhanCong nc, NKSLK_ChiTiet ct, NKSLK nk
WHERE nc.maNhanCong = ct.maNhanCong AND nk.maNKSLK = ct.maNKSLK
AND CONVERT(TIME, ct.gioBatDau) >= CONVERT(TIME, '22:00:00')
AND CONVERT(TIME, ct.gioKetThuc) <= CONVERT(TIME, '6:00:00')
GROUP BY nc.maNhanCong, nc.hoTen

--11. Hiển thị danh mục NKSLK của toàn bộ công nhân trong nhà máy theo tuần, tháng.
CREATE PROCEDURE NKSLK_NhaMay 
	@ThangLamViec DATETIME
AS
BEGIN
	SELECT NKSLK.maNKSLK, NhanCong.maNhanCong, NhanCong.hoTen, CongViec.maCongViec, CongViec.tenCongViec, SanPham.maSanPham, SanPham.tenSanPham, 
		NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc
	FROM NKSLK, NKSLK_ChiTiet, NhanCong, CongViec, SanPham
	WHERE 
	NKSLK.maNKSLK = NKSLK_ChiTiet.maNKSLK
	AND NKSLK_ChiTiet.maNhanCong = NhanCong.maNhanCong
	AND CongViec.maCongViec = NKSLK_ChiTiet.maCongViec
	AND SanPham.maSanPham = NKSLK_ChiTiet.maSanPham
	AND NKSLK.ngay BETWEEN @ThangLamViec-DAY(@ThangLamViec)+1 and EOMONTH(@ThangLamViec)
	GROUP BY NKSLK.maNKSLK, NhanCong.maNhanCong, NhanCong.hoTen, CongViec.maCongViec, 
	tenCongViec, NKSLK.ngay, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc, SanPham.maSanPham, tenSanPham
END

EXEC NKSLK_NhaMay @ThangLamViec = '2019-07-01'

CREATE PROCEDURE NKSLK_NhaMay_Tuan
	@Date DATETIME
AS
BEGIN
	DECLARE @FirstDate DATETIME
	DECLARE @LastDate DATETIME
	SELECT @FirstDate = firstDate, @LastDate = lastDate FROM [GetWeekDay_Func](@Date)
	SELECT NKSLK.maNKSLK, NhanCong.maNhanCong, NhanCong.hoTen, CongViec.maCongViec, CongViec.tenCongViec, NKSLK.ngay, 
	NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc, SanPham.maSanPham, SanPham.tenSanPham
	FROM NKSLK, NKSLK_ChiTiet, NhanCong, CongViec, SanPham
	WHERE 
	NKSLK.maNKSLK = NKSLK_ChiTiet.maNKSLK
	AND NKSLK_ChiTiet.maNhanCong = NhanCong.maNhanCong
	AND CongViec.maCongViec = NKSLK_ChiTiet.maCongViec
	AND SanPham.maSanPham = NKSLK_ChiTiet.maSanPham
	AND NKSLK.ngay BETWEEN @FirstDate and @LastDate
	GROUP BY NKSLK.maNKSLK, NhanCong.maNhanCong, NhanCong.hoTen, CongViec.maCongViec, tenCongViec, NKSLK.ngay, 
	NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc, SanPham.maSanPham, tenSanPham
END

EXEC NKSLK_NhaMay_Tuan @Date ='2020-07-01'

--12. Hiển thị bảng lương sản phẩm của toàn bộ công nhân trong nhà máy theo tuần, theo tháng
DECLARE @DATE DATETIME ='2020-7-1';
WITH NKSLK_KhoanChung(maCongViec, maNKSLK, SoLuong) AS (
	SELECT CongViec.maCongViec, NKSLK.maNKSLK, Count(NhanCong.maNhanCong) AS SoLuong
	FROM NKSLK, NKSLK_ChiTiet, NhanCong, CongViec
	WHERE
	NKSLK.maNKSLK = NKSLK_ChiTiet.maNKSLK
	AND NKSLK_ChiTiet.maNhanCong = NhanCong.maNhanCong
	AND CongViec.maCongViec = NKSLK_ChiTiet.maCongViec
	AND NKSLK.ngay BETWEEN @DATE-DAY(@DATE)+1 and EOMONTH(@DATE)
	GROUP BY CongViec.maCongViec, NKSLK.maNKSLK
)
SELECT NhanCong.hoTen,
(
	CASE WHEN (NKSLK_KhoanChung.SoLuong = 1)
	THEN FORMAT(SUM((NKSLK_ChiTiet.sanLuongThucTe * CongViec.donGia)), '0,#')
	ELSE FORMAT(SUM((NKSLK_ChiTiet.sanLuongThucTe * CongViec.donGia) * DATEDIFF(HOUR, NKSLK_ChiTiet.gioBatDau, NKSLK_ChiTiet.gioKetThuc) / 8), '0,#')
	END
)
FROM NKSLK_KhoanChung, NKSLK_ChiTiet, NhanCong, CongViec
WHERE 
NKSLK_KhoanChung.maNKSLK = NKSLK_ChiTiet.maNKSLK
AND NKSLK_ChiTiet.maNhanCong = NhanCong.maNhanCong
AND CongViec.maCongViec = NKSLK_ChiTiet.maCongViec
GROUP BY NhanCong.hoTen, NKSLK_KhoanChung.SoLuong

--13. Hiển thị số ngày công đi làm trong tháng
CREATE VIEW NgayCong AS 
SELECT NhanCong.maNhanCong, hoTen, count(NhanCong.maNhanCong) AS ngayCong 
FROM NKSLK_ChiTiet 
JOIN NhanCong ON NhanCong.maNhanCong = NKSLK_ChiTiet.maNhanCong
JOIN NKSLK ON NKSLK.maNKSLK = NKSLK_ChiTiet.maNKSLK
WHERE DATEDIFF(HOUR, gioBatDau, gioKetThuc) >= 8 and DATEPART(HOUR, gioBatDau) != 22
AND NKSLK.ngay BETWEEN DATEADD(month, DATEDIFF(month, 0, '2019-7-1'), 0) and EOMONTH('2019-7-1')
GROUP BY NhanCong.maNhanCong, hoTen;

CREATE VIEW NgayCongLamThem AS
SELECT NhanCong.maNhanCong, hoTen, count(NhanCong.maNhanCong) * 1.3 AS ngayCong FROM NKSLK_ChiTiet 
JOIN NhanCong ON NhanCong.maNhanCong = NKSLK_ChiTiet.maNhanCong
JOIN NKSLK ON NKSLK.maNKSLK = NKSLK_ChiTiet.maNKSLK
WHERE DATEDIFF(HOUR, gioKetThuc, gioBatDau) >= 8 and DATEPART(HOUR, gioBatDau) = 22
AND NKSLK.ngay BETWEEN DATEADD(month, DATEDIFF(month, 0, '2019-7-1'), 0) and EOMONTH('2019-7-1')
GROUP BY NhanCong.maNhanCong, hoTen;

WITH TongNgayCong AS (
	SELECT * FROM NgayCongLamThem
	UNION
	SELECT * FROM NgayCong
	) 
SELECT TongNgayCong.maNhanCong, TongNgayCong.hoTen, SUM(TongNgayCong.ngayCong) as Cong
FROM TongNgayCong
GROUP BY TongNgayCong.maNhanCong, TongNgayCong.hoTen

