import { faker } from "@faker-js/faker";
import type { CheckoutFormData } from "../types/userData";

export const generateCheckoutData = (): CheckoutFormData => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode(),
});
