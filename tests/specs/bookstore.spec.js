const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');


test('testing pages', async ({ page }) => {
    const homePage = new HomePage(page);


    await homePage.navigate();

    await expect(homePage.bookStoreHeader).toBeVisible();

    await homePage.searchForBook('Understanding ECMAScript 6');

    await expect(homePage.firstBookTitle).toHaveText('Understanding ECMAScript 6');

    await homePage.firstBookTitle.click();

    await expect(page).toHaveURL('https://demoqa.com/books?book=9781593277574');

    await page.waitForTimeout(9000);

    await page.screenshot({ path: 'book-detail.png', fullPage: true });
});
