import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";
import { ProductsPageTexts } from "../types/productsPage.enums";

test.describe("Verify filters for different users", () => {
  test.describe("should verify filters by standard user", () => {
    test.beforeEach(async ({ page, loginPage, productsPage }) => {
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

    test("sort A → Z", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("az");
      const names = await productsPage.getAllProductTitles().allTextContents();

      expect.soft(names).toEqual([...names].sort());
    });

    test("sort Z → A", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("za");
      const names = await productsPage.getAllProductTitles().allTextContents();

      expect.soft(names).toEqual([...names].sort().reverse());
    });

    test("price low → high", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("lohi");
      const prices = (
        await productsPage.getAllProductPrices().allTextContents()
      ).map((p) => parseFloat(p.replace("$", "")));

      expect.soft(prices).toEqual([...prices].sort((a, b) => a - b));
    });

    test("price high → low", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("hilo");
      const prices = (
        await productsPage.getAllProductPrices().allTextContents()
      ).map((p) => parseFloat(p.replace("$", "")));

      expect.soft(prices).toEqual([...prices].sort((a, b) => b - a));
    });
  });

  test.describe("should verify filters by problem user", () => {
    test.beforeEach(async ({ page, loginPage, productsPage }) => {
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

    test("sort A → Z", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("az");
      const names = await productsPage.getAllProductTitles().allTextContents();

      expect.soft(names).toEqual([...names].sort());
    });

    test("sort Z → A --> bug in app", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("za");
      const names = await productsPage.getAllProductTitles().allTextContents();

      expect.soft(names).toEqual([...names].sort().reverse());
    });

    test("price low → high --> bug in app", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("lohi");
      const prices = (
        await productsPage.getAllProductPrices().allTextContents()
      ).map((p) => parseFloat(p.replace("$", "")));

      expect.soft(prices).toEqual([...prices].sort((a, b) => a - b));
    });

    test("price high → low --> bug in app", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("hilo");
      const prices = (
        await productsPage.getAllProductPrices().allTextContents()
      ).map((p) => parseFloat(p.replace("$", "")));

      expect.soft(prices).toEqual([...prices].sort((a, b) => b - a));
    });
  });

  test.describe("should verify filters by error user", () => {
    test.beforeEach(async ({ page, loginPage, productsPage }) => {
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

    test("sort A → Z", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("az");
      const names = await productsPage.getAllProductTitles().allTextContents();

      expect.soft(names).toEqual([...names].sort());
    });

    test("sort Z → A --> bug in app", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("za");
      const names = await productsPage.getAllProductTitles().allTextContents();

      expect.soft(names).toEqual([...names].sort().reverse());
    });

    test("price low → high --> bug in app", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("lohi");
      const prices = (
        await productsPage.getAllProductPrices().allTextContents()
      ).map((p) => parseFloat(p.replace("$", "")));

      expect.soft(prices).toEqual([...prices].sort((a, b) => a - b));
    });

    test("price high → low --> bug in app", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("hilo");
      const prices = (
        await productsPage.getAllProductPrices().allTextContents()
      ).map((p) => parseFloat(p.replace("$", "")));

      expect.soft(prices).toEqual([...prices].sort((a, b) => b - a));
    });
  });

  test.describe("should verify filters by visual user", () => {
    test.beforeEach(async ({ page, loginPage, productsPage }) => {
      await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "");
      await loginPage.fillUserNameField(
        process.env.SAUCE_DEMO_VISUAL_USER ?? "",
      );
      await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD ?? "");
      await loginPage.clickOnLoginButton();

      await expect.soft(page).toHaveURL(/.*inventory/);
      await expect
        .soft(productsPage.primaryHeader)
        .toContainText(ProductsPageTexts.primaryHeader);
      await expect.soft(productsPage.hamburgerMenu).toBeVisible();
    });

    test("sort A → Z", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("az");
      const names = await productsPage.getAllProductTitles().allTextContents();

      expect.soft(names).toEqual([...names].sort());
    });

    test("sort Z → A", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("za");
      const names = await productsPage.getAllProductTitles().allTextContents();

      expect.soft(names).toEqual([...names].sort().reverse());
    });

    test("price low → high --> bug in app", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("lohi");
      const prices = (
        await productsPage.getAllProductPrices().allTextContents()
      ).map((p) => parseFloat(p.replace("$", "")));

      expect.soft(prices).toEqual([...prices].sort((a, b) => a - b));
    });

    test("price high → low --> bug in app", async ({ productsPage }) => {
      await productsPage.sortDropdown.selectOption("hilo");
      const prices = (
        await productsPage.getAllProductPrices().allTextContents()
      ).map((p) => parseFloat(p.replace("$", "")));

      expect.soft(prices).toEqual([...prices].sort((a, b) => b - a));
    });
  });
});
