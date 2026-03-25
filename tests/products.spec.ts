import {test, expect} from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";
import { LoginPage } from "../pages/LoginPage";
import { validUsers } from "../data/users";

test.describe("Products Page Tests", () => {
    let productsPage: ProductsPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        productsPage = new ProductsPage(page);
        loginPage = new LoginPage(page);
        await loginPage.goto("/");
        await loginPage.login(validUsers[0]);
    });

    test("Verify products page title", async ({ page }) => {
        await expect(page).toHaveTitle(/Swag Labs/);
    });

    test("Verify products can be added to cart", async({page}) => {
        await productsPage.productLocator ("add-to-cart-sauce-labs-backpack");
        await expect(productsPage.shoppingCartBadge).toHaveText("1");
        await productsPage.clickShoppingCart();
        await expect(page.getByTestId("inventory-item-name")).toHaveText("Sauce Labs Backpack");
        await expect(page).toHaveTitle(/Swag Labs/);
    })
});