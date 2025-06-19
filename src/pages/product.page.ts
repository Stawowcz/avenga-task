import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { ProductsCartIds } from "../types/productsPage.enums";

export class ProductsPage extends BasePage {
  public readonly title: Locator = this.page.getByTestId("title");
  public readonly primaryHeader: Locator =
    this.page.getByTestId("primary-header");
  public readonly hamburgerMenu: Locator = this.page.getByTestId("open-menu");
  public readonly hamburgerMenuButton: Locator = this.page.locator(
    "#react-burger-menu-btn",
  );
  public readonly shoppingCartLink: Locator =
    this.page.getByTestId("shopping-cart-link");

  public readonly cartBadge: Locator = this.page.getByTestId(
    "shopping-cart-badge",
  );

  public readonly shopingCartContainer: Locator = this.page.locator(
    "#shopping_cart_container",
  );
  public readonly cartLink: Locator =
    this.page.getByTestId("shopping-cart-link");

  public getProductImageByAltText(altText: string): Locator {
    return this.page.locator(`img[alt="${altText}"]`);
  }

  public readonly resetAppButton: Locator =
    this.page.getByTestId("reset-sidebar-link");

  public readonly menuLogoutLink = this.page.getByTestId("logout-sidebar-link");
  public readonly menuAboutLink = this.page.getByTestId("about-sidebar-link");

  public getAddToCartButton(productId: ProductsCartIds): Locator {
    return this.page.getByTestId(`add-to-cart-${productId}`);
  }

  public getRemoveFromCartButton(productId: ProductsCartIds): Locator {
    return this.page.getByTestId(`remove-${productId}`);
  }

  public getAttToCartButton(productId: ProductsCartIds): Locator {
    return this.page.getByTestId(`add-to-cart-${productId}`);
  }

  public getCartBadge(): Locator {
    return this.page.getByTestId("shopping-cart-badge");
  }

  public readonly sortDropdown: Locator = this.page.getByTestId(
    "product-sort-container",
  );

  public getAllProductTitles(): Locator {
    return this.page.getByTestId("inventory-item-name");
  }

  public getAllProductPrices(): Locator {
    return this.page.getByTestId("inventory-item-price");
  }

  public async clickOnCartBasket(): Promise<void> {
    await this.cartLink.waitFor({ state: "visible" });
    await this.cartLink.scrollIntoViewIfNeeded();
    await this.cartLink.click();
  }
  public async waitForCartBadge(): Promise<Locator> {
    await this.cartBadge.waitFor({ state: "visible" });
    await this.cartBadge.scrollIntoViewIfNeeded();
    return this.cartBadge;
  }

  public async addProductToCart(productId: ProductsCartIds): Promise<void> {
    const btn = this.getAddToCartButton(productId);
    await btn.waitFor({ state: "visible" });
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
  }

  public async removeProductToCart(productId: ProductsCartIds): Promise<void> {
    const btn = this.getRemoveFromCartButton(productId);
    await btn.waitFor({ state: "visible" });
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
  }

  public async getProductPriceByXPath(productName: string): Promise<number> {
    const xpath = `//div[contains(@class,"inventory_item") and .//div[contains(@class,"inventory_item_name") and normalize-space(text())="${productName}"]]//div[contains(@class,"inventory_item_price")]`;
    const locator = this.page.locator(`xpath=${xpath}`);
    await locator.waitFor({ state: "visible", timeout: 5000 });
    const raw = await locator.textContent();
    return parseFloat(raw?.trim().replace("$", "") ?? "0");
  }

  public async openMenu(): Promise<void> {
    await this.hamburgerMenuButton.waitFor({ state: "visible" });
    await this.hamburgerMenuButton.scrollIntoViewIfNeeded();
    await this.hamburgerMenuButton.click();
  }

  public async clickAbout(): Promise<void> {
    await this.menuAboutLink.waitFor({ state: "visible" });
    await this.menuAboutLink.scrollIntoViewIfNeeded();
    await this.menuAboutLink.click();
  }

  public async clickLogout(): Promise<void> {
    await this.menuLogoutLink.waitFor({ state: "visible" });
    await this.menuLogoutLink.scrollIntoViewIfNeeded();
    await this.menuLogoutLink.click();
  }

  public async clickResetApp(): Promise<void> {
    await this.resetAppButton.waitFor({ state: "visible" });
    await this.resetAppButton.scrollIntoViewIfNeeded();
    await this.resetAppButton.click();
  }
}
