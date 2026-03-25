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
        this.title = page.getByTestId('title');
        this.backpack = page.getByTestId('add-to-cart-sauce-labs-backpack');
        this.bikeLight = page.getByTestId('add-to-cart-sauce-labs-bike-light');
        this.boltTshirt = page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt');
        this.fleeceJacket = page.getByTestId('add-to-cart-sauce-labs-fleece-jacket');
        this.onesie = page.getByTestId('add-to-cart-sauce-labs-onesie');
        this.redTshirt = page.getByTestId('add-to-cart-sauce-labs-red-t-shirt');
        this.shoppingCart = page.getByTestId('shopping_cart_link');
    }

    async getTitle(): Promise<string> {
        return await this.title.textContent() || '';
    }

    async addToCart(product: string): Promise<void> {
        switch (product) {
            case 'Sauce Labs Backpack':
                await this.backpack.click();
                break;
            case 'Sauce Labs Bike Light':
                await this.bikeLight.click();
                break;
            case 'Sauce Labs Bolt T-Shirt':
                await this.boltTshirt.click();
                break;
            case 'Sauce Labs Fleece Jacket':
                await this.fleeceJacket.click();
                break;
            case 'Sauce Labs Onesie':
                await this.onesie.click();
                break;
            case 'Sauce Labs Red T-Shirt':
                await this.redTshirt.click();
                break;
            default:
                throw new Error(`Product ${product} not found`);
        }
    }

    get shoppingCartBadge(): Locator {
        return this.shoppingCart;
    }

    async clickShoppingCart(): Promise<void> {
        await this.shoppingCart.click();
    }
}