const { test,expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.bookStoreHeader = page.getByText('Book Store',{ exact: true });
    this.searchBox = page.locator('input[placeholder="Type to search"]');
    this.loginButton = page.locator('#login');
    this.firstBookTitle = page.locator('.rt-tbody .rt-tr-group .rt-td a').first();
  }

  async navigate() {
    await this.page.goto('https://demoqa.com/books',{ waitUntil: 'load' });
  }

  async searchForBook(bookTitle) {
    await this.searchBox.fill(bookTitle);
    await this.page.keyboard.press('Enter');
  }
}

module.exports = { HomePage };
