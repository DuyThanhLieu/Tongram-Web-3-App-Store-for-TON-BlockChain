// TG_Cookies.js
import { config } from '../Utils/TG_config.js';
import { chromium } from 'playwright';
import fs from 'fs/promises';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Truy cập trang và đăng nhập bằng tay
  await page.goto('https://tongram.app/en');
  await page.waitForTimeout(30000); // Chờ bạn đăng nhập

  // Lưu cookie sau khi đăng nhập
  const cookies = await context.cookies();
  await fs.writeFile('./Cookies/cookies_tongram.json', JSON.stringify(cookies, null, 2));

  console.log('Cookies đã được lưu vào file.');
  await browser.close();
})();
