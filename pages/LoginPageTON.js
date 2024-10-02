const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('input[name="username"]');  // Chỉnh selector thực tế
        this.passwordField = page.locator('input[name="password"]');  // Chỉnh selector thực tế
        this.loginButton = page.locator('button[type="submit"]');     // Chỉnh selector thực tế
    }

    async goto() {
        await this.page.goto('https://staging.tongram.app/');  // Đặt URL của trang đăng nhập
    }

    async enterUsername(username) {
        await this.usernameField.fill(username);
    }

    async enterPassword(password) {
        await this.passwordField.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}

module.exports = { LoginPage };
