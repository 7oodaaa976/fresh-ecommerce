import * as zod from "zod";

export const schema = zod.object({
  details: zod
    .string()
    .nonempty("Details is required"),
  phone: zod
    .string()
    .nonempty("Phone is required")
    .regex(
      /^01[0125][0-9]{8}$/,'Not valid Number!'
    ),
    city:zod.string()
    .nonempty("City is required")
});

export type checkoutType = zod.infer<typeof schema>;
