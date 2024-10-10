import { test, expect } from '@playwright/test';

test('Verify popup opens to the correct URL', async ({ page }) => {
  // Điều hướng đến trang chính
  await page.goto('https://staging.tongram.app/');

  // Chờ sự kiện popup khi nhấp vào liên kết
  const page1Promise = page.waitForEvent('popup');

  // Nhấp vào icon/link mà bạn muốn mở popup
  await page.getByRole('link', { name: 'Youtube' }).click();

  // Lấy trang popup mới mở ra
  const page1 = await page1Promise;

  // Chờ cho popup tải hoàn toàn
  await page1.waitForLoadState();

  // Kiểm tra URL của popup đã mở
  const popupUrl = page1.url();
  expect(popupUrl).toBe('https://www.youtube.com/@TONGRAMCenter'); // Kiểm tra URL mong muốn

  // Nếu URL khớp, test case sẽ pass
});