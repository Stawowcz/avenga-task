import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { ProductsCartIds } from "../types/productsPage.enums";

export class AboutPage extends BasePage {
  public readonly sauceLabHeader = this.page.locator(
    '//div[contains(@class,"MuiBox-root")]//h1[normalize-space(text())="Build apps users love with AI-driven insights"]',
  );
}
