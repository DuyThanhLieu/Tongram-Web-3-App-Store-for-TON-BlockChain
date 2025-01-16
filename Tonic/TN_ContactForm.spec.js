import { test, expect } from "@playwright/test";
import fs from "fs/promises";

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

    // Điều hướng đến trang lịch sử
    // await test.step("Điều hướng đến trang lịch sử", async () => {
    //   await page.goto("https://tonic.tongram.app/en/my-page/history");
    //   await page.waitForLoadState("networkidle");
    //   console.log("Đã điều hướng đến trang lịch sử!");
    //   await page.pause();
    // });

    // Gửi biểu mẫu liên hệ
    await test.step("Gửi biểu mẫu liên hệ", async () => {
      await page.goto("https://tonic.tongram.app/en");
      await page.waitForLoadState("networkidle");

      await page.getByPlaceholder("Your Full Name").fill("QC Check");
      await page.getByPlaceholder("Your Subject").fill("QC Check");

      // Sửa lại đây để chỉ rõ email với thuộc tính name
      await page
        .getByPlaceholder("Email Address", { exact: true })
        .fill("anonymous@gmail.com");

      await page
        .getByPlaceholder("Write Here Your Message")
        .fill("tester mãi đỉnh");

      // Tạm dừng để bạn có thể tự giải CAPTCHA
      console.log("Vui lòng tự giải CAPTCHA trong 15 giây...");
      await page.pause();

      // Gửi form
      await page.getByRole("button", { name: "Send Message" }).click();
      console.log("Biểu mẫu đã được gửi thành công!");
    });
  });
});
