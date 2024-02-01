import { z } from "zod";
import { isPossibleNumber } from "libphonenumber-js";

export const authFormSchema = z.object({
  phone: z.string().refine(
    (value) => {
      return isPossibleNumber(value);
    },
    { message: "Invalid phone number" }
  ),
  twoFaCode: z.string().min(4, { message: "Invalid code" }),
});
