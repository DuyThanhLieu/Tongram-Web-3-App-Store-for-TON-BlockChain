import { test, expect } from "@playwright/test";
import fs from "fs/promises";

test.describe("Tongram Actions", () => {
  let page;

  // Bước đăng nhập vào Telegram với cookies
  test("Đăng nhập với Telegram và Thực hiện hành động", async ({ browser }) => {
    await test.step("Đăng nhập với Telegram", async () => {
      try {
        // Đọc cookie từ tệp JSON
        const cookies = JSON.parse(
          await fs.readFile("./Cookies/cookies_tongram.json", "utf-8")
        );

        const context = await browser.newContext();
        await context.addCookies(cookies);

        // Mở trang web Tongram
        page = await context.newPage();
        await page.goto("https://tongram.app/en");
        await page.waitForLoadState("networkidle");
        console.log("Đăng nhập thành công với cookie!");
      } catch (error) {
        if (error.code === "ENOENT") {
          console.error("Không tìm thấy tệp cookies, hãy đảm bảo tệp tồn tại.");
        } else {
          console.error("Lỗi trong quá trình đăng nhập:", error);
        }
        return; // Dừng test nếu có lỗi
      }
    });

    // Thực hiện các hành động trên trang sau khi đăng nhập
    await test.step("Thực hiện các hành động trên trang", async () => {
      const page1Promise = page.waitForEvent("popup");

      // Nhấp nút "Log In" để mở popup đăng nhập
      await page.getByRole("button", { name: "Log In" }).click();
      const page1 = await page1Promise;

      // Điền số điện thoại đăng nhập
      await page1.locator("#login-phone").fill("0343602871");
      await page1.getByRole("button", { name: "Next" }).click();

      // Điều hướng và thực hiện các hành động trên trang
      await page.goto("https://tongram.app/");
      await page.getByRole("button", { name: "Liêu Duy Thanh" }).click();
      await page.getByRole("button", { name: "Management" }).click();
      await page.getByRole("button", { name: "Earn" }).click();
      await page.getByRole("button", { name: "Submit App" }).click();
      await page.getByRole("button", { name: "My Apps" }).click();

      // Thao tác với các danh mục (Categories)
      await page.getByRole("button", { name: "Categories" }).click();
      await page.getByRole("link", { name: "Games Games" }).click();
      await page.getByRole("button", { name: "Categories" }).click();
      await page
        .getByRole("link", { name: "Productivity Productivity" })
        .click();
      await page.getByRole("button", { name: "Categories" }).click();
      await page.getByRole("link", { name: "Social Social" }).click();
      await page.getByRole("button", { name: "Categories" }).click();
      await page
        .getByRole("link", { name: "Entertainment Entertainment" })
        .click();
      await page.getByRole("button", { name: "Categories" }).click();
      await page.getByRole("link", { name: "Finance Finance" }).click();
      await page.getByRole("button", { name: "Categories" }).click();
      await page.getByRole("link", { name: "Education Education" }).click();
      await page.getByRole("button", { name: "Categories" }).click();
      await page.getByRole("link", { name: "Lifestyle Lifestyle" }).click();
      await page.getByRole("button", { name: "Categories" }).click();
      await page.getByRole("link", { name: "Management Management" }).click();

      // Nhấp vào các nút rating hoặc các tùy chọn khác
      await page.getByRole("button", { name: "High rating" }).click();
    });
  });
});
