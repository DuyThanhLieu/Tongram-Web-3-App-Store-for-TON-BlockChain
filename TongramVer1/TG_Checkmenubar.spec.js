import { test, expect } from "@playwright/test";
import fs from "fs/promises";

test.describe("Các hành động của Tongram", () => {
  let page;

  // Bước đăng nhập vào Telegram với cookies
  test("Đăng nhập với Telegram và thực hiện các hành động", async ({
    browser,
  }) => {
    await test.step("Đăng nhập vào Telegram", async () => {
      try {
        const cookies = JSON.parse(
          await fs.readFile("../Cookies/cookies_tongram.json", "utf-8")
        );

        const context = await browser.newContext();
        await context.addCookies(cookies);
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
      if (!page) {
        console.error(
          "Trang chưa được khởi tạo, không thể thực hiện các hành động."
        );
        return; // Dừng test nếu trang chưa được khởi tạo
      }

      await page.goto("https://tongram.app/");
      await page.waitForLoadState("networkidle"); // Chờ trang tải

      await page.getByRole("button", { name: "Liêu Duy Thanh" }).click();
      await page.waitForLoadState("networkidle");

      await page.getByRole("button", { name: "Management" }).click();
      await page.waitForLoadState("networkidle");

      await page.getByRole("button", { name: "Liêu Duy Thanh" }).click();
      const earnButton = page.getByRole("button", { name: "Earn" });
      await earnButton.waitFor({ state: "visible" });
      await earnButton.click();
      await page.waitForLoadState("networkidle");

      await page.getByRole("button", { name: "Liêu Duy Thanh" }).click();
      const submitButton = page.getByRole("button", { name: "Submit App" });
      await submitButton.waitFor({ state: "visible" });
      await submitButton.click();
      await page.waitForLoadState("networkidle");

      await page.getByRole("button", { name: "Liêu Duy Thanh" }).click();
      await page.getByRole("button", { name: "My Apps" }).click();
      await page.waitForLoadState("networkidle");

      await page.getByRole("button", { name: "Liêu Duy Thanh" }).click();
      await page.getByRole("button", { name: "Categories" }).click();
      await page.waitForLoadState("networkidle");

      const categories = [
        "Games Games",
        "Productivity Productivity",
        "Social Social",
        "Entertainment Entertainment",
        "Finance Finance",
        "Education Education",
        "Lifestyle Lifestyle",
        "Management Management",
      ];

      // Kiểm tra và mở tên game cụ thể
      for (const category of categories) {
        const categoryLink = page.getByRole("link", { name: category });
        await categoryLink.waitFor({ state: "visible" });
        await categoryLink.click();
        await page.waitForLoadState("networkidle");

        // Tìm kiếm tên game
        const gameName = "PISTON Hub"; // Tên game bạn muốn tìm
        const gameLink = page.getByRole("link", { name: gameName });

        // Kiểm tra xem tên game có tồn tại không
        if (await gameLink.isVisible()) {
          console.log(`Tìm thấy game: ${gameName}`);
          await gameLink.click(); // Nhấp vào liên kết game
          await page.waitForLoadState("networkidle"); // Chờ trang tải
          // Thực hiện các hành động tiếp theo trên trang game nếu cần

          // Quay lại trang danh sách game
          await page.goBack();
          await page.waitForLoadState("networkidle"); // Chờ trang tải
        } else {
          console.log(`Không tìm thấy game: ${gameName}`);
        }

        // Quay lại trang danh mục
        await page.getByRole("button", { name: "Categories" }).click();
        await page.waitForLoadState("networkidle"); // Chờ trang tải
      }

      // await context.close(); // Đóng ngữ cảnh
      await browser.close(); // Đóng trình duyệt
    });
  });
});
