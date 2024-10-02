const { test, expect } = require('@playwright/test')// lay cac tep trong thu muc nay 
// const { hello, helloworld } = require('./demo/hello');
// import { hello, helloworld } from './demo/hello';

// 
test('My first test ', async ({ page }) => {
    await page.goto('https://google.com');
    await expect(page).toHaveTitle('Google')
})
