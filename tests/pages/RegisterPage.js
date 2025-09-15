
const { expect } = require('@playwright/test');

class RegisterPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name'); // getByPlaceholder
        this.lastNameInput = page.getByPlaceholder('Last Name'); // getByPlaceholder
        this.emailInput = page.getByRole('textbox', { name: 'email@example.com' }); // getByRole
        this.phoneInput = page.getByRole('textbox', { name: 'enter your number' }); // getByRole
        this.occupationDropdown = page.locator('body > app-root > app-register > div.banner > section:nth-child(2) > div > div.login-wrapper.my-auto.p-5 > form > div:nth-child(3) > div:nth-child(1) > select');
        this.genderRadio = page.getByRole('radio', { name: 'Female' }); // getByRole
        this.passwordInput = page.locator('input[formcontrolname="userPassword"]'); // locator
        this.confirmPasswordInput = page.locator('input[formcontrolname="confirmPassword"]'); // locator
        this.termsCheckbox = page.getByRole('checkbox'); // getByRole
        this.registerButton = page.getByRole('button', { name: 'Register' }); // getByRole
        this.createAccountHeader = page.getByText('Account Created Successfully'); // getByText
    }

    async goto() {
        await this.page.goto('https://rahulshettyacademy.com/client');
        await this.page.getByRole('link', { name: 'Register' }).click();
    }

    async generateRandomEmail() {
        const timestamp = Date.now();
        return `user${timestamp}@example.com`;
    }


    async fillRegistrationForm({ firstName, lastName, email, phone, password }) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
        await this.occupationDropdown.selectOption('3: Engineer');
        await this.genderRadio.check();
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.termsCheckbox.check();
    }

    async submitForm() {
        await this.registerButton.click();
    }

    async verifyCreateAccountHeader() {
        await expect(this.createAccountHeader).toBeVisible();
    }
}

module.exports = { RegisterPage };
