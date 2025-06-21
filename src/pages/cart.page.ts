import { BasePage } from "./base.page";
import { ProductsCartIds } from "../types/productsPage.enums";

export class CartPage extends BasePage {
  public readonly continueShoppingButton =
    this.page.getByTestId("continue-shopping");
  public readonly cartItems = this.page.getByTestId("inventory-item");
  public readonly checkoutButton = this.page.getByTestId("checkout");
  public readonly header = this.page.getByTestId("title");
  public readonly itemQuantity = this.page.getByTestId("item-quantity");

  public async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.waitFor({ state: "visible" });
    await this.continueShoppingButton.scrollIntoViewIfNeeded();
    await this.continueShoppingButton.click();
  }

  public async getCartItemsCount(): Promise<number> {
    await this.cartItems.nth(0).waitFor({ state: "visible" });
    return this.cartItems.count();
  }

  public async clickCheckout(): Promise<void> {
    await this.checkoutButton.waitFor({ state: "visible" });
    await this.checkoutButton.scrollIntoViewIfNeeded();
    await this.checkoutButton.click();
  }

  public async removeProductFromCart(productId: ProductsCartIds) {
    const btn = this.page.getByTestId(`remove-${productId}`);
    await btn.waitFor({ state: "visible" });
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
  }

  public async getProductPriceFromCart(productName: string): Promise<number> {
    const cartItem = this.page.getByTestId("inventory-item").filter({
      has: this.page
        .getByTestId("inventory-item-name")
        .filter({ hasText: productName }),
    });

    const priceLocator = cartItem.getByTestId("inventory-item-price");
    await priceLocator.waitFor({ state: "visible", timeout: 5000 });

    const raw = await priceLocator.textContent();
    if (!raw) {
      throw new Error("Total price text is missing");
    }
    const price = parseFloat(raw?.replace("$", "").trim());
    return price;
  }
}
