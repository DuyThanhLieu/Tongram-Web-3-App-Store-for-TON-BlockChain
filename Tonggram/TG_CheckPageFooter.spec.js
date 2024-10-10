import { test, expect } from "@playwright/test";
import fs from "fs/promises"; // Import fs để sử dụng đọc file

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
        if (error.code === "ENOENT") {
          console.error("Không tìm thấy tệp cookies, hãy đảm bảo tệp tồn tại.");
          return; // Dừng test nếu không tìm thấy cookies
        } else {
          console.error("Lỗi trong quá trình đăng nhập:", error);
          return; // Dừng test nếu có lỗi
        }
      }
    });

    // Thực hiện các hành động khác với thời gian chờ
    await page.goto("https://tongram.app/");
    await page.waitForTimeout(3000); // Thời gian chờ 2 giây
    await page.getByRole("link", { name: "Contact Us" }).click();
    await page.waitForTimeout(3000); // Thời gian chờ 2 giây

    await page.goto("https://tongram.app/");
    await page.waitForTimeout(3000); // Thời gian chờ 2 giây
    await page.getByRole("link", { name: "Apps Categories" }).click();
    await page.waitForTimeout(3000); // Thời gian chờ 2 giây

    await page.getByRole("link", { name: "Submit your App" }).click();
    await page.waitForTimeout(3000); // Thời gian chờ 2 giây

    await page.getByRole("link", { name: "Developer Support" }).click();
    await page.waitForTimeout(3000); // Thời gian chờ 2 giây

    await page.getByRole("link", { name: "App Promotion" }).click();
    await page.waitForTimeout(3000); // Thời gian chờ 2 giây

    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "How to Use" }).click();
    const page2 = await page2Promise;

    await page.getByRole("link", { name: "FAQs" }).click();
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Rewards system" }).click();
    const page3 = await page3Promise;

    const page4Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Privacy Policy" }).click();
    const page4 = await page4Promise;

    const page5Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Terms of services" }).click();
    const page5 = await page5Promise;

    const page6Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Facebook" }).click();
    const page6 = await page6Promise;

    const page7Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "X", exact: true }).click();
    const page7 = await page7Promise;

    const page8Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Youtube" }).click();
    const page8 = await page8Promise;

    const page9Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Join Community" }).click();
    const page9 = await page9Promise;
  });
});
