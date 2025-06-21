import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";
import { ProductsCartIds, ProductsNames } from "../types/productsPage.enums";
import { CheckoutFormData } from "../types/userData";
import { generateCheckoutData } from "../utils/testData";
import { CartPageTexts } from "../types/cartPage.enums";
import { CheckoutPageTexts } from "../types/checkoutPage.enum";
import { ProductsPageTexts } from "../types/productsPage.enums";
import { PricingUtils } from "../utils/pricing.utils";

test.describe("Checkout flow – standard_user", () => {
  test.beforeEach(async ({ page, loginPage, productsPage }) => {
    await loginPage.goto(process.env.SAUCE_DEMO_BASEURL!);
    await loginPage.fillUserNameField(process.env.SAUCE_DEMO_STANDARD_USER!);
    await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD!);
    await loginPage.clickOnLoginButton();

    await expect.soft(page).toHaveURL(/.*inventory/);
    await expect
      .soft(productsPage.primaryHeader)
      .toContainText(ProductsPageTexts.primaryHeader);
    await expect.soft(productsPage.hamburgerMenu).toBeVisible();
  });

  test("should add 2 items and complete checkout successfully", async ({
    page,
    productsPage,
    checkoutPage,
    cartPage,
  }) => {
    await productsPage.addProductToCart(ProductsCartIds.SauceLabsBackpack);
    await productsPage.addProductToCart(ProductsCartIds.SauceLabsBikeLight);
    const badge = await productsPage.waitForCartBadge();

    await expect.soft(badge).toHaveText("2");

    const inventoryPriceBP = await productsPage.getProductPriceFromInventory(
      ProductsNames.SauceLabsBackpack,
    );
    const inventoryPriceBL = await productsPage.getProductPriceFromInventory(
      ProductsNames.SauceLabsBikeLight,
    );
    const expectedTotal = inventoryPriceBP + inventoryPriceBL;

    await productsPage.clickOnCartBasket();

    await expect.soft(page).toHaveURL(/.*cart/);
    await expect
      .soft(cartPage.header)
      .toHaveText(CartPageTexts.secondaryHeader);
    expect.soft(await cartPage.getCartItemsCount()).toBe(2);

    const cartPriceBP = await cartPage.getProductPriceFromCart(
      ProductsNames.SauceLabsBackpack,
    );
    const cartPriceBL = await cartPage.getProductPriceFromCart(
      ProductsNames.SauceLabsBikeLight,
    );

    expect.soft(cartPriceBP).toBeCloseTo(inventoryPriceBP, 2);
    expect.soft(cartPriceBL).toBeCloseTo(inventoryPriceBL, 2);

    await cartPage.clickCheckout();

    await expect.soft(page).toHaveURL(/.*checkout-step-one/);
    await expect
      .soft(checkoutPage.header)
      .toHaveText(CheckoutPageTexts.secondaryHeader);

    const formData: CheckoutFormData = generateCheckoutData();
    await checkoutPage.fillInfo(formData);
    await checkoutPage.clickContinue();

    await expect.soft(page).toHaveURL(/.*checkout-step-two/);
    await expect
      .soft(checkoutPage.header)
      .toHaveText(CheckoutPageTexts.secondaryHeader2ndStep);

    const subtotalPrice = await checkoutPage.getSubtotalPrice();
    const displayedTax = await checkoutPage.getTax();
    const displayedTotal = await checkoutPage.getTotalPrice();

    const expectedTax = PricingUtils.calculateTax(expectedTotal);
    const expectedTotalWithTax =
      PricingUtils.calculateTotalWithTax(expectedTotal);

    expect.soft(subtotalPrice).toBeCloseTo(expectedTotal, 2);
    expect.soft(displayedTax).toBeCloseTo(expectedTax, 2);
    expect.soft(displayedTotal).toBeCloseTo(expectedTotalWithTax, 2);
    expect.soft(await checkoutPage.getOverviewItemsCount()).toBe(2);

    await checkoutPage.clickFinish();
    await checkoutPage.completeHeader.waitFor({ state: "visible" });

    await expect
      .soft(checkoutPage.completeHeader)
      .toContainText(CheckoutPageTexts.successThx);
    await expect.soft(page).toHaveURL(/.*checkout-complete/);
  });

  test("should remove one item after continuing shopping, then checkout", async ({
    page,
    productsPage,
    checkoutPage,
    cartPage,
  }) => {
    await productsPage.addProductToCart(ProductsCartIds.SauceLabsBackpack);
    await productsPage.addProductToCart(ProductsCartIds.SauceLabsBikeLight);
    const badge = await productsPage.waitForCartBadge();

    await expect.soft(badge).toHaveText("2");

    const inventoryPriceBP = await productsPage.getProductPriceFromInventory(
      ProductsNames.SauceLabsBackpack,
    );
    const expectedTotal = inventoryPriceBP;

    await productsPage.clickOnCartBasket();

    await expect.soft(page).toHaveURL(/.*cart/);
    await expect
      .soft(cartPage.header)
      .toHaveText(CartPageTexts.secondaryHeader);
    expect.soft(await cartPage.getCartItemsCount()).toBe(2);

    const cartPriceBP = await cartPage.getProductPriceFromCart(
      ProductsNames.SauceLabsBackpack,
    );

    expect.soft(cartPriceBP).toBeCloseTo(inventoryPriceBP, 2);

    await cartPage.clickContinueShopping();

    await expect.soft(page).toHaveURL(/.*inventory/);

    await productsPage.removeProductToCart(ProductsCartIds.SauceLabsBikeLight);

    await expect.soft(badge).toHaveText("1");

    await badge.waitFor({ state: "visible" });

    await expect.soft(badge).toHaveText("1");

    await productsPage.clickOnCartBasket();

    await expect.soft(page).toHaveURL(/.*cart/);

    await expect
      .soft(cartPage.header)
      .toHaveText(CartPageTexts.secondaryHeader);

    await cartPage.clickCheckout();

    await expect.soft(page).toHaveURL(/.*checkout-step-one/);
    await expect
      .soft(checkoutPage.header)
      .toHaveText(CheckoutPageTexts.secondaryHeader);

    const formData = generateCheckoutData();
    await checkoutPage.fillInfo(formData);
    await checkoutPage.clickContinue();

    await expect.soft(page).toHaveURL(/.*checkout-step-two/);
    await expect
      .soft(checkoutPage.header)
      .toHaveText(CheckoutPageTexts.secondaryHeader2ndStep);

    const subtotalPrice = await checkoutPage.getSubtotalPrice();
    const displayedTax = await checkoutPage.getTax();
    const displayedTotal = await checkoutPage.getTotalPrice();
    const expectedTax = PricingUtils.calculateTax(expectedTotal);
    const expectedTotalWithTax =
      PricingUtils.calculateTotalWithTax(expectedTotal);

    expect.soft(subtotalPrice).toBeCloseTo(expectedTotal, 2);
    expect.soft(displayedTax).toBeCloseTo(expectedTax, 2);
    expect.soft(displayedTotal).toBeCloseTo(expectedTotalWithTax, 2);
    expect.soft(await checkoutPage.getOverviewItemsCount()).toBe(1);

    await checkoutPage.clickFinish();

    await checkoutPage.completeHeader.waitFor({ state: "visible" });

    await expect
      .soft(checkoutPage.completeHeader)
      .toContainText(CheckoutPageTexts.successThx);
    await expect.soft(page).toHaveURL(/.*checkout-complete/);
  });

  test("should add 2 items checkout cancel return to the card verify count in card then complete checkout", async ({
    page,
    productsPage,
    checkoutPage,
    cartPage,
  }) => {
    await productsPage.addProductToCart(ProductsCartIds.SauceLabsBackpack);
    await productsPage.addProductToCart(ProductsCartIds.SauceLabsBikeLight);
    const badge = await productsPage.waitForCartBadge();

    await expect.soft(badge).toHaveText("2");

    const inventoryPriceBP = await productsPage.getProductPriceFromInventory(
      ProductsNames.SauceLabsBackpack,
    );
    const inventoryPriceBL = await productsPage.getProductPriceFromInventory(
      ProductsNames.SauceLabsBikeLight,
    );
    const expectedTotal = inventoryPriceBP + inventoryPriceBL;
    await productsPage.clickOnCartBasket();

    await expect.soft(page).toHaveURL(/.*cart/);
    expect.soft(await cartPage.getCartItemsCount()).toBe(2);
    await expect
      .soft(cartPage.header)
      .toHaveText(CartPageTexts.secondaryHeader);

    const cartPriceBP = await cartPage.getProductPriceFromCart(
      ProductsNames.SauceLabsBackpack,
    );
    const cartPriceBL = await cartPage.getProductPriceFromCart(
      ProductsNames.SauceLabsBikeLight,
    );

    expect.soft(cartPriceBP).toBeCloseTo(inventoryPriceBP, 2);
    expect.soft(cartPriceBL).toBeCloseTo(inventoryPriceBL, 2);

    await cartPage.clickCheckout();

    await expect.soft(page).toHaveURL(/.*checkout-step-one/);
    await expect
      .soft(checkoutPage.header)
      .toHaveText(CheckoutPageTexts.secondaryHeader);

    await checkoutPage.clickCancel();

    await expect.soft(page).toHaveURL(/.*cart/);
    await expect
      .soft(cartPage.header)
      .toHaveText(CartPageTexts.secondaryHeader);
    expect.soft(await cartPage.getCartItemsCount()).toBe(2);

    await cartPage.clickCheckout();

    await expect.soft(page).toHaveURL(/.*checkout-step-one/);
    await expect
      .soft(checkoutPage.header)
      .toHaveText(CheckoutPageTexts.secondaryHeader);

    const formData = generateCheckoutData();
    await checkoutPage.fillInfo(formData);
    await checkoutPage.clickContinue();

    await expect.soft(page).toHaveURL(/.*checkout-step-two/);
    await expect
      .soft(checkoutPage.header)
      .toHaveText(CheckoutPageTexts.secondaryHeader2ndStep);

    const subtotalPrice = await checkoutPage.getSubtotalPrice();
    const displayedTax = await checkoutPage.getTax();
    const displayedTotal = await checkoutPage.getTotalPrice();
    const expectedTax = PricingUtils.calculateTax(expectedTotal);
    const expectedTotalWithTax =
      PricingUtils.calculateTotalWithTax(expectedTotal);

    expect.soft(subtotalPrice).toBeCloseTo(expectedTotal, 2);
    expect.soft(displayedTax).toBeCloseTo(expectedTax, 2);
    expect.soft(displayedTotal).toBeCloseTo(expectedTotalWithTax, 2);
    expect.soft(await checkoutPage.getOverviewItemsCount()).toBe(2);

    await checkoutPage.clickFinish();
    await checkoutPage.completeHeader.waitFor({ state: "visible" });

    await expect
      .soft(checkoutPage.completeHeader)
      .toContainText(CheckoutPageTexts.successThx);
    await expect.soft(page).toHaveURL(/.*checkout-complete/);
  });

  test("should cancel on step two returns to inventory, preserves items", async ({
    page,
    productsPage,
    checkoutPage,
    cartPage,
  }) => {
    await productsPage.addProductToCart(ProductsCartIds.SauceLabsBackpack);
    await productsPage.addProductToCart(ProductsCartIds.SauceLabsBikeLight);
    const badge = await productsPage.waitForCartBadge();

    await expect.soft(badge).toHaveText("2");

    await productsPage.clickOnCartBasket();

    await expect.soft(page).toHaveURL(/.*cart/);
    await expect
      .soft(cartPage.header)
      .toHaveText(CartPageTexts.secondaryHeader);

    await cartPage.clickCheckout();
    await expect.soft(page).toHaveURL(/.*checkout-step-one/);
    await expect
      .soft(checkoutPage.header)
      .toHaveText(CheckoutPageTexts.secondaryHeader);

    const formData = generateCheckoutData();
    await checkoutPage.fillInfo(formData);
    await checkoutPage.clickContinue();

    await expect.soft(page).toHaveURL(/.*checkout-step-two/);
    await expect
      .soft(checkoutPage.header)
      .toHaveText(CheckoutPageTexts.secondaryHeader2ndStep);
    expect.soft(await checkoutPage.getOverviewItemsCount()).toBe(2);

    await checkoutPage.clickCancel();

    await expect.soft(page).toHaveURL(/.*inventory/);

    const badgeAfterCancel = await productsPage.waitForCartBadge();

    await expect.soft(badgeAfterCancel).toHaveText("2");
  });

  test("should add 2 items, delete 1 from cart, verify count and complete checkout", async ({
    page,
    productsPage,
    checkoutPage,
    cartPage,
  }) => {
    await productsPage.addProductToCart(ProductsCartIds.SauceLabsBackpack);
    await productsPage.addProductToCart(ProductsCartIds.SauceLabsBikeLight);
    const badge1 = await productsPage.waitForCartBadge();

    await expect.soft(badge1).toHaveText("2");

    const inventoryPriceBL = await productsPage.getProductPriceFromInventory(
      ProductsNames.SauceLabsBikeLight,
    );
    const expectedTotal = inventoryPriceBL;
    await productsPage.clickOnCartBasket();

    await expect.soft(page).toHaveURL(/.*cart/);
    await expect
      .soft(cartPage.header)
      .toHaveText(CartPageTexts.secondaryHeader);
    await expect.soft(cartPage.getCartItemsCount()).resolves.toBe(2);

    await cartPage.removeProductFromCart(ProductsCartIds.SauceLabsBackpack);

    await expect.soft(cartPage.getCartItemsCount()).resolves.toBe(1);

    const cartPriceBL = await cartPage.getProductPriceFromCart(
      ProductsNames.SauceLabsBikeLight,
    );

    expect.soft(cartPriceBL).toBeCloseTo(inventoryPriceBL, 2);

    await cartPage.clickContinueShopping();

    const badge2 = await productsPage.waitForCartBadge();

    await expect.soft(badge2).toHaveText("1");

    await productsPage.clickOnCartBasket();

    await expect.soft(page).toHaveURL(/.*cart/);
    await expect
      .soft(cartPage.header)
      .toHaveText(CartPageTexts.secondaryHeader);

    await cartPage.clickCheckout();

    await expect.soft(page).toHaveURL(/.*checkout-step-one/);
    await expect
      .soft(checkoutPage.header)
      .toHaveText(CheckoutPageTexts.secondaryHeader);

    const formData = generateCheckoutData();
    await checkoutPage.fillInfo(formData);
    await checkoutPage.clickContinue();

    await expect.soft(page).toHaveURL(/.*checkout-step-two/);
    await expect
      .soft(checkoutPage.header)
      .toHaveText(CheckoutPageTexts.secondaryHeader2ndStep);

    const subtotalPrice = await checkoutPage.getSubtotalPrice();
    const displayedTax = await checkoutPage.getTax();
    const displayedTotal = await checkoutPage.getTotalPrice();
    const expectedTax = PricingUtils.calculateTax(expectedTotal);
    const expectedTotalWithTax =
      PricingUtils.calculateTotalWithTax(expectedTotal);

    expect.soft(subtotalPrice).toBeCloseTo(expectedTotal, 2);
    expect.soft(displayedTax).toBeCloseTo(expectedTax, 2);
    expect.soft(displayedTotal).toBeCloseTo(expectedTotalWithTax, 2);
    expect.soft(await checkoutPage.getOverviewItemsCount()).toBe(1);

    await checkoutPage.clickFinish();

    await expect
      .soft(checkoutPage.completeHeader)
      .toContainText(CheckoutPageTexts.successThx);
    await expect.soft(page).toHaveURL(/.*checkout-complete/);
  });
});
