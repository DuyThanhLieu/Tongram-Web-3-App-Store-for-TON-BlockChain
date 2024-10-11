import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.locator("body").click();
  await page.goto("https://staging.tongram.app/contact-us");
  await page.getByPlaceholder("Your Full Name").click();
  await page.getByPlaceholder("Your Full Name").fill("QC Check contact auto");
  await page.getByPlaceholder("Your Subject").click();
  await page.getByPlaceholder("Your Full Name").click();
  await page.getByPlaceholder("Your Subject").click();
  await page.getByPlaceholder("Your Subject").fill("Check Contact");
  await page.getByPlaceholder("Email Address").click();
  await page.getByPlaceholder("Email Address").fill("anonymous@gmail.com");
  await page
    .locator("div")
    .filter({ hasText: /^\(0\/1000\)$/ })
    .nth(2)
    .click();
  await page.getByPlaceholder("Write Here Your Message").fill("support for me");
  await page
    .locator('iframe[name="a-fk8thxmhjuum"]')
    .contentFrame()
    .getByLabel("I'm not a robot")
    .click();
});
