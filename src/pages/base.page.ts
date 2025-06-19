import { Page } from "@playwright/test";

export type GotoOptions = {
  referer?: string;
  timeout?: number;
  waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
};

export class BasePage {
  protected readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async goto(
    url: string = "/",
    options: GotoOptions = { waitUntil: "load" },
  ): Promise<void> {
    await this.page.goto(url, options);
  }
}
