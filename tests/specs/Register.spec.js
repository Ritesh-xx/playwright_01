
const { test } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');


test('Register new user ', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();

    const randomEmail = await registerPage.generateRandomEmail();

    await registerPage.fillRegistrationForm({
        firstName: 'Babu',
        lastName: 'Rao',
        email: randomEmail,
        phone: '9876543210',
        password: 'Babu@123',

    });

    await registerPage.submitForm();
    await registerPage.verifyCreateAccountHeader();

});
