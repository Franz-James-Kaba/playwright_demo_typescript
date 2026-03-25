import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { validUsers } from "../data/users";

test.describe("Login Tests", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto("/");
    });

    test("Valid login", async ({ page }) => {
        await loginPage.login(validUsers[0]);
        await expect(page).toHaveTitle(/Swag Labs/);
    });
});
