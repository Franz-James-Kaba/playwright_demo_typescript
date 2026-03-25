import { BasePage } from "./BasePage";
import { Page, Locator } from "@playwright/test";

export class ProductsPage extends BasePage {
    private readonly title: Locator;
    private readonly backpack: Locator;
    private readonly bikeLight: Locator;
    private readonly boltTshirt: Locator;
    private readonly fleeceJacket: Locator;
    private readonly onesie: Locator;
    private readonly redTshirt: Locator;
    private readonly shoppingCart: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator('.title');
        this.backpack = page.getByTestId('add-to-cart-sauce-labs-backpack');
        this.bikeLight = page.getByTestId('add-to-cart-sauce-labs-bike-light');
        this.boltTshirt = page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt');
        this.fleeceJacket = page.getByTestId('add-to-cart-sauce-labs-fleece-jacket');
        this.onesie = page.getByTestId('add-to-cart-sauce-labs-onesie');
        this.redTshirt = page.getByTestId('add-to-cart-sauce-labs-red-t-shirt');
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