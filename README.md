# Playwright Demo — TypeScript

A structured, end-to-end test automation framework built with [Playwright](https://playwright.dev/) and TypeScript. This project targets the [Sauce Demo](https://www.saucedemo.com/) web application and demonstrates industry best practices including the **Page Object Model (POM)**, **TypeScript interfaces** for type safety, and **external data files** for test inputs.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Pages](#pages)
- [Test Suites](#test-suites)
- [Test Data](#test-data)
- [Configuration](#configuration)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Viewing Reports](#viewing-reports)

---

## Overview

| Property       | Value                                  |
|----------------|----------------------------------------|
| **Framework**  | [Playwright](https://playwright.dev/) v1.58+ |
| **Language**   | TypeScript                             |
| **Target App** | [https://www.saucedemo.com/](https://www.saucedemo.com/) |
| **Browser**    | Chromium (Desktop Chrome)              |
| **Reporter**   | HTML                                   |

---

## Project Structure

```
playwright-demo-typescript/
│
├── data/
│   └── users.ts              # External test data: valid and invalid user credentials
│
├── interfaces/
│   └── IUser.ts              # TypeScript interface defining the User shape
│
├── pages/
│   ├── BasePage.ts           # Base class with shared page actions (goto, getTitle)
│   ├── LoginPage.ts          # Page Object for the Login page
│   └── ProductsPage.ts       # Page Object for the Products/Inventory page
│
├── tests/
│   ├── login.spec.ts         # Test suite for login functionality
│   └── products.spec.ts      # Test suite for product and cart functionality
│
├── playwright.config.ts      # Playwright configuration (baseURL, browser, reporter, etc.)
├── package.json              # Project metadata and dependencies
└── README.md                 # This file
```

---

## Architecture & Design Patterns

### 1. Page Object Model (POM)

All UI interactions are abstracted into dedicated **Page classes** inside the `pages/` directory. Tests never interact with raw Playwright locators directly — they call methods on page objects. This keeps tests readable, short, and easy to maintain.

```
Test File  →  Page Object  →  Playwright Locator
```

### 2. Inheritance via BasePage

`BasePage` is the root class that all page objects extend. It holds the shared `page` instance and provides common utility methods (`goto`, `getTitle`). This avoids code duplication and enforces a consistent structure.

```
BasePage
├── LoginPage
└── ProductsPage
```

### 3. TypeScript Interfaces

The `IUser` interface in `interfaces/IUser.ts` defines the contract for user credential objects. This enforces type safety across all test data and page methods that handle login, preventing runtime errors from mismatched data shapes.

### 4. External Test Data

Test credentials are stored in `data/users.ts` rather than hard-coded inside tests. This makes it trivial to add new test scenarios (e.g., additional user roles, edge cases) without modifying test logic.

### 5. Encapsulation with Private Locators & Public Getters

All locators in page objects are declared `private readonly` to prevent direct external access. Where assertions are needed in tests, `public` getter methods expose the locator in a controlled way (e.g., `shoppingCartBadge` in `ProductsPage`).

---

## Pages

### `BasePage.ts`
The abstract base class for all page objects.

| Method | Description |
|---|---|
| `goto(path: string)` | Navigates to a relative URL path |
| `getTitle()` | Returns the current page title |

---

### `LoginPage.ts`
Handles all interactions on the Sauce Demo login screen (`/`).

| Method | Description |
|---|---|
| `fillUsername(username)` | Types into the username field |
| `fillPassword(password)` | Types into the password field |
| `clickLogin()` | Clicks the Login button |
| `login(user: IUser)` | Convenience method: fills credentials and submits |

---

### `ProductsPage.ts`
Handles all interactions on the inventory/products page (`/inventory.html`).

| Method / Getter | Description |
|---|---|
| `getTitle()` | Returns the `.title` text of the products page |
| `addToCart(product: string)` | Clicks the "Add to Cart" button for the named product |
| `clickShoppingCart()` | Clicks the shopping cart icon |
| `shoppingCartBadge` *(getter)* | Returns the shopping cart badge locator for assertions |

**Supported product names for `addToCart()`:**
- `Sauce Labs Backpack`
- `Sauce Labs Bike Light`
- `Sauce Labs Bolt T-Shirt`
- `Sauce Labs Fleece Jacket`
- `Sauce Labs Onesie`
- `Sauce Labs Red T-Shirt`

---

## Test Suites

### `login.spec.ts` — Login Tests

| Test | Description |
|---|---|
| **Valid login** | Logs in with a standard valid user and asserts the page title is "Swag Labs" |

---

### `products.spec.ts` — Products Page Tests

> **Before Each:** Logs in with `validUsers[0]` (standard_user) before every test.

| Test | Description |
|---|---|
| **Verify products page title** | Asserts the browser tab title matches `/Swag Labs/` |
| **Verify products can be added to cart** | Adds "Sauce Labs Backpack" to the cart, asserts the cart badge shows `1`, then navigates to the cart |

---

## Test Data

Defined in `data/users.ts`, typed against the `IUser` interface (`{ username: string; password: string }`).

| Export | Username | Password | Notes |
|---|---|---|---|
| `validUsers[0]` | `standard_user` | `secret_sauce` | Standard authenticated user |
| `invalidUsers[0]` | `locked_out_user` | `secret_sauce` | Simulates a locked/blocked account |

---

## Configuration

`playwright.config.ts` centralises all framework settings:

| Setting | Value | Notes |
|---|---|---|
| `testDir` | `./tests` | Where Playwright discovers spec files |
| `baseURL` | `https://www.saucedemo.com/` | Prepended to all `goto()` paths |
| `headless` | `false` | Runs browser in headed mode (visible) |
| `fullyParallel` | `true` | All tests run in parallel by default |
| `retries` | `2` (CI) / `0` (local) | Automatic retries on CI |
| `workers` | `1` (CI) / auto (local) | Worker count |
| `reporter` | `html` | Generates an interactive HTML report |
| `trace` | `on-first-retry` | Captures trace on first retry |
| `screenshot` | `only-on-failure` | Captures screenshots on failure |
| `video` | `retain-on-failure` | Retains video recordings on failure |
| `projects` | Chromium (Desktop Chrome) | Currently runs on Chrome only |

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** v8 or higher

---

## Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd playwright-demo-typescript

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/login.spec.ts
npx playwright test tests/products.spec.ts

# Run tests in headed mode (browser visible)
npx playwright test --headed

# Run with a specific browser
npx playwright test --project=chromium

# Run in debug mode (Playwright Inspector)
npx playwright test --debug
```

---

## Viewing Reports

After a test run, Playwright generates an HTML report:

```bash
npx playwright show-report
```

This opens an interactive report in your browser showing passed/failed tests, traces, screenshots, and video recordings for any failures.
