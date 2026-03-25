import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../pages/LoginPage';
import { validUsers } from '../data/users';

test.describe('Accessibility Tests', () => {
    test('Login page should have no accessibility violations', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto('/');

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']) // WCAG standards to check
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Products page should have no accessibility violations', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto('/');
        await loginPage.login(validUsers[0]);

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa'])
            .analyze();

        // Log violations to console for visibility
        if (accessibilityScanResults.violations.length > 0) {
            console.log('Accessibility violations found:');
            accessibilityScanResults.violations.forEach(violation => {
                console.log(`- [${violation.impact}] ${violation.description}`);
                console.log(`  Help: ${violation.helpUrl}`);
            });
        }

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Login page accessibility - excluding known issues', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto('/');

        const accessibilityScanResults = await new AxeBuilder({ page })
            .exclude('#known-broken-element')  // Exclude specific elements if needed
            .disableRules(['color-contrast'])   // Disable specific rules if needed
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
