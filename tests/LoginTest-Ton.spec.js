const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPageTON')
test.describe('Login Test', () => {
    test('should login with valid credentials', async ({ page }) => {
        // Khởi tạo trang LoginPage
        const loginPage = new LoginPage(page);

        // Điều hướng đến trang đăng nhập
        await loginPage.goto();

        // Thực hiện đăng nhập
        await loginPage.login('your_username', 'your_password');  // Thay username và password thực tế

        // Kiểm tra xem đã đăng nhập thành công chưa (ví dụ kiểm tra một phần tử tồn tại sau khi đăng nhập)
        await expect(page).toHaveURL('https://staging.tongram.app/dashboard');  // Thay URL thực tế sau khi login
    });
});
