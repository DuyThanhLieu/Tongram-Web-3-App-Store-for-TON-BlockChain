import { test, expect } from "@playwright/test";

test("Check video banner on homepage", async ({ page }) => {
  // Truy cập vào trang web
  await page.goto("https://tonic.tongram.app/en");

  // Tìm video trên trang bằng cách sử dụng selector
  const videoElement = page.locator("video"); // Giả sử video là thẻ <video>

  // Kiểm tra xem video có xuất hiện trên trang hay không
  await expect(videoElement).toBeVisible();

  // Kiểm tra xem thuộc tính 'autoplay' có tồn tại hay không
  const isAutoplay = await videoElement.getAttribute("autoplay");
  console.log("Autoplay attribute:", isAutoplay); // Log the autoplay attribute
  expect(isAutoplay).not.toBeNull();

  // Wait for a brief moment to allow the video to start playing
  await page.waitForTimeout(2000); // Wait for 2 seconds

  // Kiểm tra xem video có thực sự đang phát hay không
  const isPlaying = await page.evaluate(() => {
    const video = document.querySelector("video");
    return !!(video && !video.paused && !video.ended && video.readyState > 2);
  });

  console.log("Is video playing:", isPlaying); // Log the playing status
  expect(isPlaying).toBe(true); // Đảm bảo rằng video đang phát
});
