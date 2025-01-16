// TN_ContactForm.spec.js
import { test } from "@playwright/test";
import { loginWithCookies } from "../pages/TN_Login"; // Adjust the import path as necessary

test.describe("Tongram Actions 1", () => {
  test("Đăng nhập và thực hiện các hành động trên trang", async ({
    browser,
  }) => {
    const page = await loginWithCookies(browser); // Call the login function

    await page.pause(); // Pause to inspect the main page

    // Perform actions on the main page
    await page
      .getByRole("banner")
      .getByRole("button", { name: "Reserve NOW" })
      .click();

    // Click quantity button four times
    const quantityButton = page
      .locator("div")
      .filter({ hasText: /^Quantity$/ })
      .getByRole("button")
      .nth(1);
    for (let i = 0; i < 4; i++) {
      await quantityButton.click(); // Click quantity button four times
    }

    // Proceed with the order
    await page
      .locator("#order")
      .getByRole("button", { name: "Reserve NOW" })
      .click();

    // Fill in the order details
    await page.getByPlaceholder("Email").fill("duythanhlieu2001@gmail.com");
    await page.getByRole("button", { name: "Country/Region" }).click();
    await page.getByText("Aland Islands").click();
    await page.getByPlaceholder("Full Name").fill("Thanh");
    await page.getByPlaceholder("Address").fill("HCM");
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
