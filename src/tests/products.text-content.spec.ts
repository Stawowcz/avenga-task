import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";
import { ProductsPageTexts } from "../types/productsPage.enums";
import { suspiciousPatterns } from "../utils/patterns.utils";

test.describe("Verify products names content and position: standard user", () => {
  test.beforeEach(async ({ page, loginPage, productsPage }) => {
    await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "<unknown>");
    await loginPage.fillUserNameField(
      process.env.SAUCE_DEMO_STANDARD_USER ?? "<unknown>",
    );
    await loginPage.fillPasswordField(
      process.env.SAUCE_DEMO_PASSWORD ?? "<unknown>",
    );
    await loginPage.clickOnLoginButton();

    await expect.soft(page).toHaveURL(/.*inventory/);
    await expect
      .soft(productsPage.primaryHeader)
      .toContainText(ProductsPageTexts.primaryHeader);
    await expect.soft(productsPage.hamburgerMenu).toBeVisible();
  });
  test("should not contain suspicious patterns in product names or descriptions: standard user --> bug", async ({
    productsPage,
  }) => {
    const names = await productsPage.getAllProductTitles().allTextContents();
    const descriptions =
      await productsPage.getAllProductDescription.allTextContents();
    const errors: string[] = [];

    names.forEach((name) => {
      suspiciousPatterns.forEach((pattern) => {
        if (name.toLowerCase().includes(pattern.toLowerCase())) {
          errors.push(`Pattern "${pattern}" found in product name: ${name}`);
        }
      });
    });

    descriptions.forEach((desc) => {
      suspiciousPatterns.forEach((pattern) => {
        if (desc.toLowerCase().includes(pattern.toLowerCase())) {
          errors.push(
            `Pattern "${pattern}" found in product description: ${desc}`,
          );
        }
      });
    });

    expect.soft(errors.length, errors.join("\n")).toBe(0);
  });

  test("should not have misaligned product names (no align_right class): standard user", async ({
    productsPage,
  }) => {
    const nameElements = await productsPage.getAllProductTitles().all();
    const misalignedNames: string[] = [];

    for (const el of nameElements) {
      const classAttr = await el.getAttribute("class");
      const name = await el.textContent();

      if (classAttr?.includes("align_right")) {
        misalignedNames.push(name?.trim() ?? "<unknown>");
      }
    }

    expect.soft(misalignedNames.length, misalignedNames.join("\n")).toBe(0);
  });
});

test.describe("Verify products names content and position: visual user", () => {
  test.beforeEach(async ({ page, loginPage, productsPage }) => {
    await loginPage.goto(process.env.SAUCE_DEMO_BASEURL ?? "<unknown>");
    await loginPage.fillUserNameField(
      process.env.SAUCE_DEMO_VISUAL_USER ?? "<unknown>",
    );
    await loginPage.fillPasswordField(
      process.env.SAUCE_DEMO_PASSWORD ?? "<unknown>",
    );
    await loginPage.clickOnLoginButton();

    await expect.soft(page).toHaveURL(/.*inventory/);
    await expect
      .soft(productsPage.primaryHeader)
      .toContainText(ProductsPageTexts.primaryHeader);
    await expect.soft(productsPage.hamburgerMenu).toBeVisible();
  });

  test("should not contain suspicious patterns in product names or descriptions: visual user --> bug", async ({
    productsPage,
  }) => {
    const names = await productsPage.getAllProductTitles().allTextContents();
    const descriptions =
      await productsPage.getAllProductDescription.allTextContents();
    const errors: string[] = [];

    names.forEach((name) => {
      suspiciousPatterns.forEach((pattern) => {
        if (name.toLowerCase().includes(pattern.toLowerCase())) {
          errors.push(`Pattern "${pattern}" found in product name: ${name}`);
        }
      });
    });

    descriptions.forEach((desc) => {
      suspiciousPatterns.forEach((pattern) => {
        if (desc.toLowerCase().includes(pattern.toLowerCase())) {
          errors.push(
            `Pattern "${pattern}" found in product description: ${desc}`,
          );
        }
      });
    });

    expect.soft(errors.length, errors.join("\n")).toBe(0);
  });

  test("should not have misaligned product names (no align_right class): visual user --> bug", async ({
    productsPage,
  }) => {
    const nameElements = await productsPage.getAllProductTitles().all();
    const misalignedNames: string[] = [];

    for (const el of nameElements) {
      const classAttr = await el.getAttribute("class");
      const name = await el.textContent();

      if (classAttr?.includes("align_right")) {
        misalignedNames.push(name?.trim() ?? "<unknown>");
      }
    }
    expect.soft(misalignedNames.length, misalignedNames.join("\n")).toBe(0);
  });
});
