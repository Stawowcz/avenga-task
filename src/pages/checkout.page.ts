import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { CheckoutFormData } from "../types/userData";

export class CheckoutPage extends BasePage {
  public readonly firstName = this.page.getByTestId("firstName");
  public readonly lastName = this.page.getByTestId("lastName");
  public readonly postalCode = this.page.getByTestId("postalCode");
  public readonly continueButton = this.page.getByTestId("continue");
  public readonly finishButton = this.page.getByTestId("finish");
  public readonly completeHeader = this.page.locator(".complete-header");
  public readonly checkoutButton = this.page.getByTestId("checkout");
  public readonly cancelButton = this.page.getByTestId("cancel");
  public readonly header = this.page.getByTestId("title");
  public readonly summarySubtotalLabel: Locator =
    this.page.getByTestId("subtotal-label");
  public readonly summaryTaxLabel = this.page.getByTestId("tax-label");
  public readonly summaryTotalLabel = this.page.getByTestId("total-label");
  public readonly itemQuantity = this.page.getByTestId("item-quantity");

  public async getOverviewItemsCount(): Promise<number> {
    return this.page.getByTestId("inventory-item").count();
  }

  public async fillFirstName(value: string): Promise<void> {
    await this.firstName.waitFor({ state: "visible" });
    await this.firstName.scrollIntoViewIfNeeded();
    await this.firstName.fill(value);
  }

  public async fillLastName(value: string): Promise<void> {
    await this.lastName.waitFor({ state: "visible" });
    await this.lastName.scrollIntoViewIfNeeded();
    await this.lastName.fill(value);
  }

  public async fillPostalCode(value: string): Promise<void> {
    await this.postalCode.waitFor({ state: "visible" });
    await this.postalCode.scrollIntoViewIfNeeded();
    await this.postalCode.fill(value);
  }

  public async fillInfo(data: CheckoutFormData): Promise<void> {
    await this.fillFirstName(data.firstName);
    await this.fillLastName(data.lastName);
    await this.fillPostalCode(data.postalCode);
  }

  public async clickContinue(): Promise<void> {
    await this.continueButton.waitFor({ state: "visible" });
    await this.continueButton.scrollIntoViewIfNeeded();
    await this.continueButton.click();
  }

  public async clickFinish(): Promise<void> {
    await this.finishButton.waitFor({ state: "visible" });
    await this.finishButton.scrollIntoViewIfNeeded();
    await this.finishButton.click();
  }

  public async clickCancel(): Promise<void> {
    await this.cancelButton.waitFor({ state: "visible" });
    await this.cancelButton.scrollIntoViewIfNeeded();
    await this.cancelButton.click();
  }

  public async getSubtotalPrice(): Promise<number> {
    await this.summarySubtotalLabel.waitFor({ state: "visible" });
    const text = await this.summarySubtotalLabel.textContent();
    if (!text) {
      throw new Error("Total price text is missing");
    }
    return parseFloat(text?.replace("Item total: $", "").trim());
  }

  public async getTax(): Promise<number> {
    await this.summaryTaxLabel.waitFor({ state: "visible" });
    const text = await this.summaryTaxLabel.textContent();
    if (!text) {
      throw new Error("Total price text is missing");
    }
    return parseFloat(text?.replace("Tax: $", "").trim());
  }

  public async getTotalPrice(): Promise<number> {
    await this.summaryTotalLabel.waitFor({ state: "visible" });
    const text = await this.summaryTotalLabel.textContent();
    if (!text) {
      throw new Error("Total price text is missing");
    }
    return parseFloat(text?.replace("Total: $", "").trim());
  }

  public async getProductPriceFromOverview(
    productName: string,
  ): Promise<number> {
    const productItem = this.page.getByTestId("inventory-item").filter({
      has: this.page.getByTestId("inventory-item-name").filter({
        hasText: productName,
      }),
    });

    const priceLocator = productItem.getByTestId("inventory-item-price");
    await priceLocator.waitFor({ state: "visible", timeout: 5000 });
    const raw = await priceLocator.textContent();
    if (!raw) {
      throw new Error("Total price text is missing");
    }
    const price = parseFloat(raw?.replace("$", "").trim());
    return price;
  }
}
