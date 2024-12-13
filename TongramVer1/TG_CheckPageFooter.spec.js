import { test, expect } from "@playwright/test";
import fs from "fs/promises";

test.describe("Tongram Actions", () => {
  test("Đăng nhập với Telegram và Thực hiện hành động", async ({ browser }) => {
    test.setTimeout(120000); // Thiết lập thời gian timeout cho test

    let page;
    let context;

    await test.step("Đăng nhập với Telegram", async () => {
      try {
        // Đọc cookie từ tệp JSON
        const cookies = JSON.parse(
          await fs.readFile("../Cookies/cookies_tongram.json", "utf-8")
        );
        context = await browser.newContext();
        await context.addCookies(cookies);

        // Mở trang web Tongram
        page = await context.newPage();
        await page.goto("https://tongram.app/en");
        await page.waitForLoadState("networkidle");
        console.log("Đăng nhập thành công với cookie!");
      } catch (error) {
        if (error.code === "ENOENT") {
          console.error("Không tìm thấy tệp cookies, hãy đảm bảo tệp tồn tại.");
          return;
        } else {
          console.error("Lỗi trong quá trình đăng nhập:", error);
          return;
        }
      }
    });

    // Thực hiện các hành động khác với thời gian chờ
    await page.goto("https://tongram.app/");
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây
    await page.getByRole("link", { name: "Contact Us" }).click();
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây

    await page.goto("https://tongram.app/");
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây
    await page.getByRole("link", { name: "Apps Categories" }).click();
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây

    await page.getByRole("link", { name: "Submit your App" }).click();
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây

    await page.getByRole("link", { name: "Developer Support" }).click();
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây

    await page.getByRole("link", { name: "App Promotion" }).click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây

    const page2Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "How to Use" }).click();
    const page2 = await page2Promise;
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây

    await page.getByRole("link", { name: "FAQs" }).click();
    const page3Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Rewards system" }).click();
    const page3 = await page3Promise;
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây

    const page4Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Privacy Policy" }).click();
    const page4 = await page4Promise;
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây

    const page5Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Terms of services" }).click();
    const page5 = await page5Promise;
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây

    const page6Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Facebook" }).click();
    const page6 = await page6Promise;
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây

    const page7Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "X", exact: true }).click();
    const page7 = await page7Promise;
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây

    const page8Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Youtube" }).click();
    const page8 = await page8Promise;
    await page.waitForTimeout(1000); // Thời gian chờ 1 giây

    const page9Promise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Join Community" }).click();
    const page9 = await page9Promise;

    // Đóng tất cả sau khi hoàn thành
    await context.close(); // Đóng ngữ cảnh
    await browser.close(); // Đóng trình duyệt
  });
});
