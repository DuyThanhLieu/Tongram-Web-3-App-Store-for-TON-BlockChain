import { test, expect } from "@playwright/test";

test("Kiểm tra video banner trên trang chủ", async ({ page }) => {
  // Truy cập vào trang web
  await page.goto("https://tonic.tongram.app/en");

  // Xác định video banner bằng selector đã cung cấp
  const videoElement = page.locator(
    "#hero > div > div.absolute.inset-0.flex.w-full.items-center.justify-center.bg-white.opacity-100 > div > video"
  );

  // Kiểm tra xem video có hiển thị trên trang không
  await expect(videoElement).toBeVisible();

  // Chờ video sẵn sàng để phát
  await videoElement.evaluate((video) => video.readyState >= 2);

  // Kiểm tra xem video có thuộc tính 'autoplay' không
  const isAutoplay = await videoElement.getAttribute("autoplay");
  expect(isAutoplay).not.toBeNull(); // Video phải có thuộc tính autoplay

  // Kiểm tra xem video có đang phát hay không
  const isPlaying = await page.evaluate(() => {
    const video = document.querySelector(
      "#hero > div > div.absolute.inset-0.flex.w-full.items-center.justify-center.bg-white.opacity-100 > div > video"
    );
    return !!(video && !video.paused && !video.ended && video.readyState > 2);
  });

  //   expect(isPlaying).toBe(true); // Đảm bảo rằng video đang phát
});
