import { test, expect } from "@playwright/test";
import { loginWithCookies } from "../pages/TN_Login";

test.describe("test social media icons", () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await loginWithCookies(browser);
    await page.goto("https://tonic.tongram.app/en");
  });

  test("check social media popups", async () => {
    const page1Promise = page.waitForEvent("popup");
    await page.locator(".duration-200").first().click();
    const page1 = await page1Promise;

    const page2Promise = page.waitForEvent("popup");
    await page.locator("a:nth-child(2)").first().click();
    const page2 = await page2Promise;

    const page3Promise = page.waitForEvent("popup");
    await page.locator("a:nth-child(3)").first().click();
    const page3 = await page3Promise;

    const page4Promise = page.waitForEvent("popup");
    console.log("Clicking the fourth social media icon");
    await page.locator("a:nth-child(4)").first().click();
    const page4 = await page4Promise;

    // Adding a delay to allow the popup to fully load
    await page.waitForTimeout(1000);

    // Check titles
    expect(await page1.title()).not.toBe("");
    expect(await page2.title()).not.toBe("");
    expect(await page3.title()).not.toBe("");
    expect(await page4.title()).not.toBe(""); // This might still fail if the popup is invalid
  });
});
