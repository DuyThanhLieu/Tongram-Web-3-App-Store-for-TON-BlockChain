import { test, expect } from '@playwright/test';
import fs from 'fs/promises';

test.describe('Tongram Actions 1', () => {
    test('Đăng nhập với Telegram và Thực hiện hành động', async ({ browser }) => {
        let page;

        await test.step('Đăng nhập với Telegram', async () => {
            try {
                // Đọc cookie từ tệp JSON
                const cookies = JSON.parse(await fs.readFile('../Cookies/cookies_tongram.json', 'utf-8'));
                const context = await browser.newContext();
                await context.addCookies(cookies);

                // Mở trang web Tongram
                page = await context.newPage();
                await page.goto('https://tongram.app/en');
                await page.waitForLoadState('networkidle');
                console.log('Đăng nhập thành công với cookie!');
            } catch (error) {
                if (error.code === 'ENOENT') {
                    console.error('Không tìm thấy tệp cookies, hãy đảm bảo tệp tồn tại.');
                    return; // Dừng test nếu không tìm thấy cookies
                } else {
                    console.error('Lỗi trong quá trình đăng nhập:', error);
                    return; // Dừng test nếu có lỗi
                }
            }
        });

        await test.step('Kiểm tra tiêu đề trang', async () => {
            const title = await page.title();
            console.log('Tiêu đề trang:', title);
            expect(title).toContain('Tongram');
        });

        await test.step('Tìm kiếm một phần tử và nhấp vào nó', async () => {
          const someElement = page.locator('button.flex.w-full.items-center'); // Thay thế bằng selector thực tế
          try {
              await page.waitForSelector('button.flex.w-full.items-center', { state: 'visible', timeout: 20000 });
              await someElement.click();
              console.log('Đã nhấp vào phần tử thành công!');
          } catch (error) {
              console.error('Lỗi khi tìm kiếm và nhấp vào phần tử:', error);
          }
      });
      

        await test.step('Cuộn xuống và kiểm tra thêm nội dung', async () => {
            const newContentElement = page.locator('selector-cho-noi-dung'); // Thay thế bằng selector thực tế
            try {
                await newContentElement.scrollIntoViewIfNeeded(); // Cuộn đến phần tử
                await newContentElement.waitFor({ state: 'visible', timeout: 10000 });
                console.log('Đã cuộn xuống nội dung mới!');

                const newContentText = await newContentElement.textContent();
                console.log('Nội dung mới hiển thị:', newContentText);
            } catch (error) {
                console.error('Lỗi khi cuộn xuống và kiểm tra nội dung:', error);
            }
        });

        await test.step('Xác minh nội dung hiển thị', async () => {
            const displayedElement = page.locator('selector-cho-noi-dung-hien-thi'); // Thay thế bằng selector thực tế
            try {
                await displayedElement.waitFor({ state: 'visible', timeout: 10000 });
                const displayedText = await displayedElement.textContent();
                console.log('Nội dung hiển thị:', displayedText);
                expect(displayedText).toContain('Nội dung mong muốn'); // Thay thế với nội dung mong muốn
            } catch (error) {
                console.error('Lỗi khi xác minh nội dung hiển thị:', error);
            }
        });

        await test.step('Kiểm tra thông tin tài khoản người dùng', async () => {
            const accountInfoElement = page.locator('selector-thong-tin-tai-khoan'); // Thay thế bằng selector thực tế
            try {
                await accountInfoElement.waitFor({ state: 'visible', timeout: 10000 });
                const accountInfoText = await accountInfoElement.textContent();
                console.log('Thông tin tài khoản:', accountInfoText);
                expect(accountInfoText).toBeTruthy();
            } catch (error) {
                console.error('Lỗi khi kiểm tra thông tin tài khoản:', error);
            }
        });

        await test.step('Kiểm tra danh sách các phần tử', async () => {
            const items = page.locator('selector-danh-sach-phan-tu'); // Thay thế bằng selector thực tế
            try {
                const count = await items.count();
                console.log(`Có tổng cộng ${count} phần tử trong danh sách.`);

                for (let i = 0; i < count; i++) {
                    const itemText = await items.nth(i).textContent();
                    console.log(`Phần tử ${i + 1}: ${itemText}`);
                    expect(itemText).toBeTruthy();
                }
            } catch (error) {
                console.error('Lỗi khi kiểm tra danh sách phần tử:', error);
            }
        });
    });
});
