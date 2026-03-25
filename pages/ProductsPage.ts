import { BasePage } from "./BasePage";
import { Page, Locator } from "@playwright/test";

export class ProductsPage extends BasePage {
    private readonly title: Locator;
    private readonly shoppingCart: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator('.title');
        this.shoppingCart = page.locator('.shopping_cart_link');
    }

    async getTitle(): Promise<string> {
        return await this.title.textContent() || '';
    }

    async productLocator(productLocator: string): Promise<void> {
        await this.page.getByTestId(productLocator).click();
    }

    get shoppingCartBadge(): Locator {
        return this.shoppingCart;
    }

    async clickShoppingCart(): Promise<void> {
        await this.shoppingCart.click();
    }
}