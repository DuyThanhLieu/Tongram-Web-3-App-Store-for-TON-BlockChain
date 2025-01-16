import { test, expect } from "@playwright/test";
import fs from "fs/promises";
import { chromium } from "playwright";

test.describe("Tongram Actions 1", () => {
  test("Đăng nhập với Telegram và kiểm tra trang lịch sử", async ({
    browser,
  }) => {
    let page;

    // Đăng nhập với Telegram
    await test.step("Đăng nhập với Telegram", async () => {
      try {
        const cookies = JSON.parse(
          await fs.readFile("../Cookies/cookies_tonic.json", "utf-8")
        );
        const context = await browser.newContext();
        await context.addCookies(cookies);
        page = await context.newPage();
        await page.goto("https://tonic.tongram.app/");
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

    // Pause for manual input or further actions if needed
    await page.pause(); // This will pause the test execution

    // Fill out the form after login
    await test.step("Fill out the form", async () => {
      await page.getByPlaceholder("Email", { exact: true }).click();
      await page
        .getByPlaceholder("Email", { exact: true })
        .fill("duythanhlieu2001@gmail.com");
      await page.getByRole("button", { name: "Country/Region" }).click();
      await page.getByText("Vietnam").click();
      await page.getByPlaceholder("Full Name").click();
      await page.getByPlaceholder("Full Name").fill("thanh");
      await page.getByPlaceholder("Address", { exact: true }).click();
      await page.getByPlaceholder("Address", { exact: true }).fill("HCM");
      await page.getByPlaceholder("Apartment, suite, etc. (").click();
      await page.getByPlaceholder("Apartment, suite, etc. (").fill("hcm");
      await page.getByPlaceholder("City").click();
      await page.getByPlaceholder("City").fill("hcm");
      await page.getByPlaceholder("ZIP code").click();
      await page.getByPlaceholder("ZIP code").fill("70000");
      await page.getByPlaceholder("Phone").click();
      await page.getByPlaceholder("Phone").fill("0343602871");
      await page.getByLabel("I agree to the Pre-Order").check();
      await page
        .getByRole("main")
        .getByRole("button", { name: "Continue" })
        .click();

      // Upload ID Card - Front
      await page
        .locator("div")
        .filter({
          hasText: /^ID Card - Front\*Supported format: PNG, JPGBrowse Files$/,
        })
        .locator("span")
        .click();
      await page
        .locator("div")
        .filter({
          hasText: /^ID Card - Front\*Supported format: PNG, JPGBrowse Files$/,
        })
        .locator("div")
        .nth(1)
        .setInputFiles("photo_2024-10-28_15-01-42.jpg");
      await page.getByText("Browse Files").click();
      await page
        .locator("div")
        .filter({ hasText: /^Supported format: PNG, JPGBrowse Files$/ })
        .nth(1)
        .setInputFiles("photo_2024-10-28_15-01-42.jpg");
      await page
        .getByRole("main")
        .getByRole("button", { name: "Continue" })
        .click();
    });

    // Cleanup
    await page.context().close();
  });
});
