// /page/HomePage.ts
import { Page } from '@playwright/test';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Điều hướng đến trang chính
  async navigate() {
    await this.page.goto('https://staging.tongram.app/');
  }

  // Nhấp vào liên kết Youtube
  async clickYoutubeLink() {
    await this.page.getByRole('link', { name: 'Youtube' }).click();
  }

  // Chờ sự kiện popup và trả về trang popup
  async waitForPopup(): Promise<Page> {
    const popup = await this.page.waitForEvent('popup');
    return popup;
  }
}
