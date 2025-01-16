class UploadPage {
  constructor(page) {
    this.page = page;
    this.fileInput = page.locator('input[type="file"]'); // Locator cho input file
    this.submitButton = page.locator('button[type="submit"]'); // Locator cho nút submit
    this.successMessage = page.locator(".success-message"); // Locator cho thông báo thành công
    this.errorMessage = page.locator(".error-message"); // Locator cho thông báo lỗi
  }

  // Phương thức tải lên tệp
  async uploadFile(filePath) {
    await this.fileInput.setInputFiles(filePath); // Chọn tệp cần tải lên
  }

  // Phương thức nhấn nút gửi form
  async submitForm() {
    await this.submitButton.click(); // Nhấn nút submit
  }

  // Phương thức lấy thông báo thành công
  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }

  // Phương thức lấy thông báo lỗi
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = UploadPage;
