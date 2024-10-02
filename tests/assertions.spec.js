import { test, expect } from '@playwright/test';
test('Demo assertions to demo ', async ({ page }) => {
    await page.goto('https://google.com/')
    await page.pause()
    await page.waitForSelector('text=Tìm trên Google', { timeout: 5000 });


    // Kiểm tra có bao nhiêu phần tử chứa text "Tìm trên Google"
    if (await page.locator('text=Tìm trên Google').count() > 0) {
        // Nhấp vào phần tử đầu tiên tìm thấy
        await page.locator('text=Tìm trên Google').first().click();
    }
    await expect(page.locator('text=Tìm trên Google')).toBeDisabled()

    await expect(page.locator('text=Tìm trên Google')).toBeVisible()
    //check an hien
    await expect(page.locator('text=Tìm trên Google')).toBeHidden()
    //check text
    // hien tai // tohave cos
    await expect(page.locator('text=Tìm trên Google')).toHaveText('Tìm trên Google')

})
