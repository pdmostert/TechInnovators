import { z } from "zod";

export const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  address: z.string().min(5, "Please enter a full shipping address."),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid zip code (e.g., 12345)."),
  city: z.string().min(2, "City name is too short."),
  state: z.string().min(2, "Please select or enter a state."),
  country: z.string().min(2, "Please select a country."),
  
  // Payment Validation
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be exactly 16 digits."),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format."),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits."),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
