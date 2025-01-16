import { config } from "../Utils/TG_config.js";
import { chromium } from "playwright";
import fs from "fs/promises";
import path from "path";
(async () => {
  const browser = await chromium.launch({ headless: false }); // Không chạy ở chế độ headless để bạn có thể thấy giao diện
  const context = await browser.newContext();
  const page = await context.newPage();

  // Điều hướng đến trang đăng nhập Google
  await page.goto("https://tonic.tongram.app/en");

  // Đợi người dùng nhập email, mật khẩu và xác thực
  await page.waitForTimeout(30000); // Bạn có thể nhập thủ công trong 60 giây
  // Sử dụng đường dẫn tuyệt đối tới thư mục Cookies
  const cookiesPath = path.resolve("../Cookies/cookies_tonic.json");
  // Lưu cookie sau khi đăng nhập
  const cookies = await context.cookies();
  await fs.writeFile(cookiesPath, JSON.stringify(cookies, null, 2));

  console.log("Cookies đã được lưu vào file:", cookiesPath);
  await browser.close();
})();
