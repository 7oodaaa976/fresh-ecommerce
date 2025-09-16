import * as zod from "zod";

export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is Required")
      .min(3, "Minimun 3 characters😀")
      .max(15, "maximum 15 characters😀")
      .trim(),
    email: zod
      .string()
      .nonempty("Email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is invalid"
      ),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
        "minmum 8 characters Atleast oneUpper,lower,digit"
      ),
    rePassword: zod.string().nonempty("rePassword is required"),
    phone:zod.string().nonempty("Phone is required")
    .regex(/^01[0215][0-9]{8}$/)
  })


  
export type registerType = zod.infer<typeof schema>

