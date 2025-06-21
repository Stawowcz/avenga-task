import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";
import {
  ProductsPageTexts,
  ProductsImages,
  ProductsNames,
} from "../types/productsPage.enums";

test.describe("Verify proper immage loading for different users", () => {
  test("SHould verify correct images loading on product page - standard user", async ({
    page,
    loginPage,
    productsPage,
  }) => {
    await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "<unknown>");
    await loginPage.fillUserNameField(process.env.SAUCE_DEMO_STANDARD_USER!);
    await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD!);
    await loginPage.clickOnLoginButton();

    await expect.soft(page).toHaveURL(/.*inventory/);
    await expect.soft(productsPage.title).toHaveText(ProductsPageTexts.title);
    await expect
      .soft(productsPage.primaryHeader)
      .toContainText(ProductsPageTexts.primaryHeader);
    await expect.soft(productsPage.hamburgerMenu).toBeVisible();
    await expect.soft(productsPage.shoppingCartLink).toBeVisible();

    const expectedImages = {
      [ProductsNames.SauceLabsBackpack]: ProductsImages.SauceLabsBackpack,
      [ProductsNames.SauceLabsBikeLight]: ProductsImages.SauceLabsBikeLight,
      [ProductsNames.SauceLabsBoltTShirt]: ProductsImages.SauceLabsBoltTShirt,
      [ProductsNames.SauceLabsFleeceJacket]:
        ProductsImages.SauceLabsFleeceJacket,
      [ProductsNames.SauceLabsOnesie]: ProductsImages.SauceLabsOnesie,
      [ProductsNames.TestAllTheThingsTShirtRed]:
        ProductsImages.TestAllTheThingsTShirtRed,
    };

    for (const [productName, expectedSrc] of Object.entries(expectedImages)) {
      const actualSrc = await productsPage
        .getProductImageByAltText(productName)
        .getAttribute("src");

      expect.soft(actualSrc).toContain(expectedSrc);
    }
  });

  test("should verify correct images loading on product page - problem user --> bug in app dogs", async ({
    page,
    loginPage,
    productsPage,
  }) => {
    await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "<unknown>");
    await loginPage.fillUserNameField(
      process.env.SAUCE_DEMO_PROBLEM_USER ?? "<unknown>",
    );
    await loginPage.fillPasswordField(
      process.env.SAUCE_DEMO_PASSWORD ?? "<unknown>",
    );
    await loginPage.clickOnLoginButton();

    await expect.soft(page).toHaveURL(/.*inventory/);
    await expect.soft(productsPage.title).toHaveText(ProductsPageTexts.title);
    await expect
      .soft(productsPage.primaryHeader)
      .toContainText(ProductsPageTexts.primaryHeader);
    await expect.soft(productsPage.hamburgerMenu).toBeVisible();
    await expect.soft(productsPage.shoppingCartLink).toBeVisible();

    const expectedImages = {
      [ProductsNames.SauceLabsBackpack]: ProductsImages.SauceLabsBackpack,
      [ProductsNames.SauceLabsBikeLight]: ProductsImages.SauceLabsBikeLight,
      [ProductsNames.SauceLabsBoltTShirt]: ProductsImages.SauceLabsBoltTShirt,
      [ProductsNames.SauceLabsFleeceJacket]:
        ProductsImages.SauceLabsFleeceJacket,
      [ProductsNames.SauceLabsOnesie]: ProductsImages.SauceLabsOnesie,
      [ProductsNames.TestAllTheThingsTShirtRed]:
        ProductsImages.TestAllTheThingsTShirtRed,
    };

    for (const [productName, expectedSrc] of Object.entries(expectedImages)) {
      const actualSrc = await productsPage
        .getProductImageByAltText(productName)
        .getAttribute("src");

      expect.soft(actualSrc).toContain(expectedSrc);
    }
  });

  test("should verify correct images loading on product page - visual user --> bug in app dog", async ({
    page,
    loginPage,
    productsPage,
  }) => {
    await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "<unknown>");
    await loginPage.fillUserNameField(process.env.SAUCE_DEMO_VISUAL_USER!);
    await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD!);
    await loginPage.clickOnLoginButton();

    await expect.soft(page).toHaveURL(/.*inventory/);
    await expect.soft(productsPage.title).toHaveText(ProductsPageTexts.title);
    await expect
      .soft(productsPage.primaryHeader)
      .toContainText(ProductsPageTexts.primaryHeader);
    await expect.soft(productsPage.hamburgerMenu).toBeVisible();
    await expect.soft(productsPage.shoppingCartLink).toBeVisible();

    const expectedImages = {
      [ProductsNames.SauceLabsBackpack]: ProductsImages.SauceLabsBackpack,
      [ProductsNames.SauceLabsBikeLight]: ProductsImages.SauceLabsBikeLight,
      [ProductsNames.SauceLabsBoltTShirt]: ProductsImages.SauceLabsBoltTShirt,
      [ProductsNames.SauceLabsFleeceJacket]:
        ProductsImages.SauceLabsFleeceJacket,
      [ProductsNames.SauceLabsOnesie]: ProductsImages.SauceLabsOnesie,
      [ProductsNames.TestAllTheThingsTShirtRed]:
        ProductsImages.TestAllTheThingsTShirtRed,
    };

    for (const [productName, expectedSrc] of Object.entries(expectedImages)) {
      const actualSrc = await productsPage
        .getProductImageByAltText(productName)
        .getAttribute("src");

      expect.soft(actualSrc).toContain(expectedSrc);
    }
  });
});
