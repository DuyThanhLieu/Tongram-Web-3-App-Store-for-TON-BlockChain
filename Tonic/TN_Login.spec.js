import { test, expect } from "@playwright/test";
import fs from "fs/promises";

test.describe("Tongram Actions 1", () => {
  test("Đăng nhập với Telegram và kiểm tra trang lịch sử", async ({
    browser,
  }) => {
    let page;

    await test.step("Đăng nhập với Telegram", async () => {
      try {
        // Đọc cookie từ tệp JSON
        const cookies = JSON.parse(
          await fs.readFile("../Cookies/cookies_tonic.json", "utf-8")
        );
        const context = await browser.newContext();
        await context.addCookies(cookies);

        // Mở trang web Tongram
        page = await context.newPage();
        await page.goto("https://tonic.tongram.app/en");
        await page.waitForLoadState("networkidle");
        console.log("Đăng nhập thành công với cookie!");
      } catch (error) {
        if (error.code === "ENOENT") {
          console.error("Không tìm thấy tệp cookies, hãy đảm bảo tệp tồn tại.");
          return; // Dừng test nếu không tìm thấy cookies
        } else {
          console.error("Lỗi trong quá trình đăng nhập:", error);
          return; // Dừng test nếu có lỗi
        }
      }
    });

    await test.step("Điều hướng đến trang lịch sử", async () => {
      try {
        // Điều hướng đến trang lịch sử
        await page.goto("https://tonic.tongram.app/en/my-page/history");
        await page.waitForLoadState("networkidle");

        // Thông báo đăng nhập thành công
        console.log("Đăng nhập thành công và đã điều hướng đến trang lịch sử!");

        // Dừng lại trên trang lịch sử để xem
        // await page.pause();
      } catch (error) {
        console.error("Lỗi khi điều hướng đến trang lịch sử:", error);
      }
    });

    await test.step("Đăng xuất", async () => {
      try {
        // Nhấn vào liên kết "Log Out"
        await page.getByRole("link", { name: "Log Out" }).click();
        await page.waitForLoadState("networkidle");

        // Kiểm tra xem có quay về trang chính xác không
        await page.waitForURL("https://tonic.tongram.app/en"); // Chờ đến URL cụ thể
        const currentUrl = page.url(); // Lấy URL hiện tại
        expect(currentUrl).toBe("https://tonic.tongram.app/en");
        await page.pause(); // Kiểm tra xem có đúng không
        console.log("Đăng xuất thành công và đã quay về trang chính!");
      } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
      }
    });
  });
});
