import { z } from "zod";

export const authFormSchema = z.object({
  phone: z.string().min(1, { message: "Phone number is required" }),
  twoFaCode: z.string().min(6, { message: "Verification code is required" }),
});
