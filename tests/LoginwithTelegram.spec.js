// tests/telegramAutoConfirm.test.js
const { test, expect } = require('@playwright/test');

test('Auto confirm Telegram login on Tongram', async ({ page }) => {
  // Điều hướng đến trang chính của Tongram
  await page.goto('https://staging.tongram.app/');

  // Chờ popup sau khi nhấp vào "Log In"
  const telegramPopupPromise = page.waitForEvent('popup');

  // Nhấp vào nút đăng nhập qua Telegram
  await page.click('text="Log In"'); // Cập nhật selector nếu cần
  const telegramPopup = await telegramPopupPromise;

  // Chờ trang Telegram tải xong
  await telegramPopup.waitForLoadState();

  // Điền số điện thoại vào form đăng nhập của Telegram
  await telegramPopup.fill('#login-phone', '0343602871'); // Điền số điện thoại của bạn

  // Nhấn nút "Next" để gửi số điện thoại
  await telegramPopup.getByRole('button', { name: 'Next' }).click(); // Nhấn nút Next

  // Đợi thông báo xác nhận
//   await telegramPopup.waitForSelector('text="Liêu Duy, we received a request to log in on staging.tongram.app with your Telegram account."');

//   // Nhấn nút "Confirm"
//   await telegramPopup.click('text="Confirm"'); // Nhấn nút Confirm

  // Kiểm tra URL hoặc trạng thái sau khi xác nhận
//   await telegramPopup.waitForLoadState(); // Đợi trang tải lại hoàn toàn
//   expect(telegramPopup.url()).toContain('success'); // Kiểm tra URL xác nhận thành công
});
