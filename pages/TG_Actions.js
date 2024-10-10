import { test, expect } from '@playwright/test';
// Mô-đun fs cho phép bạn thực hiện các thao tác với hệ thống tệp như đọc, ghi, cập nhật và xóa tệp.
import fs from "fs";
import { config } from "../Utils/TG_config"; // sử dụng các tên đã config

class TGHomePage {
    constructor(page) {
    this.page = page;
    this.sumaryElement = page.locator(config.chatPointSelector);
    this.engagementElement = page.locator(
      'div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600'
    );
    this.reviewElement = page.locator(
      'div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600'
    );
    this.shareElement = page.locator(
      'div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600'
    );
    this.launchPlusButton = page.locator('button:has-text("Launch +")');
    this.launchButton = page.locator('button:has-text("Launch")');
    this.pointSelector = "span.font-bold.leading-none.text-black";
    this.searchInput = page.locator('input[placeholder="Search"]');
  }
  async load() {
    try {s
      const cookies = JSON.parse(fs.readFileSync(congfig.cookies, "utf-8"));
      await this.page.context().addCookies(cookies);
      await this.page.goto(config.tongramUrl);
      // await this.page.waitForLoadState('networkidle');
      console.log("Page loaded successfully.");
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
}
 export default TGHomePage;
