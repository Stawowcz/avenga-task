import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProductsPage } from "../pages/product.page";
import {
  ProductsPageTexts,
  ProductsCartIds,
} from "../types/productsPage.enums";

test.describe("Verify Add/Remove from card", () => {
  test("should verify if adding and removing from cart - standard user", async ({
    page,
  }) => {
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
    await expect.soft(productsPage.shoppingCartLink).toBeVisible();
    await expect(productsPage.shopingCartContainer).not.toContainClass(
      "visual_failure",
    );

    for (const productId of Object.values(ProductsCartIds)) {
      const addBtn = productsPage.getAddToCartButton(productId);
      const removeBtn = productsPage.getRemoveFromCartButton(productId);
      const cartBadge = productsPage.getCartBadge();

      await addBtn.click();

      await cartBadge.waitFor({ state: "visible", timeout: 1000 });
      const badgeText = await cartBadge.textContent();
      expect.soft(badgeText).toBe("1");

      const isRemoveVisible = await removeBtn.isVisible();
      expect.soft(isRemoveVisible).toBe(true);

      if (isRemoveVisible) {
        await removeBtn.click();
        const isBadgeVisible = await cartBadge.isVisible();
        expect.soft(isBadgeVisible).toBe(false);
        const isAddBack = await addBtn.isVisible();
        expect.soft(isAddBack).toBe(true);
      }
    }
  });

  test("should verify adding and removing from cart - problem user --> bug in app", async ({
    page,
  }) => {
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
    await expect.soft(productsPage.shoppingCartLink).toBeVisible();
    await expect(productsPage.shopingCartContainer).not.toContainClass(
      "visual_failure",
    );

    for (const productId of Object.values(ProductsCartIds)) {
      const addBtn = productsPage.getAddToCartButton(productId);
      const removeBtn = productsPage.getRemoveFromCartButton(productId);
      const cartBadge = productsPage.getCartBadge();

      await addBtn.click();

      await cartBadge.waitFor({ state: "visible", timeout: 1000 });
      const badgeText = await cartBadge.textContent();
      expect.soft(badgeText).toBe("1");

      const isRemoveVisible = await removeBtn.isVisible();
      expect.soft(isRemoveVisible).toBe(true);

      if (isRemoveVisible) {
        await removeBtn.click();
        const isBadgeVisible = await cartBadge.isVisible();
        expect.soft(isBadgeVisible).toBe(false);
        const isAddBack = await addBtn.isVisible();
        expect.soft(isAddBack).toBe(true);
      }
    }
  });

  test("should verify adding and removing from cart - error user --> bug in app", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "");

    await loginPage.fillUserNameField(process.env.SAUCE_DEMO_ERROR_USER ?? "");
    await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD ?? "");
    await loginPage.clickOnLoginButton();

    await expect.soft(page).toHaveURL(/.*inventory/);
    await expect
      .soft(productsPage.primaryHeader)
      .toContainText(ProductsPageTexts.primaryHeader);
    await expect.soft(productsPage.hamburgerMenu).toBeVisible();
    await expect.soft(productsPage.shoppingCartLink).toBeVisible();
    await expect(productsPage.shopingCartContainer).not.toContainClass(
      "visual_failure",
    );

    for (const productId of Object.values(ProductsCartIds)) {
      const addBtn = productsPage.getAddToCartButton(productId);
      const removeBtn = productsPage.getRemoveFromCartButton(productId);
      const cartBadge = productsPage.getCartBadge();

      await addBtn.click();

      await cartBadge.waitFor({ state: "visible", timeout: 1000 });
      const badgeText = await cartBadge.textContent();
      expect.soft(badgeText).toBe("1");

      const isRemoveVisible = await removeBtn.isVisible();
      expect.soft(isRemoveVisible).toBe(true);

      if (isRemoveVisible) {
        await removeBtn.click();
        const isBadgeVisible = await cartBadge.isVisible();
        expect.soft(isBadgeVisible).toBe(false);
        const isAddBack = await addBtn.isVisible();
        expect.soft(isAddBack).toBe(true);
      }
    }
  });

  test("should verify adding and removing from cart - visual user --> bug in app basket is moved", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "");

    await loginPage.fillUserNameField(process.env.SAUCE_DEMO_VISUAL_USER ?? "");
    await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD ?? "");
    await loginPage.clickOnLoginButton();

    await expect.soft(page).toHaveURL(/.*inventory/);
    await expect
      .soft(productsPage.primaryHeader)
      .toContainText(ProductsPageTexts.primaryHeader);
    await expect.soft(productsPage.hamburgerMenu).toBeVisible();
    await expect.soft(productsPage.shoppingCartLink).toBeVisible();
    await expect(productsPage.shopingCartContainer).not.toContainClass(
      "visual_failure",
    );

    for (const productId of Object.values(ProductsCartIds)) {
      const addBtn = productsPage.getAddToCartButton(productId);
      const removeBtn = productsPage.getRemoveFromCartButton(productId);
      const cartBadge = productsPage.getCartBadge();

      await addBtn.click();

      await cartBadge.waitFor({ state: "visible", timeout: 1000 });
      const badgeText = await cartBadge.textContent();
      expect.soft(badgeText).toBe("1");

      const isRemoveVisible = await removeBtn.isVisible();
      expect.soft(isRemoveVisible).toBe(true);

      if (isRemoveVisible) {
        await removeBtn.click();
        const isBadgeVisible = await cartBadge.isVisible();
        expect.soft(isBadgeVisible).toBe(false);
        const isAddBack = await addBtn.isVisible();
        expect.soft(isAddBack).toBe(true);
      }
    }
  });
});
