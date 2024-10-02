import { test, exact } from '@playwright/test'
test('login test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com')
    await page.pause()
    //const context = await browser.newContext();
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.waitForURL('https://www.saucedemo.com/inventory.html');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="item-1-title-link"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    // await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    // await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
    // await page.locator('[data-test="item-5-title-link"]').click();
    // await page.locator('[data-test="add-to-cart"]').click();

    await page.pause()
    // ---------------------
    // await context.close();
    // await browser.close();
})
test('log out', async ({ page }) => {
    await page.goto('https://www.saucedemo.com')
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    // await page.waitForURL('https://saucedemo.com ', { timeout: 3000 });
    // await page.pause();
    await context.close();
    await browser.close();
})