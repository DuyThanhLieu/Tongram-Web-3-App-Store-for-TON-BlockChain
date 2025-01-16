import { test } from "@playwright/test";
import { loginWithCookies } from "../pages/TN_Login"; // Adjust the import path as necessary
test.describe("Tongram Actions 1", () => {
  test("Đăng nhập và thực hiện các hành động trên trang", async ({
    browser,
  }) => {
    const page = await loginWithCookies(browser); // Call the login function

    // await page.pause(); // Pause to inspect the main page
    await page
      .getByRole("banner")
      .getByRole("button", { name: "Reserve NOW" })
      .click();
    const quantityButton = page
      .locator("div")
      .filter({ hasText: /^Quantity$/ })
      .getByRole("button")
      .nth(1);
    for (let i = 0; i < 4; i++) {
      await quantityButton.click(); // Click quantity button four times
    }
    await page
      .locator("#order")
      .getByRole("button", { name: "Reserve NOW" })
      .click();
    // await page.getByRole("button", { name: "Add to Cart" }).click();
    await page
      .getByPlaceholder("Email", { exact: true })
      .fill("duythanhlieu2001@gmail.com");
    await page.getByRole("button", { name: "Country/Region" }).click();
    await page.getByText("Aland Islands").click();
    await page.getByPlaceholder("Full Name").fill("Thanh");
    await page.getByPlaceholder("Address", { exact: true }).fill("HCM");

    await page.getByPlaceholder("Apartment, suite, etc. (").fill("HCM");
    await page.getByPlaceholder("City").fill("HCM");
    await page.getByPlaceholder("ZIP code").fill("70000");
    await page.getByPlaceholder("Phone").fill("0343602871");
    await page
      .getByRole("checkbox", { name: "I agree to the Pre-Order" })
      .check();
    await page
      .getByRole("main")
      .getByRole("button", { name: "Reserve NOW" })
      .click();

    await page.pause(); // Pause to inspect after submission
    await page.getByRole("button", { name: "Return to Homepage" }).click();
  });
});
// Các thay đổi chính:
// Thay đổi thiết kế trang chủ để tích hợp Tonic Mini.
// Người dùng phải điền thông tin liên hệ và tải lên CMND trước khi truy cập nội dung.
// Gửi email chào mừng khi đăng ký thành công.
// Cập nhật thiết kế xác minh email.
// Trang "Đơn hàng của tôi" hiển thị lịch sử và có phân trang (10 mục/trang).
// Thêm Tonic Mini vào trang đặt trước.
// Tự động điền dữ liệu khi đặt trước dựa trên thông tin người dùng.
