// login.js
import fs from "fs/promises";

export async function loginWithCookies(browser) {
  const context = await browser.newContext();

  try {
    const cookies = JSON.parse(
      await fs.readFile("../Cookies/cookies_tonic.json", "utf-8")
    );
    await context.addCookies(cookies);
    const page = await context.newPage(); // Create a new page
    await page.goto("https://tonic.tongram.app/en");
    await page.waitForLoadState("networkidle");

    console.log("Đăng nhập thành công với cookie!");
    return page; // Return the new page
  } catch (error) {
    console.error("Lỗi trong quá trình đăng nhập:", error);
    throw error; // Re-throw the error for handling in the test
  }
}
