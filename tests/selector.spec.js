import { test, expect } from '@playwright/test';
// test('Selectors Demo', async ({ page }) => {
//     await page.goto('https://saucedemo.com/');
//     await page.pause();
//     await page.locator('id=user-name').fill('Edisoname')
//     await page.waitForSelector('id=user-name', { timeout: 5000 })
//     // cho 5s
//     await page.locator('id=password-name').fill('12332132')
//     // await page.waitForSelector('id=user-name', { timeout: 5000 })
//     await page.locator('id=password-name').click();

// })

test('test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="login-credentials"]').click();
    await page.locator('[data-test="login-credentials"]').click();
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="password"]').press('Enter');
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
});