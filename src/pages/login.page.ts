import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { Page } from "@playwright/test";

export class LoginPage extends BasePage {
  public readonly userNameField: Locator = this.page.getByTestId("username");
  public readonly passwordField: Locator = this.page.getByTestId("password");
  public readonly loginButton: Locator = this.page.getByTestId("login-button");
  public readonly errorButton: Locator = this.page.getByTestId("error-button");
  public readonly errorMessage: Locator = this.page.getByTestId("error");

  public async clickOnLoginButton(): Promise<void> {
    await this.loginButton.waitFor({ state: "visible" });
    await this.loginButton.scrollIntoViewIfNeeded();
    await this.loginButton.click();
  }

  public async fillUserNameField(userName: string): Promise<void> {
    await this.userNameField.waitFor({ state: "visible" });
    await this.userNameField.scrollIntoViewIfNeeded();
    await this.userNameField.fill(userName);
  }

  public async fillPasswordField(password: string): Promise<void> {
    await this.passwordField.waitFor({ state: "visible" });
    await this.passwordField.scrollIntoViewIfNeeded();
    await this.passwordField.fill(password);
  }
}
