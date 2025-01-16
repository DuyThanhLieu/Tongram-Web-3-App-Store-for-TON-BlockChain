import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://tonic.tongram.app/en");
  await page.getByRole("button", { name: "English" }).first().click();
  await page.getByRole("link", { name: "대한민국" }).first().click();
  await page.getByRole("button", { name: "대한민국" }).first().click();
  await page.getByRole("link", { name: "中国" }).first().click();
  await page.getByRole("button", { name: "中国" }).first().click();
  await page.getByRole("link", { name: "España" }).first().click();
  await page.getByRole("button", { name: "España" }).first().click();
  await page.getByRole("link", { name: "भारत" }).first().click();
  await page.getByRole("button", { name: "भारत" }).first().click();
  await page.getByRole("link", { name: "Portugal" }).first().click();
  await page.getByRole("button", { name: "Portugal" }).first().click();
  await page.getByRole("link", { name: "Россия" }).first().click();
  await page.getByRole("button", { name: "Россия" }).first().click();
  await page.getByRole("link", { name: "日本" }).first().click();
  await page.getByRole("button", { name: "日本" }).first().click();
  await page.getByRole("link", { name: "Việt Nam" }).first().click();
  await page.getByRole("button", { name: "Việt Nam" }).first().click();
  await page.getByRole("link", { name: "France" }).first().click();
  await page.getByRole("button", { name: "France" }).first().click();
  await page.getByRole("link", { name: "Deutschland" }).first().click();
});
