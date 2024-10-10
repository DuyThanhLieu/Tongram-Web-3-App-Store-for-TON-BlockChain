import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://tongram.app/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Log In' }).click();
  const page1 = await page1Promise;
  await page1.locator('#login-phone').click();
  await page1.locator('#login-phone').fill('0343602871');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page.goto('https://tongram.app/');
  await page.getByRole('button', { name: 'Liêu Duy Thanh' }).click();
  await page.getByRole('button', { name: 'Earn' }).click();
  await page.getByRole('button', { name: 'Earn More' }).click();
  await page.getByText('+50App ExplorerOpen 1 different apps in a day0/').click();
});