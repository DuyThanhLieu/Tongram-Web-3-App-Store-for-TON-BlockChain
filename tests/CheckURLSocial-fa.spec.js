import { test, expect } from '@playwright/test';

test('Verify Facebook link redirects to the correct Facebook page', async ({ page }) => {
  // Điều hướng đến trang chính
  await page.goto('https://staging.tongram.app/');

  // Chờ sự kiện popup khi nhấp vào icon/link Facebook
  const page1Promise = page.waitForEvent('popup');

  // Nhấp vào icon/link Facebook
  await page.getByRole('link', { name: 'Facebook' }).click();

  // Lấy trang popup mới mở ra
  const page1 = await page1Promise;

  // Chờ cho trang popup tải hoàn toàn
  await page1.waitForLoadState();

  // Lấy URL của trang popup
  const url = page1.url();

  // Kiểm tra URL của trang popup có chính xác là 'https://www.facebook.com/tongramhub/'
  expect(url).toBe('https://www.facebook.com/tongramhub/');

  // Nếu URL khớp, test case sẽ pass
});
