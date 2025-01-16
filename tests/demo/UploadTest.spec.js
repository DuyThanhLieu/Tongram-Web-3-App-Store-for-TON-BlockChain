const { test, expect } = require("@playwright/test");
const path = require("path"); // Dùng để xử lý đường dẫn tệp
const UploadPage = require("./UploadPage"); // Import Page Object

test("Kiểm tra tải lên tệp thành công", async ({ page }) => {
  const uploadPage = new UploadPage(page); // Khởi tạo đối tượng UploadPage

  // Mở trang upload file
  await page.goto("https://yourwebsite.com/upload");

  // Đường dẫn tới tệp cần tải lên (thay thế bằng đường dẫn tệp thực tế)
  const filePath = path.join(__dirname, "sample-file.txt");

  // Tải lên tệp
  await uploadPage.uploadFile(filePath);

  // Nhấn nút gửi form
  await uploadPage.submitForm();

  // Kiểm tra thông báo thành công
  const successMessage = await uploadPage.getSuccessMessage();
  expect(successMessage).toBe("Tệp đã được tải lên thành công"); // Kiểm tra thông báo
});

test("Kiểm tra tải lên tệp không hợp lệ", async ({ page }) => {
  const uploadPage = new UploadPage(page); // Khởi tạo đối tượng UploadPage

  // Mở trang upload file
  await page.goto("https://yourwebsite.com/upload");

  // Đường dẫn tới tệp không hợp lệ (ví dụ: tệp không đúng định dạng)
  const invalidFilePath = path.join(__dirname, "invalid-file.xyz");

  // Tải lên tệp không hợp lệ
  await uploadPage.uploadFile(invalidFilePath);

  // Nhấn nút gửi form
  await uploadPage.submitForm();

  // Kiểm tra thông báo lỗi
  const errorMessage = await uploadPage.getErrorMessage();
  expect(errorMessage).toBe("Tệp tải lên không hợp lệ"); // Kiểm tra thông báo lỗi
});
