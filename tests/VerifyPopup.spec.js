// /tests/verifyPopup.test.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../page/HomePage';

test('Verify popup opens to the correct URL', async ({ page }) => {
  const homePage = new HomePage(page);

  // Điều hướng đến trang chính
  await homePage.navigate();

  // Nhấp vào liên kết Youtube và chờ popup
  const popupPage = await homePage.waitForPopup();
  await homePage.clickYoutubeLink();

  // Chờ cho popup tải hoàn toàn
  await popupPage.waitForLoadState();

  // Lấy URL của popup
  const popupUrl = popupPage.url();

  // Kiểm tra URL khớp với URL mong muốn
  expect(popupUrl).toBe('https://www.youtube.com/@TONGRAMCenter');
});
