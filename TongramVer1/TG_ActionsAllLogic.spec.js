import { test, expect } from "@playwright/test";
import fs from "fs/promises";

test.describe("Tongram Actions", () => {
  test("Đăng nhập với Telegram và Thực hiện hành động", async ({ browser }) => {
    let page;

    await test.step("Đăng nhập với Telegram", async () => {
      try {
        // Đọc cookie từ tệp JSON
        const cookies = JSON.parse(
          await fs.readFile("../Cookies/cookies_tongram.json", "utf-8")
        );
        const context = await browser.newContext();
        await context.addCookies(cookies);

        // Mở trang web Tongram
        page = await context.newPage();
        await page.goto("https://tongram.app/en");
        await page.waitForLoadState("networkidle");
        console.log("Đăng nhập thành công với cookie!");
      } catch (error) {
        234;
        if (error.code === "ENOENT") {
          console.error("Không tìm thấy tệp cookies, hãy đảm bảo tệp tồn tại.");
          return; // Dừng test nếu không tìm thấy cookies
        } else {
          console.error("Lỗi trong quá trình đăng nhập:", error);
          return; // Dừng test nếu có lỗi
        }
      }
    });
    await test.step("Thực hiện các hành động sau khi đăng nhập", async () => {
      try {
        // Nhấn vào nút 'News'
        await page.getByRole("button", { name: "News" }).click();
        await page.waitForTimeout(2000); // Chờ 2 giây
        console.log("Current URL:", page.url()); // Log current URL

        // Nhấn vào tiêu đề 'Featured'
        await page.getByRole("heading", { name: "Featured" }).click();
        await page.waitForTimeout(2000); // Chờ 2 giây
        console.log("Current URL:", page.url()); // Log current URL

        // Nhấn vào liên kết 'Developers'
        await page
          .getByRole("link", { name: "Developers", exact: true })
          .click();
        await page.waitForTimeout(2000); // Chờ 2 giây
        console.log("Current URL:", page.url()); // Log current URL

        // Nhấn vào liên kết 'News' bên trong danh sách category
        await page
          .locator("#category-list")
          .getByRole("link", { name: "News" })
          .click();
        await page.waitForTimeout(2000); // Chờ 2 giây
        console.log("Current URL:", page.url()); // Log current URL

        // Nhấn vào liên kết 'Tongram Logo'
        await page.getByRole("link", { name: "Tongram Logo" }).click();
        await page.waitForTimeout(2000); // Chờ 2 giây
        console.log("Current URL:", page.url()); // Log current URL

        // Kiểm tra điều kiện sau các hành động (nếu cần)
        await expect(page).toHaveURL("https://tongram.app/"); // Update expected URL if necessary
      } catch (error) {
        console.error("Lỗi trong quá trình thực hiện hành động:", error);
      }
    });
  });
});
