import { Page } from "@playwright/test";

export class BasePage {
    constructor(protected page: Page) { }

    async goto(path: string): Promise<void> {
        await this.page.goto(path);
    }


    async getTitle(): Promise<string> {
        return await this.page.title();
    }

}
