import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProductsPage } from "../pages/product.page";
import { ProductsPageTexts } from "../types/productsPage.enums";
import { AboutPage } from "../pages/about.page";
import { ProductsCartIds } from "../types/productsPage.enums";

test.describe("Navigation - burger menu scenarios for different user", () => {
  test.describe("Navigation - burger menu scenarios - standard user", () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "");
      await loginPage.fillUserNameField(
        process.env.SAUCE_DEMO_STANDARD_USER ?? "",
      );
      await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD ?? "");
      await loginPage.clickOnLoginButton();

      await expect.soft(page).toHaveURL(/.*inventory/);
      await expect
        .soft(productsPage.primaryHeader)
        .toContainText(ProductsPageTexts.primaryHeader);
      await expect.soft(productsPage.hamburgerMenu).toBeVisible();
    });

    test("should clicking 'About' navigates to Saucelabs in same tab - standard user", async ({
      page,
    }) => {
      const productsPage = new ProductsPage(page);
      const aboutPage = new AboutPage(page);

      await productsPage.openMenu();
      await expect.soft(productsPage.menuAboutLink).toBeVisible();
      await productsPage.clickAbout();

      await page.waitForLoadState();
      await expect.soft(page).toHaveURL(/saucelabs\.com/);
      await expect.soft(aboutPage.sauceLabHeader).toBeVisible();
    });

    test("should clicking 'Logout' returns to login page - standard user", async ({
      page,
    }) => {
      const productsPage = new ProductsPage(page);

      await productsPage.openMenu();
      await expect.soft(productsPage.menuLogoutLink).toBeVisible();
      await productsPage.clickLogout();

      await expect.soft(page).toHaveURL(process.env.SAUCE_DEMO_BASEURL ?? "");
    });
  });

  test.describe("Navigation - burger menu scenarios - problem user", () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "");
      await loginPage.fillUserNameField(
        process.env.SAUCE_DEMO_PROBLEM_USER ?? "",
      );
      await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD ?? "");
      await loginPage.clickOnLoginButton();

      await expect.soft(page).toHaveURL(/.*inventory/);
      await expect
        .soft(productsPage.primaryHeader)
        .toContainText(ProductsPageTexts.primaryHeader);
      await expect.soft(productsPage.hamburgerMenu).toBeVisible();
    });

    test("should clicking 'About' navigates to Saucelabs in same tab - problem user --> here is 404 bug in app", async ({
      page,
    }) => {
      const productsPage = new ProductsPage(page);
      const aboutPage = new AboutPage(page);

      await productsPage.openMenu();
      await expect.soft(productsPage.menuAboutLink).toBeVisible();
      await productsPage.clickAbout();

      await page.waitForLoadState();
      await expect.soft(page).toHaveURL(/saucelabs\.com/);
      await expect.soft(aboutPage.sauceLabHeader).toBeVisible();
    });

    test("should clicking 'Logout' returns to login page - problem user", async ({
      page,
    }) => {
      const productsPage = new ProductsPage(page);

      await productsPage.openMenu();
      await expect.soft(productsPage.menuLogoutLink).toBeVisible();
      await productsPage.clickLogout();

      await expect.soft(page).toHaveURL(process.env.SAUCE_DEMO_BASEURL ?? "");
    });
  });

  test.describe("Navigation - burger menu scenarios - error user", () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "");
      await loginPage.fillUserNameField(
        process.env.SAUCE_DEMO_ERROR_USER ?? "",
      );
      await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD ?? "");
      await loginPage.clickOnLoginButton();

      await expect.soft(page).toHaveURL(/.*inventory/);
      await expect
        .soft(productsPage.primaryHeader)
        .toContainText(ProductsPageTexts.primaryHeader);
      await expect.soft(productsPage.hamburgerMenu).toBeVisible();
    });

    test("should clicking 'About' navigates to Saucelabs in same tab - error user", async ({
      page,
    }) => {
      const productsPage = new ProductsPage(page);
      const aboutPage = new AboutPage(page);

      await productsPage.openMenu();
      await expect.soft(productsPage.menuAboutLink).toBeVisible();
      await productsPage.clickAbout();

      await page.waitForLoadState();
      await expect.soft(page).toHaveURL(/saucelabs\.com/);
      await expect.soft(aboutPage.sauceLabHeader).toBeVisible();
    });

    test("should clicking 'Logout' returns to login page - error user", async ({
      page,
    }) => {
      const productsPage = new ProductsPage(page);

      await productsPage.openMenu();
      await expect.soft(productsPage.menuLogoutLink).toBeVisible();
      await productsPage.clickLogout();

      await expect.soft(page).toHaveURL(process.env.SAUCE_DEMO_BASEURL ?? "");
    });
  });

  test.describe("Navigation - burger menu reset app state scenario - standard user --> here is bug in app", () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "");
      await loginPage.fillUserNameField(
        process.env.SAUCE_DEMO_STANDARD_USER ?? "",
      );
      await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD ?? "");
      await loginPage.clickOnLoginButton();

      await expect.soft(page).toHaveURL(/.*inventory/);
      await expect
        .soft(productsPage.primaryHeader)
        .toContainText(ProductsPageTexts.primaryHeader);
      await expect.soft(productsPage.hamburgerMenu).toBeVisible();
    });

    test("should reset cart, filters and buttons - standard user", async ({
      page,
    }) => {
      const productsPage = new ProductsPage(page);

      await productsPage.addProductToCart(ProductsCartIds.SauceLabsBackpack);
      await productsPage.addProductToCart(ProductsCartIds.SauceLabsBikeLight);

      const badge = await productsPage.waitForCartBadge();
      await expect.soft(badge).toHaveText("2");

      await productsPage.sortDropdown.selectOption("za");
      const names = await productsPage.getAllProductTitles().allTextContents();
      expect(names).toEqual([...names].sort().reverse());

      await expect.soft(productsPage.sortDropdown).toHaveValue("za");

      const removeBtnBp = productsPage.getRemoveFromCartButton(
        ProductsCartIds.SauceLabsBackpack,
      );
      const removeBtnBl = productsPage.getRemoveFromCartButton(
        ProductsCartIds.SauceLabsBikeLight,
      );

      const isRemoveVisibleBp = await removeBtnBp.isVisible();
      const isRemoveVisibleBl = await removeBtnBl.isVisible();
      expect.soft(isRemoveVisibleBp).toBe(true);
      expect.soft(isRemoveVisibleBl).toBe(true);

      await productsPage.openMenu();
      await expect.soft(productsPage.resetAppButton).toBeVisible();
      await productsPage.clickResetApp();

      await expect.soft(badge).not.toBeVisible();

      const addToCartBp = productsPage.getAddToCartButton(
        ProductsCartIds.SauceLabsBackpack,
      );
      const addToCartBl = productsPage.getAddToCartButton(
        ProductsCartIds.SauceLabsBikeLight,
      );
      const isAddToCartVisibleBp = await addToCartBp.isVisible();
      const isAddToCartVisibleBl = await addToCartBl.isVisible();

      expect.soft(isAddToCartVisibleBp).toBe(true);
      expect.soft(isAddToCartVisibleBl).toBe(true);
      expect.soft(isRemoveVisibleBp).toBe(false);
      expect.soft(isRemoveVisibleBl).toBe(false);

      await expect.soft(productsPage.sortDropdown).toHaveValue("az");
    });
  });

  test.describe("Navigation - burger menu reset app state scenario - problem user --> here si bug in app", () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);

      await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "");
      await loginPage.fillUserNameField(
        process.env.SAUCE_DEMO_PROBLEM_USER ?? "",
      );
      await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD ?? "");
      await loginPage.clickOnLoginButton();

      await expect.soft(page).toHaveURL(/.*inventory/);
      await expect
        .soft(productsPage.primaryHeader)
        .toContainText(ProductsPageTexts.primaryHeader);
      await expect.soft(productsPage.hamburgerMenu).toBeVisible();
    });

    test("should reset cart, filters and buttons - problem user", async ({
      page,
    }) => {
      const productsPage = new ProductsPage(page);

      await productsPage.addProductToCart(ProductsCartIds.SauceLabsBackpack);
      await productsPage.addProductToCart(ProductsCartIds.SauceLabsBikeLight);

      const badge = await productsPage.waitForCartBadge();
      await expect.soft(badge).toHaveText("2");

      await productsPage.sortDropdown.selectOption("za");
      const names = await productsPage.getAllProductTitles().allTextContents();
      expect(names).toEqual([...names].sort().reverse());

      await expect.soft(productsPage.sortDropdown).toHaveValue("za");

      const removeBtnBp = productsPage.getRemoveFromCartButton(
        ProductsCartIds.SauceLabsBackpack,
      );
      const removeBtnBl = productsPage.getRemoveFromCartButton(
        ProductsCartIds.SauceLabsBikeLight,
      );

      const isRemoveVisibleBp = await removeBtnBp.isVisible();
      const isRemoveVisibleBl = await removeBtnBl.isVisible();
      expect.soft(isRemoveVisibleBp).toBe(true);
      expect.soft(isRemoveVisibleBl).toBe(true);

      await productsPage.openMenu();
      await expect.soft(productsPage.resetAppButton).toBeVisible();
      await productsPage.clickResetApp();

      await expect.soft(badge).not.toBeVisible();

      const addToCartBp = productsPage.getAddToCartButton(
        ProductsCartIds.SauceLabsBackpack,
      );
      const addToCartBl = productsPage.getAddToCartButton(
        ProductsCartIds.SauceLabsBikeLight,
      );
      const isAddToCartVisibleBp = await addToCartBp.isVisible();
      const isAddToCartVisibleBl = await addToCartBl.isVisible();

      expect.soft(isAddToCartVisibleBp).toBe(true);
      expect.soft(isAddToCartVisibleBl).toBe(true);
      expect.soft(isRemoveVisibleBp).toBe(false);
      expect.soft(isRemoveVisibleBl).toBe(false);

      await expect.soft(productsPage.sortDropdown).toHaveValue("az");
    });
  });
});
