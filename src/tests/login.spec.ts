import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";
import { ProductsPageTexts } from "../types/productsPage.enums";
import { LoginPageTexts } from "../types/loginPage.enums";

test.describe("Positive scenarios - Authentication by different user", () => {
  test("should login by correct user", async ({
    loginPage,
    productsPage,
    page,
  }) => {
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
  });

  test("should login by locked out user --> user is locked so I treat is as bug", async ({
    loginPage,
    productsPage,
    page,
  }) => {
    //here I show that user does not work, this is how I understand it that I need to show where application does not work properly or user is corrupted
    await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "");
    await loginPage.fillUserNameField(
      process.env.SAUCE_DEMO_LOCKED_OUT_USER ?? "",
    );
    await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD ?? "");
    await loginPage.clickOnLoginButton();

    await expect.soft(page).toHaveURL(/.*inventory/);
    await expect
      .soft(productsPage.primaryHeader)
      .toContainText(ProductsPageTexts.primaryHeader);
    await expect.soft(productsPage.hamburgerMenu).toBeVisible();
    await expect.soft(productsPage.shoppingCartLink).toBeVisible();
  });

  test("should login by performance_glitch_user is delayed --> this user logging in is >1.5 I treat it as bug in app", async ({
    loginPage,
    productsPage,
  }) => {
    await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "");
    await loginPage.fillUserNameField(
      process.env.SAUCE_DEMO_PERFORMACE_GLITCH_USER ?? "",
    );
    await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD ?? "");
    const start = Date.now();
    await loginPage.clickOnLoginButton();

    await expect(productsPage.primaryHeader).toContainText(
      ProductsPageTexts.primaryHeader,
    );
    await expect.soft(productsPage.hamburgerMenu).toBeVisible();
    await expect.soft(productsPage.shoppingCartLink).toBeVisible();
    const duration = Date.now() - start;
    expect.soft(duration).toBeLessThanOrEqual(1500);
  });
});

test.describe("Negatvie scenarios - Authentication by user with wrong credential", () => {
  test("should verify error message by loging by incorrecr username", async ({
    loginPage,
  }) => {
    await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "");
    await loginPage.fillUserNameField(
      process.env.SAUCE_DEMO_INCORRECT_USER ?? "",
    );
    await loginPage.fillPasswordField(process.env.SAUCE_DEMO_PASSWORD ?? "");
    await loginPage.clickOnLoginButton();

    await expect.soft(loginPage.errorButton).toBeVisible();
    await expect
      .soft(loginPage.errorMessage)
      .toHaveText(LoginPageTexts.wrongPasswordOrUser);
  });

  test("should verify error message by loging by incorrecr password", async ({
    loginPage,
  }) => {
    await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "");
    await loginPage.fillUserNameField(
      process.env.SAUCE_DEMO_STANDARD_USER ?? "",
    );
    await loginPage.fillPasswordField(
      process.env.SAUCE_DEMO_INCORRECT_PASSWORD ?? "",
    );
    await loginPage.clickOnLoginButton();

    await expect.soft(loginPage.errorButton).toBeVisible();
    await expect
      .soft(loginPage.errorMessage)
      .toHaveText(LoginPageTexts.wrongPasswordOrUser);
  });
});
